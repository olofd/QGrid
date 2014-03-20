declare module qGrid {
    interface IGridModel<T> {
        data: any;
        qGridSettings: IQGridSettings<T>;
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
        performSearch: () => any;
        requestData: (searchObject: IServerRequestObject) => ng.IHttpPromise<T[]>;
        loadGrid: () => ng.IPromise<T>;
        buildServerRequestObject: (search: boolean) => IServerRequestObject;
        dataLoaded: (data: T[]) => any;
        rows: T[];
        totalServerItems: number;
        onSort: (newVal: ISortInfo, oldVal: ISortInfo) => any;
        onPaging: (newVal: IPagingOptions, oldVal: IPagingOptions) => any;
        autoComplete: (col: IColumn) => any;
        exportGrid: (type: any) => any;
        footerActions: IFooterAction<T>[];
        resetGrid: () => any;
        isLoading: boolean;
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
        qGridColumnSettings?: IQGridColumnsSettings;
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
        manualPaging: boolean;
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
        qGrid: IGridModel<T>;
    }
    interface IQgridCellFormatter {
        template: string;
    }
}
declare module qGrid {
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
declare module qGrid {
    class DateTimeCellFormater implements IQgridCellFormatter {
        public format: string;
        constructor(format?: string);
        public template : string;
    }
    class QGridHelper<T> {
        public gridModel: IGridModel<T>;
        public data: T[];
        constructor(gridModel: IGridModel<T>, $http: ng.IHttpService);
        static getShortSearchOpertionForSearchOperationEnum(column: IColumn): string;
    }
}
