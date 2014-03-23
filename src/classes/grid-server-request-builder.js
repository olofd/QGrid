var qgrid;
(function (qgrid) {
    var ServerRequestBuilder = (function () {
        function ServerRequestBuilder() {
            this.createRequestGuid = function () {
                function _p8(s) {
                    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
                }
                return _p8(undefined) + _p8(true) + _p8(true) + _p8(undefined);
            };
        }
        ServerRequestBuilder.prototype.constructServcerRequestObject = function (gridModel) {
            var that = this;
            var requestObject = {
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
        };
        ServerRequestBuilder.prototype.constructRequestSearchObject = function (gridModel) {
            var isSearch = false;
            var soObject = Array();
            for (var i = 0; i < gridModel.columnDefs.length; i++) {
                var obj = gridModel.columnDefs[i];
                if (obj.qgridColumnSettings.searchValue && obj.qgridColumnSettings.searchValue !== '') {
                    isSearch = true;
                }
                soObject.push({
                    n: obj.field,
                    so: qgrid.QGridHelper.getShortSearchOpertionForSearchOperationEnum(obj),
                    v: obj.qgridColumnSettings.searchValue,
                    pk: obj.primaryKey
                });
            }
            return soObject;
        };
        ServerRequestBuilder.prototype.findSortOrder = function (gridModel) {
            if (gridModel.sortInfo && gridModel.sortInfo.directions && gridModel.sortInfo.directions.length > 0) {
                return gridModel.sortInfo.directions[0];
            }
        };
        ServerRequestBuilder.prototype.findSortField = function (gridModel) {
            if (gridModel.sortInfo && gridModel.sortInfo.fields && gridModel.sortInfo.fields.length > 0) {
                return gridModel.sortInfo.fields[0];
            }
        };
        ServerRequestBuilder.prototype.setIsSearch = function (columnsSearchInfos) {
            for (var index in columnsSearchInfos) {
                var value = columnsSearchInfos[index].v;
                if (value && value !== '') {
                    return true;
                }
            }
            return false;
        };
        return ServerRequestBuilder;
    })();
    qgrid.ServerRequestBuilder = ServerRequestBuilder;
})(qgrid || (qgrid = {}));
//# sourceMappingURL=grid-server-request-builder.js.map
