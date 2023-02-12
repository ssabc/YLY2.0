<!--
 * @Author: sZhao
 * @Date: 2023-02-12 12:53:17
 * @LastEditTime: 2023-02-12 13:14:40
 * @LastEditors: sZhao
 * @Description:
-->
<template>
    <div class="header-wrap">
        <img class="title-img" :src="hdimg" />
    </div>
</template>

<script>
import hdimg from '@/assets/imgs/title.png';

export default {
    name: 'HEADER',
    components: {},
    data() {
        return {
            hdimg,
        };
    },
};
</script>

<style lang="less" scoped>
.header-wrap {
    position: relative;
    width: 100%;
    height: calc(80 / 3840 * 3840px);
    .title-img {
        width: 78.640625%;
        height: 200%;
        position: absolute;
        top: 0;
        margin-top: -50px;
        left: 13.760416666666664%;
    }
}
</style>
