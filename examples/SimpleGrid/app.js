angular.module('app', ['qgrid']);
angular.module('app').controller('SimpleGridCtrl', function ($scope, $http) {
    var gridModel = {
        sortInfo: {
            directions: ['asc'],
            fields: ['FirstName']
        },
        qgridSettings: {
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
                qgridColumnSettings: {
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
                qgridColumnSettings: {
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
                qgridColumnSettings: {
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
                qgridColumnSettings: {
                    searchOperation: 5 /* IsGreaterOrEqualTo */,
                    cellFormatter: new qgrid.DateTimeCellFormater('yyyy-MM-dd'),
                    qgridColumnHeaderStyle: 3 /* DatePickerTextBox */
                }
            }]
    };

    $scope.grid = gridModel;
    $scope.$watch('grid.qgridSettings.rows', function (rows) {
        if (rows) {
        }
    });
});
//# sourceMappingURL=app.js.map
