
import type { Install } from 'GlobComponentsModule';
import { message, Modal } from 'ant-design-vue';

const modules = import.meta.globEager('./*.vue'),
    install: Install = (app) => {
        app.config.globalProperties.$message = message;
        app.config.globalProperties.$modal = Modal;

        for (const [p, c] of Object.entries(modules)) {
            app.component(p.slice(2, -4), c.default);
        }

        return app;
    };

export default install;
