angular.module('qgrid').factory('qgridDefaultQgridSettings', function () {
    return <qgrid.IDefaultModelGetter>{
        getNewDefault: function <T>() {
            return <qgrid.IQGridSettings<T>>{
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
            }
        }
    }
}); 