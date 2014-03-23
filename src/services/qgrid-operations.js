var qgrid;
(function (qgrid) {
    var QGridOperations = (function () {
        function QGridOperations($http, $q, $timeout, qgridServverRequestBuilder) {
            this.$http = $http;
            this.$q = $q;
            this.$timeout = $timeout;
            this.qgridServverRequestBuilder = qgridServverRequestBuilder;
        }
        QGridOperations.prototype.buildServerRequestObject = function (gridModel) {
            return this.qgridServverRequestBuilder.constructServcerRequestObject(gridModel);
        };
        QGridOperations.prototype.performSearch = function (gridModel) {
            return this.loadGrid(gridModel);
        };
        QGridOperations.prototype.requestData = function (searchObject, gridModel) {
            return this.$http.post(gridModel.qgridSettings.domain + gridModel.qgridSettings.urlDataRequest, searchObject);
        };
        QGridOperations.prototype.loadGrid = function (gridModel) {
            var _this = this;
            gridModel.qgridSettings.isLoading = true;
            var defered = this.$q.defer();
            var requestPromise = this.requestData(this.buildServerRequestObject(gridModel), gridModel);
            requestPromise.success(function (response) {
                gridModel.qgridSettings.rows = response.rows;
                gridModel.qgridSettings.totalServerItems = response.records;
                defered.resolve(response);
                if (response.page !== gridModel.pagingOptions.currentPage) {
                    //Updating the pager without reloading the grid (ManualPaging)
                    gridModel.pagingOptions.manualPaging = true;
                    gridModel.pagingOptions.currentPage = response.page;
                    _this.$timeout(function () {
                        gridModel.pagingOptions.manualPaging = false;
                    }, 0);
                }
                gridModel.qgridSettings.isLoading = false;
            });
            requestPromise.error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        };

        QGridOperations.prototype.onSort = function (newVal, oldVal, gridModel) {
            return this.loadGrid(gridModel);
        };
        QGridOperations.prototype.onPaging = function (newVal, oldVal, gridModel) {
            if (!newVal.manualPaging) {
                return this.loadGrid(gridModel);
            }
        };
        QGridOperations.prototype.autoComplete = function (val, gridModel) {
            var _this = this;
            return this.$timeout(function () {
                var searchObject = _this.buildServerRequestObject(gridModel);
                searchObject.requestInfo.acc = val.field;
                return _this.$http.post(gridModel.qgridSettings.domain + gridModel.qgridSettings.urlAutoComplete, searchObject).then(function (res) {
                    return res.data;
                });
            }, 0);
        };
        QGridOperations.prototype.exportGrid = function (type, gridModel) {
            var searchObject = this.buildServerRequestObject(gridModel);
            searchObject.requestInfo.et = type;
            $.fileDownload(gridModel.qgridSettings.domain + gridModel.qgridSettings.urlExport, {
                httpMethod: 'POST',
                data: searchObject
            });
        };
        QGridOperations.prototype.resetGrid = function (gridModel) {
            angular.forEach(gridModel.columnDefs, function (col) {
                col.qgridColumnSettings.searchValue = '';
            });
            return this.loadGrid(gridModel);
        };
        QGridOperations.$inject = ['$http', '$q', '$timeout', 'qgridServerRequestBuilder'];
        return QGridOperations;
    })();
    qgrid.QGridOperations = QGridOperations;
})(qgrid || (qgrid = {}));

angular.module('qgrid').service('qgridOperations', qgrid.QGridOperations);
//# sourceMappingURL=qgrid-operations.js.map
