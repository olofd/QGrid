//module qgrid {
//    export class DefaultGridModel<T> implements IGridModel<T>{
//        constructor() {
//            this.qgridSettings = new QGridSettings();
//            services.qgridExtender.deepExtend(this, options);
//            for (var index in this.columnDefs) {
//                var col = this.columnDefs[index];
//                if (!col.headerClass) {
//                    col.headerClass = 'qgrid-cell-header';
//                }
//                if (col.qgridColumnSettings && col.qgridColumnSettings.cellFormatter) {
//                    col.cellTemplate = col.qgridColumnSettings.cellFormatter.template;
//                }
//                if (col.qgridColumnSettings.qgridColumnHeaderStyle === qgrid.IQGridColumnHeaderStyle.TypeaheadTexBox) {
//                    col.headerCellTemplate = '/src/templates/nggrid/qgrid-typeahead-header-cell.html';
//                }
//                if (col.qgridColumnSettings.qgridColumnHeaderStyle === qgrid.IQGridColumnHeaderStyle.SearchTextBox) {
//                    col.headerCellTemplate = '/src/templates/nggrid/qgrid-searchtextbox-header-cell.html';
//                }
//            }
//        }
//    }
//}
angular.module('qgrid').factory('qgridDefaultGridModel', function () {
    return {
        data: "qgrid.qgridSettings.rows",
        totalServerItems: "qgrid.qgridSettings.totalServerItems",
        headerRowHeight: 75,
        footerRowHeight: 48,
        headerRowTemplate: "src/templates/nggrid/qgrid-header-row-template.html",
        footerTemplate: "src/templates/nggrid/grid-footer.html",
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
});
//# sourceMappingURL=qgrid-default-grid-model.js.map
