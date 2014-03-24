module qgrid {
    export class GridService implements IQgridService {
        static $inject = ['qgridExtender', 'qgridDefaultQgridModel', 'qgridDefaultQgridSettings', 'qgridOperations', '$templateCache']
        constructor(
            private qgridExtender: IQgridExtender,
            private qgridDefaultQgridModel: qgrid.IDefaultModelGetter,
            private qgridDefaultQgridSettings: qgrid.IDefaultModelGetter,
            public qgridOperations: qgrid.IQgridOperations,
            private $templateCache : ng.ITemplateCacheService) {

        }

        createGrid<T>($scope: IQgridScope<T>) {
            $scope.qgrid = this.setupGrid($scope.qgrid);
            $scope.$watch('qgrid.qgridSettings.isLoaded', (newVal: boolean, oldVal: boolean) => {
                if (newVal) {
                    this.qgridOperations.loadGrid($scope.qgrid);
                }
            }, true);

            $scope.$watch('qgrid.sortInfo', (newVal: qgrid.ISortInfo, oldVal: qgrid.ISortInfo) => {
                if (newVal.directions[0] !== oldVal.directions[0] || newVal.fields[0] !== oldVal.fields[0]) {
                    this.qgridOperations.onSort(newVal, oldVal, $scope.qgrid);
                }
            }, true);

            $scope.$watch('qgrid.pagingOptions', (newVal: qgrid.IPagingOptions, oldVal: qgrid.IPagingOptions) => {
                if (newVal !== oldVal) {
                    this.qgridOperations.onPaging(newVal, oldVal, $scope.qgrid);
                }
            }, true);


            //Flipping the switch =>
            $scope.qgrid.qgridSettings.isLoaded = true;
        }
        private setupGrid<T>(userGridModel: qgrid.IQgridModel<T>) {
            var that = this;
            //Get new default models
            var newModel = this.qgridDefaultQgridModel.getNewDefault<IQgridModel<T>>();
            var newSettingsObject = this.qgridDefaultQgridSettings.getNewDefault<IQGridSettings<T>>();
            newModel.qgridSettings = newSettingsObject;
            this.qgridExtender.deepExtend(newModel, userGridModel);

            //Setup pointers to dataoperation methods:
            newModel.qgridSettings.loadGrid = (function (gridModel: IQgridModel<T>, iqgridOperations: IQgridOperations) {
                return () => {return iqgridOperations.loadGrid(gridModel) };
            } (newModel, this.qgridOperations));

            newModel.qgridSettings.exportGrid = (function (gridModel: IQgridModel<T>, iqgridOperations: IQgridOperations) {
                return (type) => {return iqgridOperations.exportGrid(type, gridModel) };
            } (newModel, this.qgridOperations));

            newModel.qgridSettings.resetGrid = (function (gridModel: IQgridModel<T>, iqgridOperations: IQgridOperations) {
                return () => {return iqgridOperations.resetGrid(gridModel) };
            } (newModel, this.qgridOperations));

            newModel.qgridSettings.autoComplete = (function (gridModel: IQgridModel<T>, iqgridOperations: IQgridOperations) {
                return (column: IColumn) => { return iqgridOperations.autoComplete(column, gridModel) };
            } (newModel, this.qgridOperations));

            newModel.qgridSettings.performSearch = (function (gridModel: IQgridModel<T>, iqgridOperations: IQgridOperations) {
                return () => { return iqgridOperations.performSearch(gridModel) };
            } (newModel, this.qgridOperations));

            for (var index in newModel.columnDefs) {
                var col = newModel.columnDefs[index];
                if (!col.headerClass) {
                    col.headerClass = 'qgrid-cell-header';
                }
                if (col.qgridColumnSettings && col.qgridColumnSettings.cellFormatter) {
                    col.cellTemplate = col.qgridColumnSettings.cellFormatter.template;
                }
                if (col.qgridColumnSettings.qgridColumnHeaderStyle === qgrid.IQGridColumnHeaderStyle.TypeaheadTexBox) {
                    col.headerCellTemplate = this.$templateCache.get('src/templates/qgrid/qgrid-typeahead-header-cell.html');
                    console.log(col.headerCellTemplate);
                }
                if (col.qgridColumnSettings.qgridColumnHeaderStyle === qgrid.IQGridColumnHeaderStyle.SearchTextBox) {
                    col.headerCellTemplate = this.$templateCache.get('src/templates/qgrid/qgrid-searchtextbox-header-cell.html');
                    console.log(col.headerCellTemplate);
                }
            }
            console.log(newModel);
            return newModel;
        }



    }

}

angular.module('qgrid').service('qgridService', qgrid.GridService); 