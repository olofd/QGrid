var qgrid;
(function (qgrid) {
    var ServerRequestBuilder = (function () {
        function ServerRequestBuilder($http, $q, $timeout, qgridExtender) {
            this.$http = $http;
            this.$q = $q;
            this.$timeout = $timeout;
            this.qgridExtender = qgridExtender;
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
                    so: this.getShortSearchOpertionForSearchOperationEnum(obj),
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

        ServerRequestBuilder.prototype.getShortSearchOpertionForSearchOperationEnum = function (column) {
            if (column.qgridColumnSettings.searchOperation === 0 /* IsEqualTo */) {
                return "eq";
            }
            if (column.qgridColumnSettings.searchOperation === 1 /* IsNotEqualTo */) {
                return "ne";
            }
            if (column.qgridColumnSettings.searchOperation === 2 /* IsLessThan */) {
                return "lt";
            }
            if (column.qgridColumnSettings.searchOperation === 3 /* IsLessOrEqualTo */) {
                return "le";
            }
            if (column.qgridColumnSettings.searchOperation === 4 /* IsGreaterThan */) {
                return "gt";
            }
            if (column.qgridColumnSettings.searchOperation === 5 /* IsGreaterOrEqualTo */) {
                return "ge";
            }
            if (column.qgridColumnSettings.searchOperation === 6 /* IsIn */) {
                return "in";
            }
            if (column.qgridColumnSettings.searchOperation === 7 /* IsNotIn */) {
                return "ni";
            }
            if (column.qgridColumnSettings.searchOperation === 8 /* BeginsWith */) {
                return "bw";
            }
            if (column.qgridColumnSettings.searchOperation === 9 /* DoesNotBeginWith */) {
                return "bn";
            }
            if (column.qgridColumnSettings.searchOperation === 10 /* EndsWith */) {
                return "ew";
            }
            if (column.qgridColumnSettings.searchOperation === 11 /* DoesNotEndWith */) {
                return "en";
            }
            if (column.qgridColumnSettings.searchOperation === 12 /* Contains */) {
                return "cn";
            }
            if (column.qgridColumnSettings.searchOperation === 13 /* DoesNotContain */) {
                return "nc";
            }
            if (column.qgridColumnSettings.searchOperation === 14 /* ManualFilter */) {
                return "mf";
            }
            return "bw";
        };
        ServerRequestBuilder.$inject = ['$http', '$q', '$timeout', 'qgridExtender'];
        return ServerRequestBuilder;
    })();
    qgrid.ServerRequestBuilder = ServerRequestBuilder;
})(qgrid || (qgrid = {}));

angular.module('qgrid').service('qgridServerRequestBuilder', qgrid.ServerRequestBuilder);
//# sourceMappingURL=qgrid-server-request-builder.js.map
