module qgrid{
    export interface IFooterAction<T> {
        title: string;
        callback: (footerAction: IFooterAction<T>, grid: IQgridModel<T>) => any;
    }
} 