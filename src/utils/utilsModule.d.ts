declare module 'UtilsModule' {
    export type LazyImportPagesRootVueFile = (
        dir: string,
        type?: 'index' | 'add' | 'edit' | 'detail' | string
    ) => () => Promise<{ [key: string]: any }>;
}
