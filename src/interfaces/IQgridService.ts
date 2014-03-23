module qgrid {
    export interface IQgridService {
        createGrid<T>($scope: IQgridScope<T>): void;
        qgridOperations: qgrid.IQgridOperations;
    }
}