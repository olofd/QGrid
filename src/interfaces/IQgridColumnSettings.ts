module qgrid{
    export interface IQGridColumnsSettings {
        cellFormatter: IQgridCellFormatter;
        searchOperation: SearchOp;
        qgridColumnHeaderStyle: IQGridColumnHeaderStyle;
        searchValue: string;
    }
}