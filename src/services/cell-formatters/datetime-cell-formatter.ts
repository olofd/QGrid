module qgrid {

    export class DateTimeCellFormatter implements IQgridCellFormatter {
        static $inject = ['$templateCache'];
        constructor(private $templateCache : ng.ITemplateCacheService) {
            //public format = 'yyyy-MM-dd HH:mm:ss'
        }

        get template() {
            return this.$templateCache.get('/src/templates/nggrid/qgrid-datetime-cell.html');
        }

    }


}

angular.module('qgrid').service('qgridDateTimeCellFormatter', qgrid.DateTimeCellFormatter);