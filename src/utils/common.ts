
import type { LazyImportPagesRootVueFile } from 'UtilsModule';
/**
 * @description: 懒加载src/pages目录下根目录下.vue
 */
export const lazyImportPagesRootVueFile: LazyImportPagesRootVueFile = (
    dir,
    type = 'index'
) => {
    const path = `../pages/${dir}/${type}.vue`,
        modules =
            (lazyImportPagesRootVueFile as any).modules ??
            import.meta.glob('../pages/**/*.vue');

    return modules[path];
};
/**
 * @description: 获取任意值类型
 */
export function getType(v: any) {
    return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
}
/**
 * @description: 防抖
 */
export function debounce(fn: () => void | any, delay = 300) {
    let timer: any;

    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, delay);
    };
}

export default debounce;
