angular.module('qgrid').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/qgrid/qgrid.html',
    "<div ng-if=qgrid.qgridSettings.isLoaded class=qgrid ng-grid=qgrid></div>"
  );

}]);
