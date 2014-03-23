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
//# sourceMappingURL=qgrid-default-qgrid-settings.js.map
