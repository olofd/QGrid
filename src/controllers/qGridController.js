angular.module('qGrid').controller('qGridController', [
    '$scope', '$http', '$q', '$timeout', function ($scope, $http, $q, $timeout) {
        console.log("loading");
        var createRequestGuid = function () {
            function _p8(s) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }
            return _p8(undefined) + _p8(true) + _p8(true) + _p8(undefined);
        };

        var gridModel = {
            headerRowHeight: 70,
            footerRowHeight: 40,
            headerRowTemplate: "src/templates/nggrid/qgrid-header-row-template.html",
            footerTemplate: "src/templates/nggrid/footer.html",
            enablePaging: true,
            showFooter: true,
            enablePinning: false,
            multiSelect: false,
            useExternalSorting: true,
            i18n: "en",
            pagingOptions: {
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 50]
            }
        };

        var qGridSettings = {
            buildServerRequestObject: function (search) {
                var requestIsSearch = false;
                var searchObject = {
                    requestInfo: {
                        id: this.gridId,
                        rows: gridModel.pagingOptions.pageSize,
                        rguid: createRequestGuid(),
                        search: search,
                        sf: (function () {
                            if (gridModel.sortInfo && gridModel.sortInfo.fields && gridModel.sortInfo.fields.length > 0) {
                                return gridModel.sortInfo.fields[0];
                            }
                        }()),
                        sord: (function () {
                            if (gridModel.sortInfo && gridModel.sortInfo.directions && gridModel.sortInfo.directions.length > 0) {
                                return gridModel.sortInfo.directions[0];
                            }
                        }())
                    },
                    requestSearchInfo: (function () {
                        var isSearch = false;
                        var soObject = [];
                        for (var i = 0; i < gridModel.columnDefs.length; i++) {
                            var obj = gridModel.columnDefs[i];
                            if (obj.qGridColumnSettings.searchValue && obj.qGridColumnSettings.searchValue !== '') {
                                isSearch = true;
                            }
                            soObject.push({
                                n: obj.field,
                                so: qGrid.QGridHelper.getShortSearchOpertionForSearchOperationEnum(obj),
                                v: obj.qGridColumnSettings.searchValue,
                                pk: obj.primaryKey
                            });
                            requestIsSearch = isSearch;
                        }

                        return soObject;
                    }())
                };

                searchObject.requestInfo.search = requestIsSearch;
                searchObject.requestInfo.page = requestIsSearch ? 1 : gridModel.pagingOptions.currentPage;
                return searchObject;
            },
            performSearch: function () {
                return this.loadGrid();
            },
            requestData: function (searchObject) {
                return $http.post(this.domain + this.urlDataRequest, searchObject);
            },
            loadGrid: function () {
                var _this = this;
                gridModel.qGridSettings.isLoading = true;
                var defered = $q.defer();
                var requestPromise = this.requestData(this.buildServerRequestObject());
                requestPromise.success(function (response) {
                    var qGrid = _this;
                    qGrid.rows = response.rows;
                    qGrid.totalServerItems = response.records;
                    defered.resolve(response);
                    if (response.page !== gridModel.pagingOptions.currentPage) {
                        //Updating the pager without reloading the grid (ManualPaging)
                        gridModel.pagingOptions.manualPaging = true;
                        gridModel.pagingOptions.currentPage = response.page;
                        $timeout(function () {
                            gridModel.pagingOptions.manualPaging = false;
                        }, 0);
                    }
                    gridModel.qGridSettings.isLoading = false;
                });
                requestPromise.error(function (error) {
                    defered.reject(error);
                });
                return defered.promise;
            },
            onSort: function (newVal, oldVal) {
                return this.loadGrid();
            },
            onPaging: function (newVal, oldVal) {
                if (!newVal.manualPaging) {
                    return this.loadGrid();
                }
            },
            autoComplete: function (val) {
                var _this = this;
                return $timeout(function () {
                    var searchObject = _this.buildServerRequestObject();
                    searchObject.requestInfo.acc = val.field;
                    return $http.post(_this.domain + _this.urlAutoComplete, searchObject).then(function (res) {
                        return res.data;
                    });
                }, 0);
            },
            exportGrid: function (type) {
                var searchObject = this.buildServerRequestObject();
                searchObject.requestInfo.et = type;
                $.fileDownload(this.domain + this.urlExport, {
                    httpMethod: 'POST',
                    data: searchObject
                });
            },
            resetGrid: function () {
                angular.forEach(gridModel.columnDefs, function (col) {
                    col.qGridColumnSettings.searchValue = '';
                });
                return gridModel.qGridSettings.loadGrid();
            },
            enableAllExports: false,
            enableFooterSettings: false,
            isLoading: false
        };

        function deepExtend(destination, source) {
            for (var property in source) {
                if (source[property] && source[property].constructor && source[property].constructor === Object) {
                    destination[property] = destination[property] || {};
                    arguments.callee(destination[property], source[property]);
                } else {
                    destination[property] = source[property];
                }
            }
            return destination;
        }

        gridModel.qGridSettings = qGridSettings;
        $scope.qGrid = deepExtend(gridModel, $scope.qGrid);
        $scope.qGrid.data = "qGrid.qGridSettings.rows";
        $scope.qGrid.totalServerItems = "qGrid.qGridSettings.totalServerItems";

        console.log($scope.qGrid);

        angular.forEach($scope.qGrid.columnDefs, function (col) {
            if (!col.headerClass) {
                col.headerClass = 'qgrid-cell-header';
            }
            if (col.qGridColumnSettings && col.qGridColumnSettings.cellFormatter) {
                col.cellTemplate = col.qGridColumnSettings.cellFormatter.template;
            }
            if (col.qGridColumnSettings.qgridColumnHeaderStyle === 2 /* TypeaheadTexBox */) {
                col.headerCellTemplate = '/src/templates/nggrid/qgrid-typeahead-header-cell.html';
            }
            if (col.qGridColumnSettings.qgridColumnHeaderStyle === 1 /* SearchTextBox */) {
                col.headerCellTemplate = '/src/templates/nggrid/qgrid-searchtextbox-header-cell.html';
            }
        });

        //Doing this in secret, don't want the loadningmechanisms exposed on the interface.
        $scope.qGrid.qGridSettings.modelComplete = true;
        $scope.qGrid.qGridSettings.loadGrid();

        $scope.$watch('qGrid.sortInfo', function (newVal, oldVal) {
            if (newVal.directions[0] !== oldVal.directions[0] || newVal.fields[0] !== oldVal.fields[0]) {
                $scope.qGrid.qGridSettings.onSort(newVal, oldVal);
            }
        }, true);

        $scope.$watch('qGrid.pagingOptions', function (newVal, oldVal) {
            console.log("RunPag");
            if (newVal !== oldVal) {
                $scope.qGrid.qGridSettings.onPaging(newVal, oldVal);
            }
        }, true);
    }]);
//# sourceMappingURL=qGridController.js.map
