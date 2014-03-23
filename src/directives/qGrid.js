angular.module('qgrid').directive('qgrid', [
    'qgridService', function (qgridService) {
        return {
            scope: {
                qgrid: "="
            },
            templateUrl: 'src/templates/qgrid/qgrid.html',
            controller: [
                '$scope', function ($scope) {
                    qgridService.createGrid($scope);
                }]
        };
    }]);
//# sourceMappingURL=qgrid.js.map
