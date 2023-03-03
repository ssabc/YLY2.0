/*
 * @Author: sZhao
 * @Date: 2023-01-08 15:09:44
 * @LastEditTime: 2023-03-03 16:52:46
 * @LastEditors: szhao
 * @Description:
 */
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

export default ({ mode }) => {
    const envPrefix: Array<string> = ['API_'],
        Env = loadEnv(mode, process.cwd(), envPrefix);

    return {
        base: './',
        envPrefix,
        plugins: [
            vue(),
            Components({
                resolvers: [AntDesignVueResolver()],
                dirs: ['src/components/Maple'],
            }),
            viteCompression(),
            VueSetupExtend(),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '~': path.resolve(__dirname, 'src'),
            },
        },
        build: {
            target: 'es2015',
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
        },
        server: {
            proxy: {
                '/api/': {
                    target: 'http://119.3.126.12:3000/',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
                '/videofile/': {
                    target: 'http://119.3.126.12:8064/',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/videofile/, ''),
                },
                '/videoflvfile/': {
                    target: 'http://119.3.126.12:10010/',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/videoflvfile/, ''),
                },
            },
        },
    };
};
