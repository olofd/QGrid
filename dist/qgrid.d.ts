declare module qgrid {
    interface IGridModel<T> {
        data: any;
        qgridSettings: IQGridSettings<T>;
        pagingOptions: IPagingOptions;
        totalServerItems: string;
        sortInfo: ISortInfo;
        columnDefs: IColumn[];
        enablePaging: boolean;
        showFooter: boolean;
        multiSelect: boolean;
        useExternalSorting: boolean;
        enablePinning: boolean;
        keepLastSelected: boolean;
        showColumnMenu: boolean;
        showFilter: boolean;
        showGroupPanel: boolean;
        i18n: string;
        aggregateTemplate: string;
        afterSelectionChange: () => any;
        footerTemplate: string;
        beforeSelectionChange: (rowItem: any, event: any) => boolean;
        checkboxCellTemplate: string;
        checkboxHeaderTemplate: string;
        dataUpdated: Function;
        enableCellEdit: boolean;
        enableCellSelection: boolean;
        enableColumnResize: boolean;
        enableColumnReordering: boolean;
        enableColumnHeavyVirt: boolean;
        enableRowReordering: boolean;
        enableRowSelection: boolean;
        enableSorting: boolean;
        excludeProperties: any;
        filterOptions: IFilterOptions;
        footerRowHeight: number;
        groups: string[];
        headerRowHeight: number;
        headerRowTemplate: string;
        jqueryUIDraggable: boolean;
        jqueryUITheme: boolean;
        maintainColumnRatios: boolean;
        pinSelectionCheckbox: boolean;
        plugins: any[];
        rowHeight: number;
        rowTemplate: string;
        selectedItems: any[];
        selectWithCheckboxOnly: boolean;
        showSelectionCheckbox: boolean;
        tabIndex: number;
        virtualizationThreshold: number;
        enableHighlighting: boolean;
    }
    interface IQgridScope<any> extends ng.IScope {
        qgrid: IGridModel<any>;
    }
    interface IQgridExtender {
        deepExtend: <T>(destination: T, source: T) => T;
    }
    interface IDefaultModelGetter {
        getNewDefault: <T>() => T;
    }
    interface IQGridSettings<T> {
        gridId: string;
        domain: string;
        urlDataRequest: string;
        urlAutoComplete: string;
        urlExport: string;
        enableAllExports: boolean;
        enableExcelExport: boolean;
        enablePDFExport: boolean;
        enableCSVExport: boolean;
        enableFooterSettings: boolean;
        rows: T[];
        totalServerItems: number;
        footerActions: IFooterAction<T>[];
        isLoading: boolean;
        resetGrid: () => any;
        autoComplete: (col: IColumn) => any;
        exportGrid: (type: any) => any;
        loadGrid: () => ng.IPromise<T>;
        isLoaded: boolean;
    }
    interface IGridService {
        performSearch: (gridModel: IGridModel<any>) => any;
        resetGrid: (gridModel: IGridModel<any>) => any;
        onSort: (newVal: ISortInfo, oldVal: ISortInfo, gridModel: IGridModel<any>) => any;
        onPaging: (newVal: IPagingOptions, oldVal: IPagingOptions, gridModel: IGridModel<any>) => any;
        autoComplete: (col: IColumn, gridModel: IGridModel<any>) => any;
        exportGrid: (type: any, gridModel: IGridModel<any>) => any;
        requestData: (searchObject: IServerRequestObject, gridModel: IGridModel<any>) => ng.IHttpPromise<any[]>;
        loadGrid: (gridModel: IGridModel<any>) => ng.IPromise<any>;
        buildServerRequestObject: (gridModel: IGridModel<any>) => IServerRequestObject;
    }
    interface IServerRequestBuilder {
        constructServcerRequestObject(gridModel: IGridModel<any>): IServerRequestObject;
    }
    interface IFooterAction<T> {
        title: string;
        callback: (footerAction: IFooterAction<T>, grid: IGridModel<T>) => any;
    }
    interface IColumn {
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
        sortFn?: (a: any, b: any) => boolean;
        cellTemplate?: string;
        cellClass?: string;
        headerClass?: string;
        headerCellTemplate?: string;
        cellFilter?: string;
        aggLabelFilter?: string;
        qgridColumnSettings?: IQGridColumnsSettings;
    }
    interface IQGridColumnsSettings {
        cellFormatter: IQgridCellFormatter;
        searchOperation: SearchOp;
        qgridColumnHeaderStyle: IQGridColumnHeaderStyle;
        searchValue: string;
    }
    interface IFilterOptions {
        filterText: string;
        useExternalFilter: boolean;
    }
    interface ISortInfo {
        fields: string[];
        directions: string[];
    }
    interface IPagingOptions {
        pageSizes: number[];
        pageSize: number;
        currentPage: number;
        manualPaging?: boolean;
    }
    interface IServerResponseObject<T> {
        page: number;
        records: number;
        total: number;
        rows: T[];
    }
    interface IServerRequestObject {
        requestInfo: IRequestInfo;
        requestSearchInfo: IColumnsSearchInfo[];
    }
    interface IRequestInfo {
        id: string;
        rows: number;
        page: number;
        rguid: string;
        search: boolean;
        sord: string;
        sf: string;
        acc: string;
        et: string;
    }
    interface IColumnsSearchInfo {
        n: string;
        so: string;
        v: string;
        pk: boolean;
    }
    interface IQGridScope<T> extends ng.IScope {
        qgrid: IGridModel<T>;
    }
    interface IQgridCellFormatter {
        template: string;
    }
}
declare module qgrid {
    enum SearchOp {
        IsEqualTo = 0,
        IsNotEqualTo = 1,
        IsLessThan = 2,
        IsLessOrEqualTo = 3,
        IsGreaterThan = 4,
        IsGreaterOrEqualTo = 5,
        IsIn = 6,
        IsNotIn = 7,
        BeginsWith = 8,
        DoesNotBeginWith = 9,
        EndsWith = 10,
        DoesNotEndWith = 11,
        Contains = 12,
        DoesNotContain = 13,
        ManualFilter = 14,
    }
    enum DataType {
        DateTime = 0,
    }
    enum IQGridColumnHeaderStyle {
        None = 0,
        SearchTextBox = 1,
        TypeaheadTexBox = 2,
        DatePickerTextBox = 3,
    }
}
declare module qgrid {
    class DateTimeCellFormater implements IQgridCellFormatter {
        public format: string;
        constructor(format?: string);
        public template : string;
    }
    class QGridHelper<T> {
        public gridModel: IGridModel<T>;
        public data: T[];
        constructor(gridModel: IGridModel<T>, $http: ng.IHttpService);
    }
}
declare module qgrid {
    class ServerRequestBuilder implements IServerRequestBuilder {
        private $http;
        private $q;
        private $timeout;
        private qgridExtender;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $timeout: ng.ITimeoutService, qgridExtender: IQgridExtender);
        public constructServcerRequestObject(gridModel: IGridModel<any>): IServerRequestObject;
        public constructRequestSearchObject(gridModel: IGridModel<any>): IColumnsSearchInfo[];
        public findSortOrder(gridModel: IGridModel<any>): string;
        public findSortField(gridModel: IGridModel<any>): string;
        public setIsSearch(columnsSearchInfos: IColumnsSearchInfo[]): boolean;
        public createRequestGuid: () => string;
        public getShortSearchOpertionForSearchOperationEnum(column: IColumn): string;
    }
}
declare module qgrid {
    class GridService implements IGridService {
        private $http;
        private $q;
        private $timeout;
        private $interval;
        private qgridExtender;
        private qgridServverRequestBuilder;
        private qgridDefaultQgridModel;
        private qgridDefaultQgridSettings;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $timeout: ng.ITimeoutService, $interval: ng.IIntervalService, qgridExtender: IQgridExtender, qgridServverRequestBuilder: ServerRequestBuilder, qgridDefaultQgridModel: IDefaultModelGetter, qgridDefaultQgridSettings: IDefaultModelGetter);
        public createGrid<T>($scope: IQgridScope<T>): void;
        private setupGrid<T>(userGridModel);
        public buildServerRequestObject(gridModel: IGridModel<any>): IServerRequestObject;
        public performSearch(gridModel: IGridModel<any>): ng.IPromise<{}>;
        public requestData(searchObject: IServerRequestObject, gridModel: IGridModel<any>): ng.IHttpPromise<any>;
        public loadGrid<T>(gridModel: IGridModel<T>): ng.IPromise<{}>;
        public onSort(newVal: ISortInfo, oldVal: ISortInfo, gridModel: IGridModel<any>): ng.IPromise<{}>;
        public onPaging(newVal: IPagingOptions, oldVal: IPagingOptions, gridModel: IGridModel<any>): ng.IPromise<{}>;
        public autoComplete(val: any, gridModel: IGridModel<any>): ng.IPromise<any>;
        public exportGrid(type: any, gridModel: IGridModel<any>): void;
        public resetGrid(gridModel: IGridModel<any>): ng.IPromise<{}>;
    }
}
