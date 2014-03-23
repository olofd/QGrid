var qgrid;
(function (qgrid) {
    var GridService = (function () {
        function GridService($http, $q, $timeout, $interval, qgridExtender, qgridServverRequestBuilder, qgridDefaultQgridModel, qgridDefaultQgridSettings) {
            this.$http = $http;
            this.$q = $q;
            this.$timeout = $timeout;
            this.$interval = $interval;
            this.qgridExtender = qgridExtender;
            this.qgridServverRequestBuilder = qgridServverRequestBuilder;
            this.qgridDefaultQgridModel = qgridDefaultQgridModel;
            this.qgridDefaultQgridSettings = qgridDefaultQgridSettings;
        }
        GridService.prototype.createGrid = function ($scope) {
            var _this = this;
            $scope.qgrid = this.setupGrid($scope.qgrid);
            $scope.$watch('qgrid.qgridSettings.isLoaded', function (newVal, oldVal) {
                if (newVal) {
                    _this.$timeout(function () {
                        _this.loadGrid($scope.qgrid);
                    }, 0);
                }
            }, true);

            $scope.$watch('qgrid.sortInfo', function (newVal, oldVal) {
                if (newVal.directions[0] !== oldVal.directions[0] || newVal.fields[0] !== oldVal.fields[0]) {
                    _this.onSort(newVal, oldVal, $scope.qgrid);
                }
            }, true);

            $scope.$watch('qgrid.pagingOptions', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    _this.onPaging(newVal, oldVal, $scope.qgrid);
                }
            }, true);

            //Flipping the switch =>
            $scope.qgrid.qgridSettings.isLoaded = true;
        };
        GridService.prototype.setupGrid = function (userGridModel) {
            var that = this;

            //Get new default models
            var newModel = this.qgridDefaultQgridModel.getNewDefault();
            var newSettingsObject = this.qgridDefaultQgridSettings.getNewDefault();
            newModel.qgridSettings = newSettingsObject;
            this.qgridExtender.deepExtend(newModel, userGridModel);

            //Setup pointers to dataoperation methods:
            newModel.qgridSettings.loadGrid = (function (gridModel, igridService) {
                return function () {
                    return igridService.loadGrid(gridModel);
                };
            }(newModel, this));

            newModel.qgridSettings.exportGrid = (function (gridModel, igridService) {
                return function (type) {
                    return igridService.exportGrid(type, gridModel);
                };
            }(newModel, this));

            newModel.qgridSettings.resetGrid = (function (gridModel, igridService) {
                return function () {
                    return igridService.resetGrid(gridModel);
                };
            }(newModel, this));

            newModel.qgridSettings.autoComplete = (function (gridModel, igridService) {
                return function (column) {
                    return igridService.autoComplete(column, gridModel);
                };
            }(newModel, this));

            for (var index in newModel.columnDefs) {
                var col = newModel.columnDefs[index];
                if (!col.headerClass) {
                    col.headerClass = 'qgrid-cell-header';
                }
                if (col.qgridColumnSettings && col.qgridColumnSettings.cellFormatter) {
                    col.cellTemplate = col.qgridColumnSettings.cellFormatter.template;
                }
                if (col.qgridColumnSettings.qgridColumnHeaderStyle === 2 /* TypeaheadTexBox */) {
                    col.headerCellTemplate = '/src/templates/nggrid/qgrid-typeahead-header-cell.html';
                }
                if (col.qgridColumnSettings.qgridColumnHeaderStyle === 1 /* SearchTextBox */) {
                    col.headerCellTemplate = '/src/templates/nggrid/qgrid-searchtextbox-header-cell.html';
                }
            }

            return newModel;
        };
        GridService.prototype.buildServerRequestObject = function (gridModel) {
            return this.qgridServverRequestBuilder.constructServcerRequestObject(gridModel);
        };
        GridService.prototype.performSearch = function (gridModel) {
            return this.loadGrid(gridModel);
        };
        GridService.prototype.requestData = function (searchObject, gridModel) {
            return this.$http.post(gridModel.qgridSettings.domain + gridModel.qgridSettings.urlDataRequest, searchObject);
        };
        GridService.prototype.loadGrid = function (gridModel) {
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
                    console.log(gridModel.pagingOptions.currentPage);
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

        GridService.prototype.onSort = function (newVal, oldVal, gridModel) {
            return this.loadGrid(gridModel);
        };
        GridService.prototype.onPaging = function (newVal, oldVal, gridModel) {
            if (!newVal.manualPaging) {
                return this.loadGrid(gridModel);
            }
        };
        GridService.prototype.autoComplete = function (val, gridModel) {
            var _this = this;
            return this.$timeout(function () {
                var searchObject = _this.buildServerRequestObject(gridModel);
                searchObject.requestInfo.acc = val.field;
                return _this.$http.post(gridModel.qgridSettings.domain + gridModel.qgridSettings.urlAutoComplete, searchObject).then(function (res) {
                    return res.data;
                });
            }, 0);
        };
        GridService.prototype.exportGrid = function (type, gridModel) {
            var searchObject = this.buildServerRequestObject(gridModel);
            searchObject.requestInfo.et = type;
            $.fileDownload(gridModel.qgridSettings.domain + gridModel.qgridSettings.urlExport, {
                httpMethod: 'POST',
                data: searchObject
            });
        };
        GridService.prototype.resetGrid = function (gridModel) {
            angular.forEach(gridModel.columnDefs, function (col) {
                col.qgridColumnSettings.searchValue = '';
            });
            return this.loadGrid(gridModel);
        };
        GridService.$inject = ['$http', '$q', '$timeout', '$interval', 'qgridExtender', 'qgridServerRequestBuilder', 'qgridDefaultQgridModel', 'qgridDefaultQgridSettings'];
        return GridService;
    })();
    qgrid.GridService = GridService;
})(qgrid || (qgrid = {}));

angular.module('qgrid').service('qgridService', qgrid.GridService);
//# sourceMappingURL=qgrid-service.js.map
