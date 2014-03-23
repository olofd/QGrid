var qgrid;
(function (qgrid) {
    var DateTimeCellFormater = (function () {
        function DateTimeCellFormater(format) {
            if (typeof format === "undefined") { format = 'yyyy-MM-dd HH:mm:ss'; }
            this.format = format;
        }
        Object.defineProperty(DateTimeCellFormater.prototype, "template", {
            get: function () {
                return "/src/templates/nggrid/datetime-cell.html";
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
        QGridHelper.getShortSearchOpertionForSearchOperationEnum = function (column) {
            if (column.qgridColumnSettings.searchOperation === 0 /* IsEqualTo */) {
                return "eq";
            }
            if (column.qgridColumnSettings.searchOperation === 1 /* IsNotEqualTo */) {
                return "ne";
            }
            if (column.qgridColumnSettings.searchOperation === 2 /* IsLessThan */) {
                return "lt";
            }
            if (column.qgridColumnSettings.searchOperation === 3 /* IsLessOrEqualTo */) {
                return "le";
            }
            if (column.qgridColumnSettings.searchOperation === 4 /* IsGreaterThan */) {
                return "gt";
            }
            if (column.qgridColumnSettings.searchOperation === 5 /* IsGreaterOrEqualTo */) {
                return "ge";
            }
            if (column.qgridColumnSettings.searchOperation === 6 /* IsIn */) {
                return "in";
            }
            if (column.qgridColumnSettings.searchOperation === 7 /* IsNotIn */) {
                return "ni";
            }
            if (column.qgridColumnSettings.searchOperation === 8 /* BeginsWith */) {
                return "bw";
            }
            if (column.qgridColumnSettings.searchOperation === 9 /* DoesNotBeginWith */) {
                return "bn";
            }
            if (column.qgridColumnSettings.searchOperation === 10 /* EndsWith */) {
                return "ew";
            }
            if (column.qgridColumnSettings.searchOperation === 11 /* DoesNotEndWith */) {
                return "en";
            }
            if (column.qgridColumnSettings.searchOperation === 12 /* Contains */) {
                return "cn";
            }
            if (column.qgridColumnSettings.searchOperation === 13 /* DoesNotContain */) {
                return "nc";
            }
            if (column.qgridColumnSettings.searchOperation === 14 /* ManualFilter */) {
                return "mf";
            }
            return "bw";
        };
        return QGridHelper;
    })();
    qgrid.QGridHelper = QGridHelper;
})(qgrid || (qgrid = {}));
//# sourceMappingURL=qgridModel.js.map
