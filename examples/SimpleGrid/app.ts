﻿interface Service {
    Id: number;
    Name: string;
    Created: string;
}
angular.module('app', ['qgrid']);
angular.module('app').controller('SimpleGridCtrl', ['$scope', '$http', 'qgridDateTimeCellFormatter', function ($scope, $http, qgridDateTimeCellFormatter : qgrid.DateTimeCellFormatter) {

    var gridModel = <qgrid.IQgridModel<Service>>{
        sortInfo: {
            directions: ['asc'],
            fields: ['FirstName']
        },
        qgridSettings: {
            gridId : "TestGrid",
            domain: "http://localhost:24001/",
            urlDataRequest: "api/UserGrid/DataRequest",
            urlAutoComplete: "api/UserGrid/AutoComplete",
            urlExport: "api/UserGrid/Export",
            enableAllExports: true,
            footerActions: [{
                title: "TestAction",
                 callback: function (footerAction, grid) {
                    console.log(footerAction, grid);
                }

            }]
        },
        columnDefs: [
            {
                field: "Id",
                displayName: "Id",
                resizable: false,
                width: 60,
                qgridColumnSettings: {
                    searchOperation: qgrid.SearchOp.BeginsWith,
                    qgridColumnHeaderStyle: qgrid.IQGridColumnHeaderStyle.SearchTextBox
                }
            },
            {
                field: "FirstName",
                displayName: "First Name",
                resizable: false,
                width: '*',
                searchOperation: qgrid.SearchOp.BeginsWith,
                qgridColumnSettings: {
                    searchOperation: qgrid.SearchOp.BeginsWith,
                    qgridColumnHeaderStyle: qgrid.IQGridColumnHeaderStyle.TypeaheadTexBox
                }

            },
            {
                field: "LastName",
                displayName: "Last Name",
                resizable: false,
                width: '*',
                searchOperation: qgrid.SearchOp.BeginsWith,
                qgridColumnSettings: {
                    searchOperation: qgrid.SearchOp.BeginsWith,
                    qgridColumnHeaderStyle: qgrid.IQGridColumnHeaderStyle.TypeaheadTexBox
                }

            },
            {
                field: "Created",
                displayName: "Created",
                resizable: false,
                width: '*',
                searchOperation: qgrid.SearchOp.IsGreaterOrEqualTo,
                cellFilter: 'date',
                qgridColumnSettings: {
                    searchOperation: qgrid.SearchOp.IsGreaterOrEqualTo,
                    cellFormatter: qgridDateTimeCellFormatter,
                    qgridColumnHeaderStyle: qgrid.IQGridColumnHeaderStyle.DatePickerTextBox

                }
            }]
    };


    $scope.grid = gridModel;
    $scope.$watch('grid.qgridSettings.rows', function (rows: Service[]) {
        if (rows) {

        }
    });
}]);
