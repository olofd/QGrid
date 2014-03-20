angular.module('qGrid').directive('qGrid', function ($parse) {
    return {
        scope: {
            qGrid: "="
        },
        link: function ($scope, element, attrs) {
        },
        templateUrl: 'src/templates/qgrid/qgrid.html',
        controller: 'qGridController'
    };
});
//$scope.setPagingData = function (data, page, pageSize) {
//    var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
//    $scope.myData = pagedData;
//    $scope.totalServerItems = 10000;
//    if (!$scope.$$phase) {
//        $scope.$apply();
//    }
//};
//$scope.getPagedDataAsync = function (params) {
//    $http.post('api/grid/datarequest', params).success(function (largeLoad) {
//        console.log(largeLoad);
//        console.log(largeLoad.rows, params.requestObject.page, params.requestObject.pageSize);
//        $scope.setPagingData(largeLoad.rows, params.requestObject.page, params.requestObject.rows);
//    });
//};
//$scope.getPagedDataAsync({ requestObject: { rows: $scope.pagingOptions.pageSize, page: $scope.pagingOptions.currentPage, } });
//$scope.$watch('pagingOptions', function (newVal, oldVal) {
//    if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
//        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
//    }
//}, true);
//$scope.$watch('filterOptions', function (newVal, oldVal) {
//    if (newVal !== oldVal) {
//        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
//    }
//}, true);
//$scope.gridOptions = {
//    sortInfo: { fields: ['Id'], directions: ['desc'] },
//    columnDefs: [
//        {
//            field: 'Id',
//            displayName: 'Id',
//            resizable: true,
//            width: 70
//        },
//        {
//            field: 'Name',
//            displayName: 'Name',
//            resizable: true
//        },
//        {
//            field: 'Created',
//            displayName: 'Created',
//            resizable: true
//        },
//    ],
//    data: 'myData',
//    enablePaging: true,
//    showFooter: true,
//    multiSelect: false,
//    useExternalSorting: true,
//    totalServerItems: 'totalServerItems',
//    pagingOptions: $scope.pagingOptions,
//    filterOptions: $scope.filterOptions,
//    colSearchModel: [
//        {
//            name: 'Id',
//            dataType: 'int',
//            searchOperation: 'eq',
//        },
//        {
//            name: 'Name',
//            dataType: 'string',
//            searchOperation: 'bw',
//        },
//        {
//            name: 'Created',
//            dataType: 'DateTime',
//            searchOperation: 'lt',
//        }
//    ],
//    buildSearchString: function () {
//        //  qgridID=GridCase&PS=10&CP=1&_search=true&nd=1394896972476&rows=10&page=1&sidx=Id&sord=desc&filters=&Year=14
//        var searchObject = {
//            requestObject: {
//                id: 'GridTest',
//                rows: $scope.pagingOptions.pageSize,
//                page: 1,
//                rguid: 1394896972476,
//                search: true,
//                pk: "Id",
//                sord: (function () {
//                    if ($scope.gridOptions.sortInfo.columns && $scope.gridOptions.sortInfo.columns.length > 0) {
//                        return $scope.gridOptions.sortInfo.columns[0].sortDirection;
//                    }
//                } ())
//            },
//            requestSearchObjects: (function () {
//                var soObject = [];
//                for (var i = 0; i < $scope.gridOptions.colSearchModel.length; i++) {
//                    var obj = $scope.gridOptions.colSearchModel[i];
//                    soObject.push({
//                        n: obj.name,
//                        so: obj.searchOperation,
//                        v: obj.searchText
//                    });
//                }
//                return soObject;
//            } ())
//        };
//        console.log(searchObject);
//        $scope.getPagedDataAsync(searchObject);
//    },
//    search: function () {
//        console.log($scope.gridOptions.sortInfo.columns[0]);
//        console.log($scope.gridOptions.colSearchModel);
//        $scope.gridOptions.buildSearchString();
//    }
//};
//# sourceMappingURL=qGrid.js.map
