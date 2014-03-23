var qgrid;
(function (qgrid) {
    var DateTimeCellFormater = (function () {
        function DateTimeCellFormater(format) {
            if (typeof format === "undefined") { format = 'yyyy-MM-dd HH:mm:ss'; }
            this.format = format;
        }
        Object.defineProperty(DateTimeCellFormater.prototype, "template", {
            get: function () {
                return "/src/templates/nggrid/qgrid-datetime-cell.html";
            },
            enumerable: true,
            configurable: true
        });
        return DateTimeCellFormater;
    })();
    qgrid.DateTimeCellFormater = DateTimeCellFormater;
    var QGridHelper = (function () {
        function QGridHelper(gridModel, $http) {
            this.gridModel = gridModel;
        }
        return QGridHelper;
    })();
    qgrid.QGridHelper = QGridHelper;
})(qgrid || (qgrid = {}));
//# sourceMappingURL=qgrid-model.js.map
