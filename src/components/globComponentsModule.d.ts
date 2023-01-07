/*
 * @Author: zhaoshan
 * @Date: 2022-11-30 14:10:30
 * @LastEditTime: 2022-12-05 19:45:26
 * @LastEditors: szhao
 * @Description:
 */
declare module 'GlobComponentsModule' {
    import type { App } from 'vue';

    export interface Install {
        (app: App): App<any>;
    }

    export interface TableHandleOptItem {
        name: string;
        disabled?: boolean;
        hidden?: boolean;
        type?: string;
        likeBtn?: boolean;
    }

    export interface ColumnProps {
        title: string;
        dataIndex?: string;
        align?: 'left' | 'right' | 'center';
        ellipsis?: boolean;
        width?: string | number;
        minWidth?: string | number;
        hidden?: boolean;
        className?: string;
        fixed?: 'left' | 'right';
        type?: 'handle' | 'index' | 'switch' | '';
        transformCellText?: ({ text, column, record, index }) => any;
        option?: Array<TableHandleOptItem>;
        optionFn?: ({ record }) => Array<TableHandleOptItem>;
        customRender?: ({ text, record, index }) => any;
    }
    export interface FormListProps {
        type:
            | 'text'
            | 'input-password'
            | 'input'
            | 'select'
            | 'date-picker'
            | 'range-picker'
            | 'switch'
            | 'checkbox-group'
            | 'radio-group'
            | 'textarea'
            | 'slot'
            | 'handle';
        name: string;
        hidden?: boolean;
        itemProps?: any;
        required?: boolean;
        props?: any;
        label?: string;
        option?: Array<any>;
        labelName?: 'label' | string;
        valueName?: 'value' | string;
        width?: string | number;
        colon?: boolean;
    }

    export interface ModalData {
        visible: boolean;
        type?: string;
        title?: string;
        data?: any;
    }
}
