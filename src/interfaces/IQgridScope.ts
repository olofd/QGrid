module qgrid {
    export interface IQgridScope<any> extends ng.IScope {
        qgrid: IQgridModel<any>;
    }
}