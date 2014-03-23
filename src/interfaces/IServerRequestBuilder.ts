module qgrid{
    export interface IServerRequestBuilder {
        constructServcerRequestObject(gridModel: IQgridModel<any>): IServerRequestObject;
    }
} 