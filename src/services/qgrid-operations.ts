module qgrid {
    export class QGridOperations implements IQgridOperations {
        static $inject = ['$http', '$q', '$timeout', 'qgridServerRequestBuilder']
        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private $timeout: ng.ITimeoutService,
            private qgridServverRequestBuilder: qgrid.ServerRequestBuilder) {

        }
        buildServerRequestObject(gridModel: qgrid.IQgridModel<any>) {
            return this.qgridServverRequestBuilder.constructServcerRequestObject(gridModel);
        }
        performSearch(gridModel: qgrid.IQgridModel<any>) {
            return this.loadGrid(gridModel);
        }
        requestData(searchObject: qgrid.IServerRequestObject, gridModel: qgrid.IQgridModel<any>) {
            return this.$http.post(gridModel.qgridSettings.domain + gridModel.qgridSettings.urlDataRequest, searchObject);
        }
        loadGrid<T>(gridModel: qgrid.IQgridModel<T>) {
            gridModel.qgridSettings.isLoading = true;
            var defered = this.$q.defer();
            var requestPromise = this.requestData(this.buildServerRequestObject(gridModel), gridModel);
            requestPromise.success((response: qgrid.IServerResponseObject<any>) => {
                gridModel.qgridSettings.rows = response.rows;
                gridModel.qgridSettings.totalServerItems = response.records;
                defered.resolve(response);
                if (response.page !== gridModel.pagingOptions.currentPage) {
                    //Updating the pager without reloading the grid (ManualPaging)
                    gridModel.pagingOptions.manualPaging = true;
                    gridModel.pagingOptions.currentPage = response.page;
                    this.$timeout(function () {
                        gridModel.pagingOptions.manualPaging = false;
                    }, 0);

                }
                gridModel.qgridSettings.isLoading = false;
            });
            requestPromise.error(function (error) {
                defered.reject(error);
            });
            return defered.promise;
        }

        onSort(newVal: qgrid.ISortInfo, oldVal: qgrid.ISortInfo, gridModel: qgrid.IQgridModel<any>) {
            return this.loadGrid(gridModel);
        }
        onPaging(newVal: qgrid.IPagingOptions, oldVal: qgrid.IPagingOptions, gridModel: qgrid.IQgridModel<any>) {
            if (!newVal.manualPaging) {
                return this.loadGrid(gridModel);
            }
        }
        autoComplete(val, gridModel: qgrid.IQgridModel<any>) {
            return this.$timeout(() => {
                var searchObject = this.buildServerRequestObject(gridModel);
                searchObject.requestInfo.acc = val.field;
                return this.$http.post(gridModel.qgridSettings.domain + gridModel.qgridSettings.urlAutoComplete, searchObject).then(function (res) {
                    return res.data;
                });
            }, 0);
        }
        exportGrid(type, gridModel: qgrid.IQgridModel<any>) {
            var searchObject = this.buildServerRequestObject(gridModel);
            searchObject.requestInfo.et = type;
            (<any>$).fileDownload(gridModel.qgridSettings.domain + gridModel.qgridSettings.urlExport, {
                httpMethod: 'POST',
                data: searchObject
            });

        }
        resetGrid(gridModel: qgrid.IQgridModel<any>) {
            angular.forEach(gridModel.columnDefs, function (col: qgrid.IColumn) {
                col.qgridColumnSettings.searchValue = '';
            });
            return this.loadGrid(gridModel);
        }
    }
} 

angular.module('qgrid').service('qgridOperations', qgrid.QGridOperations); 