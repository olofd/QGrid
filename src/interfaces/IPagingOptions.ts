module qgrid {
    export interface IPagingOptions {
        pageSizes: number[];
        pageSize: number;
        currentPage: number;
        manualPaging?: boolean;
    }
} 