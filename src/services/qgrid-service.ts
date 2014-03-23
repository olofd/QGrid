module qgrid {
    export class GridService implements IGridService {
        static $inject = ['$http', '$q', '$timeout','$interval', 'qgridExtender', 'qgridServerRequestBuilder', 'qgridDefaultQgridModel', 'qgridDefaultQgridSettings']
        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private $timeout: ng.ITimeoutService,
            private $interval : ng.IIntervalService,
            private qgridExtender: IQgridExtender,
            private qgridServverRequestBuilder: qgrid.ServerRequestBuilder,
            private qgridDefaultQgridModel: qgrid.IDefaultModelGetter,
            private qgridDefaultQgridSettings: qgrid.IDefaultModelGetter) {

        }

        createGrid<T>($scope : IQgridScope<T>) {
            $scope.qgrid = this.setupGrid($scope.qgrid);
            $scope.$watch('qgrid.qgridSettings.isLoaded', (newVal: boolean, oldVal: boolean) => {
                if (newVal) {
                    this.$timeout(() => {
                        this.loadGrid($scope.qgrid);
                    }, 0);
                }
            }, true);

            $scope.$watch('qgrid.sortInfo', (newVal: qgrid.ISortInfo, oldVal: qgrid.ISortInfo) => {
                if (newVal.directions[0] !== oldVal.directions[0] || newVal.fields[0] !== oldVal.fields[0]) {
                    this.onSort(newVal, oldVal, $scope.qgrid);
                }
            }, true);

            $scope.$watch('qgrid.pagingOptions', (newVal: qgrid.IPagingOptions, oldVal: qgrid.IPagingOptions) => {
                if (newVal !== oldVal) {
                    this.onPaging(newVal, oldVal, $scope.qgrid);
                }
            }, true);


            //Flipping the switch =>

            $scope.qgrid.qgridSettings.isLoaded = true;
        }
        private setupGrid<T>(userGridModel: qgrid.IGridModel<T>) {
            var that = this;
            //Get new default models
            var newModel = this.qgridDefaultQgridModel.getNewDefault<IGridModel<T>>();
            var newSettingsObject = this.qgridDefaultQgridSettings.getNewDefault<IQGridSettings<T>>();
            newModel.qgridSettings = newSettingsObject;
            this.qgridExtender.deepExtend(newModel, userGridModel);

            //Setup pointers to dataoperation methods:
            newModel.qgridSettings.loadGrid = (function (gridModel: IGridModel<T>, igridService: IGridService) {
                return () => {return igridService.loadGrid(gridModel) };
            } (newModel, this));

            newModel.qgridSettings.exportGrid = (function (gridModel: IGridModel<T>, igridService: IGridService) {
                return (type) => {return igridService.exportGrid(type, gridModel) };
            } (newModel, this));

            newModel.qgridSettings.resetGrid = (function (gridModel: IGridModel<T>, igridService: IGridService) {
                return () => {return igridService.resetGrid(gridModel) };
            } (newModel, this));

            newModel.qgridSettings.autoComplete = (function (gridModel: IGridModel<T>, igridService: IGridService) {
                return (column: IColumn) => { return igridService.autoComplete(column, gridModel) };
            } (newModel, this));

            for (var index in newModel.columnDefs) {
                var col = newModel.columnDefs[index];
                if (!col.headerClass) {
                    col.headerClass = 'qgrid-cell-header';
                }
                if (col.qgridColumnSettings && col.qgridColumnSettings.cellFormatter) {
                    col.cellTemplate = col.qgridColumnSettings.cellFormatter.template;
                }
                if (col.qgridColumnSettings.qgridColumnHeaderStyle === qgrid.IQGridColumnHeaderStyle.TypeaheadTexBox) {
                    col.headerCellTemplate = '/src/templates/nggrid/qgrid-typeahead-header-cell.html';
                }
                if (col.qgridColumnSettings.qgridColumnHeaderStyle === qgrid.IQGridColumnHeaderStyle.SearchTextBox) {
                    col.headerCellTemplate = '/src/templates/nggrid/qgrid-searchtextbox-header-cell.html';
                }
            }

            return newModel;
        }
        buildServerRequestObject(gridModel: qgrid.IGridModel<any>) {
            return this.qgridServverRequestBuilder.constructServcerRequestObject(gridModel);
        }
        performSearch(gridModel: qgrid.IGridModel<any>) {
            return this.loadGrid(gridModel);
        }
        requestData(searchObject: qgrid.IServerRequestObject, gridModel: qgrid.IGridModel<any>) {
            return this.$http.post(gridModel.qgridSettings.domain + gridModel.qgridSettings.urlDataRequest, searchObject);
        }
        loadGrid<T>(gridModel: qgrid.IGridModel<T>) {
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
                    console.log(gridModel.pagingOptions.currentPage);
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

        onSort(newVal: qgrid.ISortInfo, oldVal: qgrid.ISortInfo, gridModel: qgrid.IGridModel<any>) {
            return this.loadGrid(gridModel);
        }
        onPaging(newVal: qgrid.IPagingOptions, oldVal: qgrid.IPagingOptions, gridModel: qgrid.IGridModel<any>) {
            if (!newVal.manualPaging) {
                return this.loadGrid(gridModel);
            }
        }
        autoComplete(val, gridModel: qgrid.IGridModel<any>) {
            return this.$timeout(() => {
                var searchObject = this.buildServerRequestObject(gridModel);
                searchObject.requestInfo.acc = val.field;
                return this.$http.post(gridModel.qgridSettings.domain + gridModel.qgridSettings.urlAutoComplete, searchObject).then(function (res) {
                    return res.data;
                });
            }, 0);
        }
        exportGrid(type, gridModel: qgrid.IGridModel<any>) {
            var searchObject = this.buildServerRequestObject(gridModel);
            searchObject.requestInfo.et = type;
            (<any>$).fileDownload(gridModel.qgridSettings.domain + gridModel.qgridSettings.urlExport, {
                httpMethod: 'POST',
                data: searchObject
            });

        }
        resetGrid(gridModel: qgrid.IGridModel<any>) {
            angular.forEach(gridModel.columnDefs, function (col: qgrid.IColumn) {
                col.qgridColumnSettings.searchValue = '';
            });
            return this.loadGrid(gridModel);
        }


    }

}

angular.module('qgrid').service('qgridService', qgrid.GridService); 