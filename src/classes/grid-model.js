var qgrid;
(function (qgrid) {
    var GridModel = (function () {
        function GridModel(options) {
            this.headerRowHeight = 75;
            this.footerRowHeight = 48;
            this.headerRowTemplate = "src/templates/nggrid/qgrid-header-row-template.html";
            this.footerTemplate = "src/templates/nggrid/grid-footer.html";
            this.enablePaging = true;
            this.showFooter = true;
            this.enablePinning = false;
            this.multiSelect = false;
            this.useExternalSorting = true;
            this.i18n = "en";
            this.pagingOptions = {
                currentPage: 1,
                pageSize: 10,
                pageSizes: [10, 20, 50]
            };
            this.qgridSettings = new qgrid.QGridSettings();
            this.data = "qgrid.qgridSettings.rows";
            this.totalServerItems = "qgrid.qgridSettings.totalServerItems";
            services.qgridExtender.deepExtend(this, options);

            for (var index in this.columnDefs) {
                var col = this.columnDefs[index];
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
        }
        return GridModel;
    })();
    qgrid.GridModel = GridModel;
})(qgrid || (qgrid = {}));
//# sourceMappingURL=grid-model.js.map
