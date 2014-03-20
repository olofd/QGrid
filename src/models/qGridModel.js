var qGrid;
(function (qGrid) {
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
    qGrid.DateTimeCellFormater = DateTimeCellFormater;
    var QGridHelper = (function () {
        function QGridHelper(gridModel, $http) {
            this.gridModel = gridModel;
        }
        QGridHelper.getShortSearchOpertionForSearchOperationEnum = function (column) {
            if (column.qGridColumnSettings.searchOperation === 0 /* IsEqualTo */) {
                return "eq";
            }
            if (column.qGridColumnSettings.searchOperation === 1 /* IsNotEqualTo */) {
                return "ne";
            }
            if (column.qGridColumnSettings.searchOperation === 2 /* IsLessThan */) {
                return "lt";
            }
            if (column.qGridColumnSettings.searchOperation === 3 /* IsLessOrEqualTo */) {
                return "le";
            }
            if (column.qGridColumnSettings.searchOperation === 4 /* IsGreaterThan */) {
                return "gt";
            }
            if (column.qGridColumnSettings.searchOperation === 5 /* IsGreaterOrEqualTo */) {
                return "ge";
            }
            if (column.qGridColumnSettings.searchOperation === 6 /* IsIn */) {
                return "in";
            }
            if (column.qGridColumnSettings.searchOperation === 7 /* IsNotIn */) {
                return "ni";
            }
            if (column.qGridColumnSettings.searchOperation === 8 /* BeginsWith */) {
                return "bw";
            }
            if (column.qGridColumnSettings.searchOperation === 9 /* DoesNotBeginWith */) {
                return "bn";
            }
            if (column.qGridColumnSettings.searchOperation === 10 /* EndsWith */) {
                return "ew";
            }
            if (column.qGridColumnSettings.searchOperation === 11 /* DoesNotEndWith */) {
                return "en";
            }
            if (column.qGridColumnSettings.searchOperation === 12 /* Contains */) {
                return "cn";
            }
            if (column.qGridColumnSettings.searchOperation === 13 /* DoesNotContain */) {
                return "nc";
            }
            if (column.qGridColumnSettings.searchOperation === 14 /* ManualFilter */) {
                return "mf";
            }
            return "bw";
        };
        return QGridHelper;
    })();
    qGrid.QGridHelper = QGridHelper;
})(qGrid || (qGrid = {}));
//# sourceMappingURL=qGridModel.js.map
