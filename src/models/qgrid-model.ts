module qgrid {

    export class QGridHelper<T> {
        data: T[];
        constructor(public gridModel: IQgridModel<T>, $http: ng.IHttpService) {
        }


    }


}