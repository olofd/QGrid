module qgrid {
    export interface IColumn {
        field: string;
        primaryKey?: boolean;
        displayName?: string;
        resizable?: boolean;
        width?: any;
        sortDirection?: string;
        minWidth?: number;
        maxWidth?: number;
        visible?: boolean;
        sortable?: boolean;
        groupable?: boolean;
        pinnable?: boolean;
        editableCellTemplate?: string;
        enableCellEdit?: boolean;
        sortFn?: (a, b) => boolean;
        cellTemplate?: string;
        cellClass?: string;
        headerClass?: string;
        headerCellTemplate?: string;
        cellFilter?: string;
        aggLabelFilter?: string;
        qgridColumnSettings?: IQGridColumnsSettings;
    }
}