var qGrid;
(function (qGrid) {
    (function (SearchOp) {
        SearchOp[SearchOp["IsEqualTo"] = 0] = "IsEqualTo";
        SearchOp[SearchOp["IsNotEqualTo"] = 1] = "IsNotEqualTo";
        SearchOp[SearchOp["IsLessThan"] = 2] = "IsLessThan";
        SearchOp[SearchOp["IsLessOrEqualTo"] = 3] = "IsLessOrEqualTo";
        SearchOp[SearchOp["IsGreaterThan"] = 4] = "IsGreaterThan";
        SearchOp[SearchOp["IsGreaterOrEqualTo"] = 5] = "IsGreaterOrEqualTo";
        SearchOp[SearchOp["IsIn"] = 6] = "IsIn";
        SearchOp[SearchOp["IsNotIn"] = 7] = "IsNotIn";
        SearchOp[SearchOp["BeginsWith"] = 8] = "BeginsWith";
        SearchOp[SearchOp["DoesNotBeginWith"] = 9] = "DoesNotBeginWith";
        SearchOp[SearchOp["EndsWith"] = 10] = "EndsWith";
        SearchOp[SearchOp["DoesNotEndWith"] = 11] = "DoesNotEndWith";
        SearchOp[SearchOp["Contains"] = 12] = "Contains";
        SearchOp[SearchOp["DoesNotContain"] = 13] = "DoesNotContain";
        SearchOp[SearchOp["ManualFilter"] = 14] = "ManualFilter";
    })(qGrid.SearchOp || (qGrid.SearchOp = {}));
    var SearchOp = qGrid.SearchOp;
    (function (DataType) {
        DataType[DataType["DateTime"] = 0] = "DateTime";
    })(qGrid.DataType || (qGrid.DataType = {}));
    var DataType = qGrid.DataType;
    (function (IQGridColumnHeaderStyle) {
        IQGridColumnHeaderStyle[IQGridColumnHeaderStyle["None"] = 0] = "None";
        IQGridColumnHeaderStyle[IQGridColumnHeaderStyle["SearchTextBox"] = 1] = "SearchTextBox";
        IQGridColumnHeaderStyle[IQGridColumnHeaderStyle["TypeaheadTexBox"] = 2] = "TypeaheadTexBox";
        IQGridColumnHeaderStyle[IQGridColumnHeaderStyle["DatePickerTextBox"] = 3] = "DatePickerTextBox";
    })(qGrid.IQGridColumnHeaderStyle || (qGrid.IQGridColumnHeaderStyle = {}));
    var IQGridColumnHeaderStyle = qGrid.IQGridColumnHeaderStyle;
})(qGrid || (qGrid = {}));
angular.module('qGrid', ['ngGrid', 'ui.bootstrap']);
var qGrid;
(function (qGrid) {
    var DateTimeCellFormater = (function () {
        function DateTimeCellFormater(format) {
            if (typeof format === "undefined") { format = 'yyyy-MM-dd HH:mm:ss'; }
            this.format = format;
        }
        Object.defineProperty(DateTimeCellFormater.prototype, "template", {
            get: function () {
                return "/src/templates/nggrid/datetime-cell.html";
            },
            enumerable: true,
            configurable: true
        });
        return DateTimeCellFormater;
    })();
    qGrid.DateTimeCellFormater = DateTimeCellFormater;
    var QGridHelper = (function () {
        function QGridHelper(gridModel, $http) {
            this.gridModel = gridModel;
        }
        QGridHelper.getShortSearchOpertionForSearchOperationEnum = function (column) {
            if (column.qGridColumnSettings.searchOperation === 0 /* IsEqualTo */) {
                return "eq";
            }
            if (column.qGridColumnSettings.searchOperation === 1 /* IsNotEqualTo */) {
                return "ne";
            }
            if (column.qGridColumnSettings.searchOperation === 2 /* IsLessThan */) {
                return "lt";
            }
            if (column.qGridColumnSettings.searchOperation === 3 /* IsLessOrEqualTo */) {
                return "le";
            }
            if (column.qGridColumnSettings.searchOperation === 4 /* IsGreaterThan */) {
                return "gt";
            }
            if (column.qGridColumnSettings.searchOperation === 5 /* IsGreaterOrEqualTo */) {
                return "ge";
            }
            if (column.qGridColumnSettings.searchOperation === 6 /* IsIn */) {
                return "in";
            }
            if (column.qGridColumnSettings.searchOperation === 7 /* IsNotIn */) {
                return "ni";
            }
            if (column.qGridColumnSettings.searchOperation === 8 /* BeginsWith */) {
                return "bw";
            }
            if (column.qGridColumnSettings.searchOperation === 9 /* DoesNotBeginWith */) {
                return "bn";
            }
            if (column.qGridColumnSettings.searchOperation === 10 /* EndsWith */) {
                return "ew";
            }
            if (column.qGridColumnSettings.searchOperation === 11 /* DoesNotEndWith */) {
                return "en";
            }
            if (column.qGridColumnSettings.searchOperation === 12 /* Contains */) {
                return "cn";
            }
            if (column.qGridColumnSettings.searchOperation === 13 /* DoesNotContain */) {
                return "nc";
            }
            if (column.qGridColumnSettings.searchOperation === 14 /* ManualFilter */) {
                return "mf";
            }
            return "bw";
        };
        return QGridHelper;
    })();
    qGrid.QGridHelper = QGridHelper;
})(qGrid || (qGrid = {}));
angular.module('qGrid').directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter, { 'event': event });
                });

                event.preventDefault();
            }
        });
    };
});
angular.module('qGrid').directive('qGrid', function ($parse) {
    return {
        scope: {
            qGrid: "="
        },
        link: function ($scope, element, attrs) {
        },
        templateUrl: 'src/templates/qgrid/qgrid.html',
        controller: 'qGridController'
    };
});
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
//# sourceMappingURL=qgrid.js.map

angular.module('qGrid').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/qgrid/qgrid.html',
    "<div ng-if=qGrid.qGridSettings.modelComplete class=qgrid ng-grid=qGrid></div>"
  );

}]);

angular.module('ngGrid').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/nggrid/datetime-cell.html',
    "<div class=ngCellText ng-class=col.colIndex()><span ng-cell-text=\"\">{{row.getProperty(col.field) | date: col.colDef.qGridColumnSettings.cellFormatter.format}}</span></div>"
  );


  $templateCache.put('src/templates/nggrid/footer.html',
    "<div ng-show=showFooter class=qgrid-footer ng-style=footerStyle()><div class=container><div class=row><div class=col-xs-3><span class=btn-group><button type=button class=\"btn btn-default btn-sm\" ng-click=$parent.$parent.qGrid.qGridSettings.resetGrid()><span class=\"fa fa-refresh\"></span></button> <button type=button class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=dropdown ng-if=$parent.$parent.qGrid.qGridSettings.enableFooterSettings><i class=\"fa fa-cogs\"></i> <span class=caret></span></button><ul class=dropdown-menu><li ng-if=\"$parent.$parent.qGrid.qGridSettings.enableAllExports || $parent.$parent.qGrid.qGridSettings.enableExcelExport\"><a href=# ng-click=\"$parent.$parent.qGrid.qGridSettings.exportGrid('Excel')\">Export to Excel</a></li><li ng-if=\"$parent.$parent.qGrid.qGridSettings.enableAllExports || $parent.$parent.qGrid.qGridSettings.enablePDFExport\"><a href=# ng-click=\"$parent.$parent.qGrid.qGridSettings.exportGrid('PDF')\">Export to PDF</a></li><li ng-if=\"$parent.$parent.qGrid.qGridSettings.enableAllExports || $parent.$parent.qGrid.qGridSettings.enableCSVExport\"><a href=# ng-click=\"$parent.$parent.qGrid.qGridSettings.exportGrid('CSV')\">Export to CSV</a></li><li ng-repeat=\"footerFunction in $parent.$parent.qGrid.qGridSettings.footerActions\"><a href=# ng-click=\"footerFunction.callback(footerFunction, $parent.$parent.qGrid)\">{{footerFunction.title}}</a></li></ul></span></div><div class=col-xs-6 style=text-align:center><div class=btn-group><button ng-click=pageToFirst() ng-disabled=cantPageBackward() type=button class=\"btn btn-default btn-sm\"><i class=\"fa fa-step-backward qgrid-pager-button\"></i></button> <button ng-click=pageBackward() ng-disabled=cantPageBackward() type=button class=\"btn btn-default btn-sm\" style=\"border-right:none !important\"><i class=\"fa fa-chevron-left qgrid-pager-button\"></i></button> <span class=qgrid-pager-input><input class=ngPagerCurrent min=1 max={{currentMaxPages}} type=number style=\"width:49px; height: 30px\" ng-model=pagingOptions.currentPage ng-disabled=$parent.$parent.qGrid.qGridSettings.isLoading></span> <button ng-click=pageForward() ng-disabled=cantPageForward() type=button class=\"btn btn-default btn-sm\" style=\"border-left:none !important\"><i class=\"fa fa-chevron-right qgrid-pager-button\"></i></button> <button ng-click=pageToLast() ng-disabled=cantPageToLast() type=button class=\"btn btn-default btn-sm\"><i class=\"fa fa-step-forward qgrid-pager-button\"></i></button> <button type=button class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=dropdown>{{pagingOptions.pageSize}} rows <span class=caret></span></button><ul class=\"dropdown-menu pull-right\"><li ng-repeat=\"size in pagingOptions.pageSizes\" ng-click=\"pagingOptions.pageSize = size;\"><a href=#>{{size}} rows</a></li></ul></div></div><div class=col-xs-3><div class=qgrid-pager-container><span><span class=ngFooterTotalItems ng-class=\"{'ngNoMultiSelect': !multiSelect}\"><span class=qgrid-label>{{maxRows()}} rows total</span> <span ng-show=\"filterText.length > 0\" class=ngLabel>({{i18n.ngShowingItemsLabel}} {{totalFilteredItemsLength()}})</span></span> <span class=ngFooterSelectedItems ng-show=multiSelect><span class=qgrid-label>{{i18n.ngSelectedItemsLabel}} {{selectedItems.length}}</span></span></span> <span tooltip-placement=right tooltip=\"I spin when the grid is loading!\"><i class=\"qgrid-spinner fa fa-cog\" ng-class=\"{'fa-spin' : $parent.$parent.qGrid.qGridSettings.isLoading}\"></i></span></div></div></div></div></div>"
  );


  $templateCache.put('src/templates/nggrid/qgrid-header-row-template.html',
    "<div ng-style=\"{ height: col.headerRowHeight }\" ng-repeat=\"col in renderedColumns\" ng-class=col.colIndex() class=ngHeaderCell><div class=ngVerticalBar ng-style=\"{height: col.headerRowHeight}\" ng-class=\"{ ngVerticalBarVisible: !$last }\">&nbsp;</div><div ng-header-cell=\"\"></div></div>"
  );


  $templateCache.put('src/templates/nggrid/qgrid-pager-steppable.html',
    "<ul class=\"pagination pagination-sm qgrid-pager\"><li><a href=# ng-click=pageToFirst() ng-disabled=cantPageBackward()><span class=\"glyphicon glyphicon-step-backward\"></span></a></li><li><a href=# ng-click=pageBackward() ng-disabled=cantPageBackward()><span class=\"glyphicon glyphicon-chevron-left\"></span></a></li><li ng-repeat=\"pageLink in pageLinks\" ng-show=!pageLink.hidden ng-class=\"{'active' : pageLink.active}\"><a href=# ng-click=setCurrentPage(pageLink.value)>{{pageLink.title}}</a></li><li><a href=# ng-click=pageForward() ng-disabled=cantPageForward()><span class=\"glyphicon glyphicon-chevron-right\"></span></a></li><li><a href=# ng-click=pageToLast() ng-disabled=cantPageToLast()><span class=\"glyphicon glyphicon-step-forward\"></span></a></li></ul>"
  );


  $templateCache.put('src/templates/nggrid/qgrid-searchtextbox-header-cell.html',
    "<div class=\"ngHeaderSortColumn {{col.headerClass}} qgrid-header-cell\" ng-style=\"{'cursor': col.cursor}\" ng-class=\"{ 'ngSorted': !noSortVisible }\"><div ng-click=col.sort($event) ng-class=\"'colt' + col.index\" class=ngHeaderText>{{col.displayName}}</div><form class=\"bs-example bs-example-form\" role=form><span style=\"display:inline-block; padding: 0px 5px 0px 5px; width: 100%\"><div class=input-group style=\"width: 100%\"><input type=text class=form-control placeholder={{col.displayName}} ng-enter=$parent.qGrid.qGridSettings.performSearch() ng-model=col.colDef.qGridColumnSettings.searchValue></div></span></form><div class=ngSortButtonDown ng-show=col.showSortButtonDown()></div><div class=ngSortButtonUp ng-show=col.showSortButtonUp()></div><div class=ngSortPriority>{{col.sortPriority}}</div><div ng-class=\"{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }\" ng-click=togglePin(col) ng-show=col.pinnable></div></div><div ng-show=col.resizable class=ngHeaderGrip ng-click=col.gripClick($event) ng-mousedown=col.gripOnMouseDown($event)></div>"
  );


  $templateCache.put('src/templates/nggrid/qgrid-typeahead-header-cell.html',
    "<div class=\"ngHeaderSortColumn {{col.headerClass}} typeahead\" ng-style=\"{'cursor': col.cursor}\" ng-class=\"{ 'ngSorted': !noSortVisible }\"><div ng-click=col.sort($event) ng-class=\"'colt' + col.index\" class=ngHeaderText>{{col.displayName}}</div><span style=\"display:inline-block; padding: 0 5px 0 5px; width: 100%\"><input type=text ng-model=col.colDef.qGridColumnSettings.searchValue placeholder={{col.displayName}} ng-dblclick=openTypeAhead() typeahead=\"address for address in $parent.qGrid.qGridSettings.autoComplete(col.colDef) | filter:$viewValue\" typeahead-editable=true typeahead-loading=loadingLocations class=form-control ng-enter=$parent.qGrid.qGridSettings.performSearch()></span><div class=ngSortButtonDown ng-show=col.showSortButtonDown()></div><div class=ngSortButtonUp ng-show=col.showSortButtonUp()></div><div class=ngSortPriority>{{col.sortPriority}}</div><div ng-class=\"{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }\" ng-click=togglePin(col) ng-show=col.pinnable></div></div><div ng-show=col.resizable class=ngHeaderGrip ng-click=col.gripClick($event) ng-mousedown=col.gripOnMouseDown($event)></div>"
  );

}]);
