<template>
    <div class="login flex h-full w-full items-center justify-center">
        <div class="login-title">黄浦区无感式养老服务系统</div>
        <div class="form-box flex items-center justify-center">
            <GmForm
                ref="refGmForm"
                v-model:data="data.formData"
                :list="data.list"
                :rules="data.rules"
                style="width: 360px"
                :label-col="{ span: 4 }"
                @on-handle="handleClick"
                @press-enter="submit"
            >
                <template #verifyCode>
                    <div class="flex items-center justify-center verify-code-wrap">
                        <a-input
                            v-model:value="data.formData.verifyCode"
                            allow-clear
                            :maxlength="6"
                            :disabled="!data.formData.uniqueCode"
                            @press-enter="submit"
                        />
                        <img
                            class="code-img"
                            :src="data.codeBaseUrl"
                            @click="getIdentifyCode"
                        />
                    </div>
                </template>
                <template #slotSubmit>
                    <a-button
                        type="primary"
                        class="submit-btn mt-6 w-full"
                        size="large"
                        @click="submit"
                    >
                        登录
                    </a-button>
                </template>
            </GmForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, getCurrentInstance, onMounted } from 'vue';
import md5 from 'js-md5';
import type { FormListProps } from 'GlobComponentsModule';
import { useRouter } from 'vue-router';
import { fetchVerificationCode, fetchLogin } from '@/api/login';
import type { FetchLoginQuery } from 'LoginModule';
import { useStore } from 'vuex';
import { RuleObject } from 'ant-design-vue/es/form/interface';

interface Data {
    formData: FetchLoginQuery;
    list: FormListProps[];
    rules: object;
    codeBaseUrl: string;
}

const data = reactive<Data>({
        list: [
            {
                type: 'input',
                name: 'userAccount',
                label: '',
            },
            {
                type: 'input-password',
                name: 'userPassword',
                label: '',
            },
            {
                type: 'slot',
                label: '',
                name: 'verifyCode',
            },
            {
                type: 'slot',
                name: 'slotSubmit',
            },
        ],
        formData: {} as FetchLoginQuery,
        rules: {
            userAccount: {
                required: true,
                message: '请输入用户名',
                trigger: 'change',
            },
            userPassword: {
                required: true,
                message: '请输入密码',
                trigger: 'change',
            },
            verifyCode: {
                required: true,
                validator: validateVerifyCode,
                trigger: 'blur',
            },
        },
        codeBaseUrl: '',
    }),
    { globalProperties } = getCurrentInstance()?.appContext.config as any,
    $store = useStore();

const refGmForm = ref(),
    $router = useRouter();

onMounted(() => {
    getIdentifyCode();
});
/**
 * @description: 提交登录
 */
function submit() {
    refGmForm.value.handleClick(data.formData, 'submit');
}
/**
 * @description: 统一处理点击事件
 */
function handleClick() {
    const queryParam = {
        username: data.formData.userAccount,
        password: md5(data.formData.userPassword),
    };
    fetchLogin(queryParam)
        .then((res) => {
            $store.dispatch('common/updateUserInfo', res.data);
            const account = res.data?.account,
                _q = {
                    name: account?.desc || '',
                    id: account?.id || '',
                };
            $store.commit('common/setYly', _q);
            $store.dispatch('common/getGisUrl');
            $router.push('/');
        })
        .catch(() => {
            getIdentifyCode();
        });
}
/**
 * @description: 获取验证码
 */
function getIdentifyCode() {
    fetchVerificationCode({}).then((res: any) => {
        data.codeBaseUrl = 'data:image/jpeg;base64,' + res.data?.captcha;
        data.formData.uniqueCode = res.data?.code;
        // refGmForm.value.refForm.validateFields(['verifyCode']);
    });
}
/**
 * @description: 动态校验验证码
 */
function validateVerifyCode(rule: RuleObject, value: string) {
    if (!data.formData.uniqueCode) {
        return Promise.reject('请先点击获取验证码');
    }
    if (!value) {
        return Promise.reject('请输入验证码');
    }
    if (value?.toUpperCase() != data.formData.uniqueCode?.toUpperCase()) {
        return Promise.reject('验证码输入错误');
    }
    return Promise.resolve();
}
</script>

<style lang="less" scoped>
.verify-code-wrap {
    width: 100%;
}
.login-title {
    color: #fff;
    font-size: 40px;
    letter-spacing: 5px;
}
.submit-btn {
    color: #fff;
}
.login {
    background-image: url(@/assets/pictures/login.jpeg);
    background-size: cover;
    background-repeat: no-repeat;
    flex-direction: column;
}
.form-box {
    margin-top: 45px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 6px;
    padding: 45px 45px 0 45px;
}
.code-img {
    width: 70px;
    height: 30px;
    margin-left: 10px;
    cursor: pointer;
}
</style>
