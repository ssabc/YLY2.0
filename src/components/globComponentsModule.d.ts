/*
 * @Author: zhaoshan
 * @Date: 2022-11-30 14:10:30
 * @LastEditTime: 2023-07-05 07:50:57
 * @LastEditors: sZhao
 * @Description:
 */
declare module 'GlobComponentsModule' {
    import type { App } from 'vue';

    export interface Install {
        (app: App): App<any>;
    }

    export interface TableHandleOptItem {
        flag?: string;
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

    interface UnitObj {
        text: string;
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
        disabledDate?: any;
        unit?: UnitObj;
    }

    export interface ModalData {
        visible: boolean;
        type?: string;
        title?: string;
        data?: any;
    }

    export interface SelectListData {
        label: string;
        value: string;
    }
}
