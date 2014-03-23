module qgrid {

    export interface IQgridOperations {
        performSearch: (gridModel: IQgridModel<any>) => any;
        resetGrid: (gridModel: IQgridModel<any>) => any;
        onSort: (newVal: qgrid.ISortInfo, oldVal: qgrid.ISortInfo, gridModel: IQgridModel<any>) => any;
        onPaging: (newVal: qgrid.IPagingOptions, oldVal: qgrid.IPagingOptions, gridModel: IQgridModel<any>) => any;
        autoComplete: (col: IColumn, gridModel: IQgridModel<any>) => any;
        exportGrid: (type, gridModel: IQgridModel<any>) => any;
        requestData: (searchObject: IServerRequestObject, gridModel: IQgridModel<any>) => ng.IHttpPromise<any[]>
        loadGrid: (gridModel: IQgridModel<any>) => ng.IPromise<any>;
        buildServerRequestObject: (gridModel: IQgridModel<any>) => IServerRequestObject;
    }
} 