angular.module('app', ['qgrid']);
angular.module('app').controller('SimpleGridCtrl', [
    '$scope', '$http', 'qgridDateTimeCellFormatter', function ($scope, $http, qgridDateTimeCellFormatter) {
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
                        cellFormatter: qgridDateTimeCellFormatter,
                        qgridColumnHeaderStyle: 3 /* DatePickerTextBox */
                    }
                }]
        };

        $scope.grid = gridModel;
        $scope.$watch('grid.qgridSettings.rows', function (rows) {
            if (rows) {
            }
        });
    }]);
//# sourceMappingURL=app.js.map
