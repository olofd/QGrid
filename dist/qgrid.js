angular.module('ui.bootstrap.typeahead').directive('qgridTypeahead', [
        '$compile', '$parse', '$q', '$timeout', '$document', '$position', 'typeaheadParser',
        function($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {

            var HOT_KEYS = [9, 13, 27, 38, 40];

            return {
                require: 'ngModel',
                link: function(originalScope, element, attrs, modelCtrl) {

                    //SUPPORTED ATTRIBUTES (OPTIONS)

                    //minimal no of characters that needs to be entered before typeahead kicks-in
                    var minSearch = originalScope.$eval(attrs.qgridTypeaheadMinLength) || 1;

                    //minimal wait time after last character typed before typehead kicks-in
                    var waitTime = originalScope.$eval(attrs.qgridTypeaheadWaitMs) || 0;

                    //should it restrict model values to the ones selected from the popup only?
                    var isEditable = originalScope.$eval(attrs.qgridTypeaheadEditable) !== false;

                    //binding to a variable that indicates if matches are being retrieved asynchronously
                    var isLoadingSetter = $parse(attrs.qgridTypeaheadLoading).assign || angular.noop;

                    //a callback executed when a match is selected
                    var onSelectCallback = $parse(attrs.qgridTypeaheadOnSelect);

                    var inputFormatter = attrs.qgridTypeaheadInputFormatter ? $parse(attrs.qgridTypeaheadInputFormatter) : undefined;

                    var appendToBody = attrs.qgridTypeaheadAppendToBody ? originalScope.$eval(attrs.qgridTypeaheadAppendToBody) : false;

                    //INTERNAL VARIABLES

                    //model setter executed upon match selection
                    var $setModelValue = $parse(attrs.ngModel).assign;

                    //expressions used by typeahead
                    var parserResult = typeaheadParser.parse(attrs.qgridTypeahead);

                    var hasFocus;

                    // WAI-ARIA
                    element.attr({
                        'aria-autocomplete': 'list',
                        'aria-expanded': false
                    });

                    //pop-up element used to display matches
                    var popUpEl = angular.element('<div typeahead-popup></div>');
                    popUpEl.attr({
                        matches: 'matches',
                        active: 'activeIdx',
                        select: 'select(activeIdx)',
                        query: 'query',
                        position: 'position'
                    });
                    //custom item template
                    if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
                        popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
                    }

                    //create a child scope for the typeahead directive so we are not polluting original scope
                    //with typeahead-specific data (matches, query etc.)
                    var scope = originalScope.$new();
                    originalScope.$on('$destroy', function () {
                        scope.$destroy();
                    });

                    var resetMatches = function () {
                        scope.matches = [];
                        scope.activeIdx = -1;
                    };

                    var getMatchesAsync = function (inputValue) {

                        var locals = { $viewValue: inputValue };
                        isLoadingSetter(originalScope, true);
                        $q.when(parserResult.source(originalScope, locals)).then(function (matches) {

                            //it might happen that several async queries were in progress if a user were typing fast
                            //but we are interested only in responses that correspond to the current view value
                            if (inputValue === modelCtrl.$viewValue && hasFocus) {
                                if (matches.length > 0) {

                                    //EDIT OLOF DAHLBOM
                                    scope.activeIdx = -1;
                                    scope.matches.length = 0;

                                    //transform labels
                                    for (var i = 0; i < matches.length; i++) {
                                        locals[parserResult.itemName] = matches[i];
                                        scope.matches.push({
                                            label: parserResult.viewMapper(scope, locals),
                                            model: matches[i]
                                        });
                                    }

                                    scope.query = inputValue;
                                    //position pop-up with matches - we need to re-calculate its position each time we are opening a window
                                    //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
                                    //due to other elements being rendered
                                    scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                                    scope.position.top = scope.position.top + element.prop('offsetHeight');

                                } else {
                                    resetMatches();
                                }
                                isLoadingSetter(originalScope, false);
                            }
                        }, function () {
                            resetMatches();
                            isLoadingSetter(originalScope, false);
                        });
                    };

                    resetMatches();

                    //we need to propagate user's query so we can higlight matches
                    scope.query = undefined;

                    //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later 
                    var timeoutPromise;

                    //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
                    //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
                    modelCtrl.$parsers.unshift(function (inputValue) {

                        hasFocus = true;

                        if (inputValue && inputValue.length >= minSearch) {
                            if (waitTime > 0) {
                                if (timeoutPromise) {
                                    $timeout.cancel(timeoutPromise);//cancel previous timeout
                                }
                                timeoutPromise = $timeout(function () {
                                    getMatchesAsync(inputValue);
                                }, waitTime);
                            } else {
                                getMatchesAsync(inputValue);
                            }
                        } else {
                            isLoadingSetter(originalScope, false);
                            resetMatches();
                        }

                        if (isEditable) {
                            return inputValue;
                        } else {
                            if (!inputValue) {
                                // Reset in case user had typed something previously.
                                modelCtrl.$setValidity('editable', true);
                                return inputValue;
                            } else {
                                modelCtrl.$setValidity('editable', false);
                                return undefined;
                            }
                        }
                    });
                    originalScope.openTypeAhead = function () {
                        //modelCtrl.$parsers.unshift();
                    };
                    modelCtrl.$formatters.push(function (modelValue) {

                        var candidateViewValue, emptyViewValue;
                        var locals = {};

                        if (inputFormatter) {

                            locals['$model'] = modelValue;
                            return inputFormatter(originalScope, locals);

                        } else {

                            //it might happen that we don't have enough info to properly render input value
                            //we need to check for this situation and simply return model value if we can't apply custom formatting
                            locals[parserResult.itemName] = modelValue;
                            candidateViewValue = parserResult.viewMapper(originalScope, locals);
                            locals[parserResult.itemName] = undefined;
                            emptyViewValue = parserResult.viewMapper(originalScope, locals);

                            return candidateViewValue !== emptyViewValue ? candidateViewValue : modelValue;
                        }
                    });

                    scope.select = function (activeIdx) {
                        console.log(activeIdx);
                        //called from within the $digest() cycle
                        var locals = {};
                        var model, item;

                        locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
                        model = parserResult.modelMapper(originalScope, locals);
                        $setModelValue(originalScope, model);
                        modelCtrl.$setValidity('editable', true);

                        onSelectCallback(originalScope, {
                            $item: item,
                            $model: model,
                            $label: parserResult.viewMapper(originalScope, locals)
                        });

                        resetMatches();

                        //return focus to the input element if a mach was selected via a mouse click event
                        element[0].focus();
                    };

                    //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
                    element.bind('keydown', function (evt) {

                        //typeahead is open and an "interesting" key was pressed
                        if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
                            return;
                        }

                        evt.preventDefault();

                        if (evt.which === 40) {
                            scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
                            scope.$digest();

                        } else if (evt.which === 38) {
                            scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
                            scope.$digest();

                        } else if (evt.which === 13 || evt.which === 9) {
                            //EDIT OLOF DAHLBOM
                            scope.$apply(function () {
                                if (scope.activeIdx !== -1) {
                                    scope.select(scope.activeIdx);
                                } else {
                                    evt.stopPropagation();
                                    resetMatches();
                                }
                            });

                        } else if (evt.which === 27) {
                            evt.stopPropagation();

                            resetMatches();
                            scope.$digest();
                        }

                    });

                    element.bind('blur', function (evt) {
                        hasFocus = false;
                    });

                    // Keep reference to click handler to unbind it.
                    var dismissClickHandler = function (evt) {
                        if (element[0] !== evt.target) {
                            resetMatches();
                            scope.$digest();
                        }
                    };

                    $document.bind('click', dismissClickHandler);

                    originalScope.$on('$destroy', function () {
                        $document.unbind('click', dismissClickHandler);
                    });

                    var $popup = $compile(popUpEl)(scope);
                    if (appendToBody) {
                        $document.find('body').append($popup);
                    } else {
                        element.after($popup);
                    }
                }
            };

        }
    ]);
var qgrid;
(function (qgrid) {
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
    })(qgrid.SearchOp || (qgrid.SearchOp = {}));
    var SearchOp = qgrid.SearchOp;
    (function (DataType) {
        DataType[DataType["DateTime"] = 0] = "DateTime";
    })(qgrid.DataType || (qgrid.DataType = {}));
    var DataType = qgrid.DataType;
    (function (IQGridColumnHeaderStyle) {
        IQGridColumnHeaderStyle[IQGridColumnHeaderStyle["None"] = 0] = "None";
        IQGridColumnHeaderStyle[IQGridColumnHeaderStyle["SearchTextBox"] = 1] = "SearchTextBox";
        IQGridColumnHeaderStyle[IQGridColumnHeaderStyle["TypeaheadTexBox"] = 2] = "TypeaheadTexBox";
        IQGridColumnHeaderStyle[IQGridColumnHeaderStyle["DatePickerTextBox"] = 3] = "DatePickerTextBox";
    })(qgrid.IQGridColumnHeaderStyle || (qgrid.IQGridColumnHeaderStyle = {}));
    var IQGridColumnHeaderStyle = qgrid.IQGridColumnHeaderStyle;
})(qgrid || (qgrid = {}));
angular.module('qgrid', ['ngGrid', 'ui.bootstrap']);
var qgrid;
(function (qgrid) {
    var QGridHelper = (function () {
        function QGridHelper(gridModel, $http) {
            this.gridModel = gridModel;
        }
        return QGridHelper;
    })();
    qgrid.QGridHelper = QGridHelper;
})(qgrid || (qgrid = {}));
angular.module('qgrid').directive('ngEnter', function () {
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
angular.module('qgrid').directive('qgrid', [
    'qgridService', function (qgridService) {
        return {
            scope: {
                qgrid: "="
            },
            templateUrl: 'src/templates/qgrid/qgrid.html',
            controller: [
                '$scope', function ($scope) {
                    qgridService.createGrid($scope);
                }]
        };
    }]);
var qgrid;
(function (qgrid) {
    var DateTimeCellFormatter = (function () {
        function DateTimeCellFormatter($templateCache) {
            this.$templateCache = $templateCache;
        }
        Object.defineProperty(DateTimeCellFormatter.prototype, "template", {
            get: function () {
                return this.$templateCache.get('/src/templates/nggrid/qgrid-datetime-cell.html');
            },
            enumerable: true,
            configurable: true
        });
        DateTimeCellFormatter.$inject = ['$templateCache'];
        return DateTimeCellFormatter;
    })();
    qgrid.DateTimeCellFormatter = DateTimeCellFormatter;
})(qgrid || (qgrid = {}));

angular.module('qgrid').service('qgridDateTimeCellFormatter', qgrid.DateTimeCellFormatter);
angular.module('qgrid').factory('qgridExtender', function () {
    return {
        deepExtend: function (destination, source) {
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
    };
});
angular.module('qgrid').factory('qgridDefaultQgridModel', function () {
    return {
        getNewDefault: function () {
            return {
                data: "qgrid.qgridSettings.rows",
                totalServerItems: "qgrid.qgridSettings.totalServerItems",
                headerRowHeight: 75,
                footerRowHeight: 48,
                headerRowTemplate: "src/templates/nggrid/qgrid-header-row-template.html",
                footerTemplate: "src/templates/nggrid/qgrid-footer.html",
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
        }
    };
});
angular.module('qgrid').factory('qgridDefaultQgridSettings', function () {
    return {
        getNewDefault: function () {
            return {
                rows: [],
                gridId: "DefaultGrid",
                domain: "",
                urlDataRequest: this.domain + this.gridId + "/DataRequest",
                urlAutoComplete: this.domain + this.gridId + "/AutoComplete",
                urlExport: this.domain + this.gridId + "/Export",
                enableAllExports: false,
                enableExcelExport: false,
                enablePDFExport: false,
                enableCSVExport: false,
                totalServerItems: 0,
                isLoading: false
            };
        }
    };
});
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
var qgrid;
(function (qgrid) {
    var GridService = (function () {
        function GridService(qgridExtender, qgridDefaultQgridModel, qgridDefaultQgridSettings, qgridOperations, $templateCache) {
            this.qgridExtender = qgridExtender;
            this.qgridDefaultQgridModel = qgridDefaultQgridModel;
            this.qgridDefaultQgridSettings = qgridDefaultQgridSettings;
            this.qgridOperations = qgridOperations;
            this.$templateCache = $templateCache;
        }
        GridService.prototype.createGrid = function ($scope) {
            var _this = this;
            $scope.qgrid = this.setupGrid($scope.qgrid);
            $scope.$watch('qgrid.qgridSettings.isLoaded', function (newVal, oldVal) {
                if (newVal) {
                    _this.qgridOperations.loadGrid($scope.qgrid);
                }
            }, true);

            $scope.$watch('qgrid.sortInfo', function (newVal, oldVal) {
                if (newVal.directions[0] !== oldVal.directions[0] || newVal.fields[0] !== oldVal.fields[0]) {
                    _this.qgridOperations.onSort(newVal, oldVal, $scope.qgrid);
                }
            }, true);

            $scope.$watch('qgrid.pagingOptions', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    _this.qgridOperations.onPaging(newVal, oldVal, $scope.qgrid);
                }
            }, true);

            $scope.qgrid.qgridSettings.isLoaded = true;
        };
        GridService.prototype.setupGrid = function (userGridModel) {
            var that = this;

            var newModel = this.qgridDefaultQgridModel.getNewDefault();
            var newSettingsObject = this.qgridDefaultQgridSettings.getNewDefault();
            newModel.qgridSettings = newSettingsObject;
            this.qgridExtender.deepExtend(newModel, userGridModel);

            newModel.qgridSettings.loadGrid = (function (gridModel, iqgridOperations) {
                return function () {
                    return iqgridOperations.loadGrid(gridModel);
                };
            }(newModel, this.qgridOperations));

            newModel.qgridSettings.exportGrid = (function (gridModel, iqgridOperations) {
                return function (type) {
                    return iqgridOperations.exportGrid(type, gridModel);
                };
            }(newModel, this.qgridOperations));

            newModel.qgridSettings.resetGrid = (function (gridModel, iqgridOperations) {
                return function () {
                    return iqgridOperations.resetGrid(gridModel);
                };
            }(newModel, this.qgridOperations));

            newModel.qgridSettings.autoComplete = (function (gridModel, iqgridOperations) {
                return function (column) {
                    return iqgridOperations.autoComplete(column, gridModel);
                };
            }(newModel, this.qgridOperations));

            newModel.qgridSettings.performSearch = (function (gridModel, iqgridOperations) {
                return function () {
                    return iqgridOperations.performSearch(gridModel);
                };
            }(newModel, this.qgridOperations));

            for (var index in newModel.columnDefs) {
                var col = newModel.columnDefs[index];
                if (!col.headerClass) {
                    col.headerClass = 'qgrid-cell-header';
                }
                if (col.qgridColumnSettings && col.qgridColumnSettings.cellFormatter) {
                    col.cellTemplate = col.qgridColumnSettings.cellFormatter.template;
                }
                if (col.qgridColumnSettings.qgridColumnHeaderStyle === 2 /* TypeaheadTexBox */) {
                    col.headerCellTemplate = this.$templateCache.get('src/templates/qgrid/qgrid-typeahead-header-cell.html');
                    console.log(col.headerCellTemplate);
                }
                if (col.qgridColumnSettings.qgridColumnHeaderStyle === 1 /* SearchTextBox */) {
                    col.headerCellTemplate = this.$templateCache.get('src/templates/qgrid/qgrid-searchtextbox-header-cell.html');
                    console.log(col.headerCellTemplate);
                }
            }
            console.log(newModel);
            return newModel;
        };
        GridService.$inject = ['qgridExtender', 'qgridDefaultQgridModel', 'qgridDefaultQgridSettings', 'qgridOperations', '$templateCache'];
        return GridService;
    })();
    qgrid.GridService = GridService;
})(qgrid || (qgrid = {}));

angular.module('qgrid').service('qgridService', qgrid.GridService);
//# sourceMappingURL=qgrid.js.map

angular.module('qgrid').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/qgrid/qgrid-datetime-cell.html',
    "<div class=ngCellText ng-class=col.colIndex()><span ng-cell-text=\"\">{{row.getProperty(col.field) | date: col.colDef.qgridColumnSettings.cellFormatter.format}}</span></div>"
  );


  $templateCache.put('src/templates/qgrid/qgrid-searchtextbox-header-cell.html',
    "<div class=\"ngHeaderSortColumn {{col.headerClass}} qgrid-header-cell\" ng-style=\"{'cursor': col.cursor}\" ng-class=\"{ 'ngSorted': !noSortVisible }\"><div ng-click=col.sort($event) ng-class=\"'colt' + col.index\" class=ngHeaderText>{{col.displayName}}</div><form class=\"bs-example bs-example-form\" role=form><span style=\"display:inline-block; padding: 0px 5px 0px 5px; width: 100%\"><div class=input-group style=\"width: 100%\"><input type=text class=form-control placeholder={{col.displayName}} ng-enter=$parent.qgrid.qgridSettings.performSearch() ng-model=col.colDef.qgridColumnSettings.searchValue></div></span></form><div class=ngSortButtonDown ng-show=col.showSortButtonDown()></div><div class=ngSortButtonUp ng-show=col.showSortButtonUp()></div><div class=ngSortPriority>{{col.sortPriority}}</div><div ng-class=\"{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }\" ng-click=togglePin(col) ng-show=col.pinnable></div></div><div ng-show=col.resizable class=ngHeaderGrip ng-click=col.gripClick($event) ng-mousedown=col.gripOnMouseDown($event)></div>"
  );


  $templateCache.put('src/templates/qgrid/qgrid-typeahead-header-cell.html',
    "<div class=\"ngHeaderSortColumn {{col.headerClass}} typeahead\" ng-style=\"{'cursor': col.cursor}\" ng-class=\"{ 'ngSorted': !noSortVisible }\"><div ng-click=col.sort($event) ng-class=\"'colt' + col.index\" class=ngHeaderText>{{col.displayName}}</div><span style=\"display:inline-block; padding: 0 5px 0 5px; width: 100%\"><input type=text ng-model=col.colDef.qgridColumnSettings.searchValue placeholder={{col.displayName}} ng-dblclick=openTypeAhead() qgrid-typeahead=\"address for address in $parent.qgrid.qgridSettings.autoComplete(col.colDef) | filter:$viewValue\" qrid-typeahead-editable=true qgrid-typeahead-loading=loadingLocations class=form-control ng-enter=$parent.qgrid.qgridSettings.performSearch()></span><div class=ngSortButtonDown ng-show=col.showSortButtonDown()></div><div class=ngSortButtonUp ng-show=col.showSortButtonUp()></div><div class=ngSortPriority>{{col.sortPriority}}</div><div ng-class=\"{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }\" ng-click=togglePin(col) ng-show=col.pinnable></div></div><div ng-show=col.resizable class=ngHeaderGrip ng-click=col.gripClick($event) ng-mousedown=col.gripOnMouseDown($event)></div>"
  );


  $templateCache.put('src/templates/qgrid/qgrid.html',
    "<div ng-if=qgrid.qgridSettings.isLoaded class=qgrid ng-grid=qgrid></div>"
  );

}]);

angular.module('ngGrid').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/nggrid/qgrid-footer.html',
    "<div ng-show=showFooter class=qgrid-footer ng-style=footerStyle()><div class=row style=\"padding:0px 10px 0px 10px\"><div class=col-xs-3><span class=btn-group><button type=button class=\"btn btn-default btn-sm\" ng-click=$parent.$parent.qgrid.qgridSettings.resetGrid()><span class=\"fa fa-refresh\"></span></button> <button type=button class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=dropdown ng-if=$parent.$parent.qgrid.qgridSettings.enableFooterSettings><i class=\"fa fa-cogs\"></i> <span class=caret></span></button><ul class=dropdown-menu><li ng-if=\"$parent.$parent.qgrid.qgridSettings.enableAllExports || $parent.$parent.qgrid.qgridSettings.enableExcelExport\"><a href=# ng-click=\"$parent.$parent.qgrid.qgridSettings.exportGrid('Excel')\">Export to Excel</a></li><li ng-if=\"$parent.$parent.qgrid.qgridSettings.enableAllExports || $parent.$parent.qgrid.qgridSettings.enablePDFExport\"><a href=# ng-click=\"$parent.$parent.qgrid.qgridSettings.exportGrid('PDF')\">Export to PDF</a></li><li ng-if=\"$parent.$parent.qgrid.qgridSettings.enableAllExports || $parent.$parent.qgrid.qgridSettings.enableCSVExport\"><a href=# ng-click=\"$parent.$parent.qgrid.qgridSettings.exportGrid('CSV')\">Export to CSV</a></li><li ng-repeat=\"footerFunction in $parent.$parent.qgrid.qgridSettings.footerActions\"><a href=# ng-click=\"footerFunction.callback(footerFunction, $parent.$parent.qgrid)\">{{footerFunction.title}}</a></li></ul></span></div><div class=col-xs-6 style=text-align:center><div class=btn-group><button ng-click=pageToFirst() ng-disabled=cantPageBackward() type=button class=\"btn btn-default btn-sm\"><i class=\"fa fa-step-backward qgrid-pager-button\"></i></button> <button ng-click=pageBackward() ng-disabled=cantPageBackward() type=button class=\"btn btn-default btn-sm\" style=\"border-right:none !important\"><i class=\"fa fa-chevron-left qgrid-pager-button\"></i></button> <span class=qgrid-pager-input><input class=ngPagerCurrent min=1 max={{currentMaxPages}} type=number style=\"width:49px; height: 29.5px\" ng-model=pagingOptions.currentPage ng-disabled=$parent.$parent.qgrid.qgridSettings.isLoading></span> <button ng-click=pageForward() ng-disabled=cantPageForward() type=button class=\"btn btn-default btn-sm\" style=\"border-left:none !important\"><i class=\"fa fa-chevron-right qgrid-pager-button\"></i></button> <button ng-click=pageToLast() ng-disabled=cantPageToLast() type=button class=\"btn btn-default btn-sm\"><i class=\"fa fa-step-forward qgrid-pager-button\"></i></button> <button type=button class=\"btn btn-default btn-sm dropdown-toggle\" data-toggle=dropdown>{{pagingOptions.pageSize}} rows <span class=caret></span></button><ul class=\"dropdown-menu pull-right\"><li ng-repeat=\"size in pagingOptions.pageSizes\" ng-click=\"pagingOptions.pageSize = size;\"><a href=#>{{size}} rows</a></li></ul></div></div><div class=col-xs-3><div class=qgrid-pager-container><span><span class=ngFooterTotalItems ng-class=\"{'ngNoMultiSelect': !multiSelect}\"><span class=qgrid-label>{{maxRows()}} rows total</span> <span ng-show=\"filterText.length > 0\" class=ngLabel>({{i18n.ngShowingItemsLabel}} {{totalFilteredItemsLength()}})</span></span> <span class=ngFooterSelectedItems ng-show=multiSelect><span class=qgrid-label>{{i18n.ngSelectedItemsLabel}} {{selectedItems.length}}</span></span></span> <span tooltip-placement=right tooltip=\"I spin when the grid is loading!\"><i class=\"qgrid-spinner fa fa-cog\" ng-class=\"{'fa-spin' : $parent.$parent.qgrid.qgridSettings.isLoading}\"></i></span></div></div></div></div>"
  );


  $templateCache.put('src/templates/nggrid/qgrid-header-row-template.html',
    "<div ng-style=\"{ height: col.headerRowHeight }\" ng-repeat=\"col in renderedColumns\" ng-class=col.colIndex() class=ngHeaderCell><div ng-header-cell=\"\"></div></div>"
  );

}]);
