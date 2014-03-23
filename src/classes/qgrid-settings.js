angular.module('qgrid').factory('qqridDefaultQgridSettings', function () {
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
        enableFooterSettings: false,
        totalServerItems: 0,
        isLoading: false,
        loadGrid: function () {
        },
        exportGrid: function (type) {
        },
        resetGrid: function () {
        },
        autoComplete: function (column) {
        }
    };
});
//# sourceMappingURL=qgrid-settings.js.map
