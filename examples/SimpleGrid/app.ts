interface Service {
    Id: number;
    Name: string;
    Created: string;
}
angular.module('app', ['qGrid']);
angular.module('app').controller('SimpleGridCtrl', function ($scope, $http) {

    var gridModel2 = <qGrid.IGridModel<Service>>{
        columnDefs: [{

        }]
    }
    var gridModel = <qGrid.IGridModel<Service>>{
        sortInfo: {
            directions: ['asc'],
            fields: ['FirstName']
        },
        qGridSettings: {
            gridId: "TestGrid",
            domain: "http://localhost:24001/",
            urlDataRequest: "api/UserGrid/DataRequest",
            urlAutoComplete: "api/UserGrid/AutoComplete",
            urlExport: "api/UserGrid/Export",
            enableAllExports: true,
            enableFooterSettings: true,
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
                qGridColumnSettings: {
                    searchOperation: qGrid.SearchOp.BeginsWith,
                    qgridColumnHeaderStyle: qGrid.IQGridColumnHeaderStyle.SearchTextBox
                }
            },
            {
                field: "FirstName",
                displayName: "First Name",
                resizable: false,
                width: '*',
                searchOperation: qGrid.SearchOp.BeginsWith,
                qGridColumnSettings: {
                    searchOperation: qGrid.SearchOp.BeginsWith,
                    qgridColumnHeaderStyle: qGrid.IQGridColumnHeaderStyle.TypeaheadTexBox
                }

            },
            {
                field: "LastName",
                displayName: "Last Name",
                resizable: false,
                width: '*',
                searchOperation: qGrid.SearchOp.BeginsWith,
                qGridColumnSettings: {
                    searchOperation: qGrid.SearchOp.BeginsWith,
                    qgridColumnHeaderStyle: qGrid.IQGridColumnHeaderStyle.TypeaheadTexBox
                }

            },
            {
                field: "Created",
                displayName: "Created",
                resizable: false,
                width: '*',
                searchOperation: qGrid.SearchOp.IsGreaterOrEqualTo,
                cellFilter: 'date',
                qGridColumnSettings: {
                    searchOperation: qGrid.SearchOp.IsGreaterOrEqualTo,
                    cellFormatter: new qGrid.DateTimeCellFormater('yyyy-MM-dd'),
                    qgridColumnHeaderStyle: qGrid.IQGridColumnHeaderStyle.DatePickerTextBox

                }
            }]
    };


    $scope.grid = gridModel;
    $scope.$watch('grid.qGridSettings.rows', function (rows: Service[]) {
        if (rows) {

        }
    });
});
