module qgrid {
    export interface IQgridModel<T> {
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

        /** Callback if you want to inspect something before selection,
        return false if you want to cancel the selection. return true otherwise. 
        If you need to wait for an async call to proceed with selection you can 
        use rowItem.changeSelection(event) method after returning false initially. 
        Note: when shift+ Selecting multiple items in the grid this will only get called
        once and the rowItem will be an array of items that are queued to be selected. */
        beforeSelectionChange: (rowItem: any, event: any) => boolean;

        /** checkbox templates. */
        checkboxCellTemplate: string;

        /** checkbox templates. */
        checkboxHeaderTemplate: string;

        /** Data updated callback, fires every time the data is modified from outside the grid. */
        dataUpdated: Function;

        /** Enables cell editing. */
        enableCellEdit: boolean;

        /** Enables cell selection. */
        enableCellSelection: boolean;

        /** Enable or disable resizing of columns */
        enableColumnResize: boolean;

        /** Enable or disable reordering of columns */
        enableColumnReordering: boolean;

        /** Enable or disable HEAVY column virtualization. This turns off selection checkboxes and column pinning and is designed for spreadsheet-like data. */
        enableColumnHeavyVirt: boolean;


        /** Enable drag and drop row reordering. Only works in HTML5 compliant browsers. */
        enableRowReordering: boolean;

        /** To be able to have selectable rows in grid. */
        enableRowSelection: boolean;

        /** Enables or disables sorting in grid. */
        enableSorting: boolean;

        /**  string list of properties to exclude when auto-generating columns. */
        excludeProperties: any;

        /** filterOptions -
        filterText: The text bound to the built-in search box. 
        useExternalFilter: Bypass internal filtering if you want to roll your own filtering mechanism but want to use builtin search box.
        */
        filterOptions: IFilterOptions;

        /** Defining the height of the footer in pixels. */
        footerRowHeight: number;

        /** Initial fields to group data by. Array of field names, not displayName. */
        groups: string[];

        /** The height of the header row in pixels. */
        headerRowHeight: number;

        /** Define a header row template for further customization. See github wiki for more details. */
        headerRowTemplate: string;

        /** Enables the use of jquery UI reaggable/droppable plugin. requires jqueryUI to work if enabled. 
        Useful if you want drag + drop but your users insist on crappy browsers. */
        jqueryUIDraggable: boolean;

        /** Enable the use jqueryUIThemes */
        jqueryUITheme: boolean;

        /** Maintains the column widths while resizing. 
        Defaults to true when using *'s or undefined widths. Can be ovverriden by setting to false. */
        maintainColumnRatios: boolean;

        /** Array of plugin functions to register in ng-grid */
        pinSelectionCheckbox: boolean;

        /** Array of plugin functions to register in ng-grid */
        plugins: any[];

        /** Row height of rows in grid. */
        rowHeight: number;

        /** Define a row template to customize output. See github wiki for more details. */
        rowTemplate: string;

        /** all of the items selected in the grid. In single select mode there will only be one item in the array. */
        selectedItems: any[];

        /** Disable row selections by clicking on the row and only when the checkbox is clicked. */
        selectWithCheckboxOnly: boolean;

        /** Row selection check boxes appear as the first column. */
        showSelectionCheckbox: boolean;

        /** Set the tab index of the Vieport. */
        tabIndex: number;

        /** the threshold in rows to force virtualization on  */
        virtualizationThreshold: number;

        /** Enables or disables text highlighting in grid by adding the "unselectable" class (See CSS file) */
        enableHighlighting: boolean;
    }
}