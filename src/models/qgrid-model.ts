module qgrid {

    export class DateTimeCellFormater implements IQgridCellFormatter{
        constructor(public format = 'yyyy-MM-dd HH:mm:ss'){

        }

        get template() {
            return "/src/templates/nggrid/qgrid-datetime-cell.html";
        }

    }
    export class QGridHelper<T> {
        data: T[];
        constructor(public gridModel: IGridModel<T>, $http : ng.IHttpService) {
        }

         
    }


}