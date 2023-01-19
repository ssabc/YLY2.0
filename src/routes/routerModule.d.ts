/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-12-02 20:54:42
 * @LastEditors: szhao
 * @LastEditTime: 2023-01-19 11:08:54
 * @FilePath: /xiabackend/src/routes/routerModule.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

declare module 'RouterModule' {
    export interface RouteItem {
        name: string;
        path: string;
        meta: {
            title: string;
            hidden?: boolean;
            layout?: boolean;
            hiddenBreadCrumb?: boolean;
            isHeadMenu?: boolean;
            keepAlive?: boolean;
            isShowBack?: boolean;
        };
        component?:
            | (() => Promise<{ [key: string]: any }>)
            | Record<
                  string,
                  () => Promise<{
                      [key: string]: any;
                  }>
              >;
        redirect?: string;
        children?: RouteItem[];
    }
}
