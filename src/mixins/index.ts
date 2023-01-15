/*
 * @Author: sZhao
 * @Date: 2023-01-15 18:58:12
 * @LastEditTime: 2023-01-15 19:20:07
 * @LastEditors: sZhao
 * @Description:
 */
import { watch } from 'vue';
import { useStore } from 'vuex';

export default function (_fn: any) {
    {
        const $store = useStore();
        watch(
            () => $store.getters['common/groupId'],
            (e: any) => {
                console.log('混入', e);
                _fn?.();
                // yly.value = e || '';
            },
            {
                // immediate: true,
            }
        );
    }
}
