import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';

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
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '~': path.resolve(__dirname, 'src'),
            },
        },
        build: {
            target: 'es2015',
        },
        server: {
            proxy: {
                '/api/': {
                    target: 'http://119.3.126.12/',
                    changeOrigin: true,
                },
            },
        },
    };
};
