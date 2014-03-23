module qgrid {
    export class ServerRequestBuilder implements IServerRequestBuilder {
        static $inject = ['$http', '$q', '$timeout', 'qgridExtender']
        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $timeout: ng.ITimeoutService, private qgridExtender: IQgridExtender) {

        }

        constructServcerRequestObject(gridModel: IQgridModel<any>): IServerRequestObject {
            var that = this;
            var requestObject = <IServerRequestObject>{
                requestInfo: {
                    id: gridModel.qgridSettings.gridId,
                    rows: gridModel.pagingOptions.pageSize,
                    rguid: that.createRequestGuid()
                }
            };
            requestObject.requestSearchInfo = this.constructRequestSearchObject(gridModel);
            requestObject.requestInfo.search = this.setIsSearch(requestObject.requestSearchInfo);
            requestObject.requestInfo.sf = this.findSortField(gridModel);
            requestObject.requestInfo.sord = this.findSortOrder(gridModel);
            requestObject.requestInfo.page = requestObject.requestInfo.search ? 1 : gridModel.pagingOptions.currentPage;

            return requestObject;
        }
        constructRequestSearchObject(gridModel: IQgridModel<any>): Array<qgrid.IColumnsSearchInfo> {
            var isSearch = false;
            var soObject = Array<qgrid.IColumnsSearchInfo>();
            for (var i = 0; i < gridModel.columnDefs.length; i++) {
                var obj = gridModel.columnDefs[i];
                if (obj.qgridColumnSettings.searchValue && obj.qgridColumnSettings.searchValue !== '') {
                    isSearch = true;
                }
                soObject.push(<qgrid.IColumnsSearchInfo>{
                    n: obj.field,
                    so: this.getShortSearchOpertionForSearchOperationEnum(obj),
                    v: obj.qgridColumnSettings.searchValue,
                    pk: obj.primaryKey
                });
            }
            return soObject;
        }
        findSortOrder(gridModel: IQgridModel<any>) {
            if (gridModel.sortInfo && gridModel.sortInfo.directions && gridModel.sortInfo.directions.length > 0) {
                return gridModel.sortInfo.directions[0];
            }
        }
        findSortField(gridModel: IQgridModel<any>) {
            if (gridModel.sortInfo && gridModel.sortInfo.fields && gridModel.sortInfo.fields.length > 0) {
                return gridModel.sortInfo.fields[0];
            }
        }
        setIsSearch(columnsSearchInfos: IColumnsSearchInfo[]) {
            for (var index in columnsSearchInfos) {
                var value = columnsSearchInfos[index].v;
                if (value && value !== '') {
                    return true;
                }
            }
            return false
        }
        createRequestGuid = function () {
            function _p8(s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }
            return _p8(undefined) + _p8(true) + _p8(true) + _p8(undefined);
        }
        getShortSearchOpertionForSearchOperationEnum(column: IColumn) {

            if (column.qgridColumnSettings.searchOperation === SearchOp.IsEqualTo) {
                return "eq";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.IsNotEqualTo) {
                return "ne";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.IsLessThan) {
                return "lt";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.IsLessOrEqualTo) {
                return "le";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.IsGreaterThan) {
                return "gt";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.IsGreaterOrEqualTo) {
                return "ge";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.IsIn) {
                return "in";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.IsNotIn) {
                return "ni";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.BeginsWith) {
                return "bw";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.DoesNotBeginWith) {
                return "bn";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.EndsWith) {
                return "ew";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.DoesNotEndWith) {
                return "en";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.Contains) {
                return "cn";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.DoesNotContain) {
                return "nc";
            }
            if (column.qgridColumnSettings.searchOperation === SearchOp.ManualFilter) {
                return "mf";
            }
            return "bw";
        }

    }
}

angular.module('qgrid').service('qgridServerRequestBuilder', qgrid.ServerRequestBuilder); 