angular.module('qGrid').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/qgrid/qgrid.html',
    "<div ng-if=qGrid.qGridSettings.modelComplete class=qgrid ng-grid=qGrid></div>"
  );

}]);
