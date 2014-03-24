var qgrid;
(function (qgrid) {
    var DateTimeCellFormatter = (function () {
        function DateTimeCellFormatter($templateCache) {
            this.$templateCache = $templateCache;
            //public format = 'yyyy-MM-dd HH:mm:ss'
        }
        Object.defineProperty(DateTimeCellFormatter.prototype, "template", {
            get: function () {
                return this.$templateCache.get('/src/templates/nggrid/qgrid-datetime-cell.html');
            },
            enumerable: true,
            configurable: true
        });
        DateTimeCellFormatter.$inject = ['$templateCache'];
        return DateTimeCellFormatter;
    })();
    qgrid.DateTimeCellFormatter = DateTimeCellFormatter;
})(qgrid || (qgrid = {}));

angular.module('qgrid').service('qgridDateTimeCellFormatter', qgrid.DateTimeCellFormatter);
//# sourceMappingURL=datetime-cell-formatter.js.map
