declare module qgrid {
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
}
declare module qgrid {
    interface IColumnsSearchInfo {
        n: string;
        so: string;
        v: string;
        pk: boolean;
    }
}
declare module qgrid {
    interface IDefaultModelGetter {
        getNewDefault: <T>() => T;
    }
}
declare module qgrid {
    interface IFilterOptions {
        filterText: string;
        useExternalFilter: boolean;
    }
}
declare module qgrid {
    interface IFooterAction<T> {
        title: string;
        callback: (footerAction: IFooterAction<T>, grid: IQgridModel<T>) => any;
    }
}
declare module qgrid {
    interface IPagingOptions {
        pageSizes: number[];
        pageSize: number;
        currentPage: number;
        manualPaging?: boolean;
    }
}
declare module qgrid {
    interface IQgridOperations {
        performSearch: (gridModel: IQgridModel<any>) => any;
        resetGrid: (gridModel: IQgridModel<any>) => any;
        onSort: (newVal: ISortInfo, oldVal: ISortInfo, gridModel: IQgridModel<any>) => any;
        onPaging: (newVal: IPagingOptions, oldVal: IPagingOptions, gridModel: IQgridModel<any>) => any;
        autoComplete: (col: IColumn, gridModel: IQgridModel<any>) => any;
        exportGrid: (type: any, gridModel: IQgridModel<any>) => any;
        requestData: (searchObject: IServerRequestObject, gridModel: IQgridModel<any>) => ng.IHttpPromise<any[]>;
        loadGrid: (gridModel: IQgridModel<any>) => ng.IPromise<any>;
        buildServerRequestObject: (gridModel: IQgridModel<any>) => IServerRequestObject;
    }
}
declare module qgrid {
    interface IQgridCellFormatter {
        template: string;
    }
}
declare module qgrid {
    interface IQGridColumnsSettings {
        cellFormatter: IQgridCellFormatter;
        searchOperation: SearchOp;
        qgridColumnHeaderStyle: IQGridColumnHeaderStyle;
        searchValue: string;
    }
}
declare module qgrid {
    interface IQgridExtender {
        deepExtend: <T>(destination: T, source: T) => T;
    }
}
declare module qgrid {
    interface IQgridModel<T> {
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
}
declare module qgrid {
    interface IQgridScope<any> extends ng.IScope {
        qgrid: IQgridModel<any>;
    }
}
declare module qgrid {
    interface IQgridService {
        createGrid<T>($scope: IQgridScope<T>): void;
        qgridOperations: IQgridOperations;
    }
}
declare module qgrid {
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
        rows: T[];
        totalServerItems: number;
        footerActions: IFooterAction<T>[];
        isLoading: boolean;
        isLoaded: boolean;
        resetGrid: () => any;
        autoComplete: (col: IColumn) => any;
        exportGrid: (type: any) => any;
        loadGrid: () => ng.IPromise<T>;
        performSearch: () => any;
    }
}
declare module qgrid {
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
}
declare module qgrid {
    interface IServerRequestBuilder {
        constructServcerRequestObject(gridModel: IQgridModel<any>): IServerRequestObject;
    }
}
declare module qgrid {
    interface IServerRequestObject {
        requestInfo: IRequestInfo;
        requestSearchInfo: IColumnsSearchInfo[];
    }
}
declare module qgrid {
    interface IServerResponseObject<T> {
        page: number;
        records: number;
        total: number;
        rows: T[];
    }
}
declare module qgrid {
    interface ISortInfo {
        fields: string[];
        directions: string[];
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
    class QGridHelper<T> {
        public gridModel: IQgridModel<T>;
        public data: T[];
        constructor(gridModel: IQgridModel<T>, $http: ng.IHttpService);
    }
}
declare module qgrid {
    class DateTimeCellFormatter implements IQgridCellFormatter {
        private $templateCache;
        static $inject: string[];
        constructor($templateCache: ng.ITemplateCacheService);
        public template : any;
    }
}
declare module qgrid {
    class QGridOperations implements IQgridOperations {
        private $http;
        private $q;
        private $timeout;
        private qgridServverRequestBuilder;
        static $inject: string[];
        constructor($http: ng.IHttpService, $q: ng.IQService, $timeout: ng.ITimeoutService, qgridServverRequestBuilder: ServerRequestBuilder);
        public buildServerRequestObject(gridModel: IQgridModel<any>): IServerRequestObject;
        public performSearch(gridModel: IQgridModel<any>): ng.IPromise<{}>;
        public requestData(searchObject: IServerRequestObject, gridModel: IQgridModel<any>): ng.IHttpPromise<any>;
        public loadGrid<T>(gridModel: IQgridModel<T>): ng.IPromise<{}>;
        public onSort(newVal: ISortInfo, oldVal: ISortInfo, gridModel: IQgridModel<any>): ng.IPromise<{}>;
        public onPaging(newVal: IPagingOptions, oldVal: IPagingOptions, gridModel: IQgridModel<any>): ng.IPromise<{}>;
        public autoComplete(val: any, gridModel: IQgridModel<any>): ng.IPromise<any>;
        public exportGrid(type: any, gridModel: IQgridModel<any>): void;
        public resetGrid(gridModel: IQgridModel<any>): ng.IPromise<{}>;
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
        public constructServcerRequestObject(gridModel: IQgridModel<any>): IServerRequestObject;
        public constructRequestSearchObject(gridModel: IQgridModel<any>): IColumnsSearchInfo[];
        public findSortOrder(gridModel: IQgridModel<any>): string;
        public findSortField(gridModel: IQgridModel<any>): string;
        public setIsSearch(columnsSearchInfos: IColumnsSearchInfo[]): boolean;
        public createRequestGuid: () => string;
        public getShortSearchOpertionForSearchOperationEnum(column: IColumn): string;
    }
}
declare module qgrid {
    class GridService implements IQgridService {
        private qgridExtender;
        private qgridDefaultQgridModel;
        private qgridDefaultQgridSettings;
        public qgridOperations: IQgridOperations;
        private $templateCache;
        static $inject: string[];
        constructor(qgridExtender: IQgridExtender, qgridDefaultQgridModel: IDefaultModelGetter, qgridDefaultQgridSettings: IDefaultModelGetter, qgridOperations: IQgridOperations, $templateCache: ng.ITemplateCacheService);
        public createGrid<T>($scope: IQgridScope<T>): void;
        private setupGrid<T>(userGridModel);
    }
}
