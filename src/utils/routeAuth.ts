
import { r } from '@/routes/index';
import $store from '@/store/index';
import { debounce } from '@/utils/common';

let timer: any = null;
const maxUseTime = 1 * 60 * 60 * 1000,
    handle = (type?: string) => {
        if (type === 'init') {
            const oldTime = (localStorage.getItem('closeTime') as any) ?? 0,
                nowTime = new Date().valueOf();

            if (oldTime && nowTime - oldTime >= maxUseTime) {
                $store.dispatch('common/exit');
                return;
            }
            localStorage.removeItem('closeTime');
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            $store.dispatch('common/exit');
        }, maxUseTime);
    },
    throttleHandle = debounce(handle, 1000),
    visibilitychange = () => {
        switch (document.visibilityState) {
            case 'hidden':
                localStorage.setItem('closeTime', new Date().valueOf() as any);
                break;
            case 'visible':
                handle('init');
                break;
        }
    },
    clearEventListener = () => {
        localStorage.removeItem('closeTime');
        document.removeEventListener('keydown', throttleHandle);
        document.removeEventListener('mousemove', throttleHandle);
        document.removeEventListener('click', throttleHandle);
        document.removeEventListener('visibilitychange', visibilitychange);
    };

document.addEventListener('unload', function () {
    localStorage.setItem('closeTime', new Date().valueOf() as any);
});

r.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        clearEventListener();
        next();
        return;
    }
    if (to.path !== '/login' && !$store.getters['common/userInfo']?.token) {
        next('/login');
        return;
    }

    clearEventListener();
    handle('init');
    setTimeout(() => {
        document.addEventListener('keydown', throttleHandle);
        document.addEventListener('mousemove', throttleHandle);
        document.addEventListener('click', throttleHandle);
        document.addEventListener('visibilitychange', visibilitychange);
    });
    next();
});
