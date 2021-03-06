﻿angular.module('qgrid').factory('qgridDefaultQgridModel', function () {
    return <qgrid.IDefaultModelGetter>{
        getNewDefault: function <T>() {
            return <qgrid.IQgridModel<T>>{
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
            }

        }
    }
}); 