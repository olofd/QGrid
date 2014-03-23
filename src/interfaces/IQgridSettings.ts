module qgrid{
    export interface IQGridSettings<T> {

        //Members
        /**The id of the grid. Will be sent in all interactions with server.*/
        gridId: string;
        /**Domian. Set when using CORS. Defaults to empty string*/
        domain: string;
        /**DataRequestUrl url, defaults to: /domain/gridId/DataRequest*/
        urlDataRequest: string;
        /**Autocomplete url, defaults to: /domain/gridId/AutoComplete*/
        urlAutoComplete: string;
        /**Export url, defaults to: /domain/gridId/Export*/
        urlExport: string;
        /**Enables EXCEL, PDF, CSV export options in footer action menu*/
        enableAllExports: boolean;
        /**Enables EXCEL export option in footer action menu*/
        enableExcelExport: boolean;
        /**Enables PDF export option in footer action menu*/
        enablePDFExport: boolean;
        /**Enables CSV export option in footer action menu*/
        enableCSVExport: boolean;
        /**Databinded array with currently displayed rows in grid*/
        rows: T[];
        /**READ ONLY. Databinded value with number of total items*/
        totalServerItems: number;
        /**Footer actions, can be prepopulated with exportoprtions. You can also define your own footeractions here*/
        footerActions: IFooterAction<T>[];
        /**READ ONLY. Indicates wether the grid is loading or not, internaly used for spinner.*/
        isLoading: boolean;
        /** Will load and unload the grid depending on it's value*/
        isLoaded: boolean;

        //Methods
        /**Method to reset grid and search-params.*/
        resetGrid: () => any;
        /**Method to reset grid and search-params.*/
        autoComplete: (col: IColumn) => any;
        exportGrid: (type) => any;
        loadGrid: () => ng.IPromise<T>;
        performSearch: () => any;



    }
}