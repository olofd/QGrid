angular.module('app', ['qGrid']);
angular.module('app').controller('SimpleGridCtrl', function ($scope, $http) {
    var gridModel2 = {
        columnDefs: [{}]
    };
    var gridModel = {
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
                    searchOperation: 8 /* BeginsWith */,
                    qgridColumnHeaderStyle: 1 /* SearchTextBox */
                }
            },
            {
                field: "FirstName",
                displayName: "First Name",
                resizable: false,
                width: '*',
                searchOperation: 8 /* BeginsWith */,
                qGridColumnSettings: {
                    searchOperation: 8 /* BeginsWith */,
                    qgridColumnHeaderStyle: 2 /* TypeaheadTexBox */
                }
            },
            {
                field: "LastName",
                displayName: "Last Name",
                resizable: false,
                width: '*',
                searchOperation: 8 /* BeginsWith */,
                qGridColumnSettings: {
                    searchOperation: 8 /* BeginsWith */,
                    qgridColumnHeaderStyle: 2 /* TypeaheadTexBox */
                }
            },
            {
                field: "Created",
                displayName: "Created",
                resizable: false,
                width: '*',
                searchOperation: 5 /* IsGreaterOrEqualTo */,
                cellFilter: 'date',
                qGridColumnSettings: {
                    searchOperation: 5 /* IsGreaterOrEqualTo */,
                    cellFormatter: new qGrid.DateTimeCellFormater('yyyy-MM-dd'),
                    qgridColumnHeaderStyle: 3 /* DatePickerTextBox */
                }
            }]
    };

    $scope.grid = gridModel;
    $scope.$watch('grid.qGridSettings.rows', function (rows) {
        if (rows) {
        }
    });
});
//# sourceMappingURL=app.js.map
