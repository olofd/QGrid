var qgrid;
(function (qgrid) {
    var GridService = (function () {
        function GridService(qgridExtender, qgridDefaultQgridModel, qgridDefaultQgridSettings, qgridOperations) {
            this.qgridExtender = qgridExtender;
            this.qgridDefaultQgridModel = qgridDefaultQgridModel;
            this.qgridDefaultQgridSettings = qgridDefaultQgridSettings;
            this.qgridOperations = qgridOperations;
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
                    col.headerCellTemplate = 'src/templates/nggrid/qgrid-typeahead-header-cell.html';
                }
                if (col.qgridColumnSettings.qgridColumnHeaderStyle === 1 /* SearchTextBox */) {
                    col.headerCellTemplate = 'src/templates/nggrid/qgrid-searchtextbox-header-cell.html';
                }
            }
            console.log(newModel);
            return newModel;
        };
        GridService.$inject = ['qgridExtender', 'qgridDefaultQgridModel', 'qgridDefaultQgridSettings', 'qgridOperations'];
        return GridService;
    })();
    qgrid.GridService = GridService;
})(qgrid || (qgrid = {}));

angular.module('qgrid').service('qgridService', qgrid.GridService);
//# sourceMappingURL=qgrid-service.js.map
