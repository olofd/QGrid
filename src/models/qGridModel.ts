module qGrid {

    export class DateTimeCellFormater implements IQgridCellFormatter{
        constructor(public format = 'yyyy-MM-dd HH:mm:ss'){

        }

        get template() {
            return "/src/templates/nggrid/datetime-cell.html";
        }

    }
    export class QGridHelper<T> {
        data: T[];
        constructor(public gridModel: IGridModel<T>, $http : ng.IHttpService) {
        }

        static getShortSearchOpertionForSearchOperationEnum(column: IColumn) {

            if (column.qGridColumnSettings.searchOperation === SearchOp.IsEqualTo) {
                return "eq";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.IsNotEqualTo) {
                return "ne";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.IsLessThan) {
                return "lt";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.IsLessOrEqualTo) {
                return "le";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.IsGreaterThan) {
                return "gt";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.IsGreaterOrEqualTo) {
                return "ge";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.IsIn) {
                return "in";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.IsNotIn) {
                return "ni";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.BeginsWith) {
                return "bw";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.DoesNotBeginWith) {
                return "bn";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.EndsWith) {
                return "ew";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.DoesNotEndWith) {
                return "en";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.Contains) {
                return "cn";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.DoesNotContain) {
                return "nc";
            }
            if (column.qGridColumnSettings.searchOperation === SearchOp.ManualFilter) {
                return "mf";
            }
            return "bw";
        }
    }


}