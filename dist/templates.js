angular.module('qgrid').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/templates/qgrid/qgrid-datetime-cell.html',
    "<div class=ngCellText ng-class=col.colIndex()><span ng-cell-text=\"\">{{row.getProperty(col.field) | date: col.colDef.qgridColumnSettings.cellFormatter.format}}</span></div>"
  );


  $templateCache.put('src/templates/qgrid/qgrid-searchtextbox-header-cell.html',
    "<div class=\"ngHeaderSortColumn {{col.headerClass}} qgrid-header-cell\" ng-style=\"{'cursor': col.cursor}\" ng-class=\"{ 'ngSorted': !noSortVisible }\"><div ng-click=col.sort($event) ng-class=\"'colt' + col.index\" class=ngHeaderText>{{col.displayName}}</div><form class=\"bs-example bs-example-form\" role=form><span style=\"display:inline-block; padding: 0px 5px 0px 5px; width: 100%\"><div class=input-group style=\"width: 100%\"><input type=text class=form-control placeholder={{col.displayName}} ng-enter=$parent.qgrid.qgridSettings.performSearch() ng-model=col.colDef.qgridColumnSettings.searchValue></div></span></form><div class=ngSortButtonDown ng-show=col.showSortButtonDown()></div><div class=ngSortButtonUp ng-show=col.showSortButtonUp()></div><div class=ngSortPriority>{{col.sortPriority}}</div><div ng-class=\"{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }\" ng-click=togglePin(col) ng-show=col.pinnable></div></div><div ng-show=col.resizable class=ngHeaderGrip ng-click=col.gripClick($event) ng-mousedown=col.gripOnMouseDown($event)></div>"
  );


  $templateCache.put('src/templates/qgrid/qgrid-typeahead-header-cell.html',
    "<div class=\"ngHeaderSortColumn {{col.headerClass}} typeahead\" ng-style=\"{'cursor': col.cursor}\" ng-class=\"{ 'ngSorted': !noSortVisible }\"><div ng-click=col.sort($event) ng-class=\"'colt' + col.index\" class=ngHeaderText>{{col.displayName}}</div><span style=\"display:inline-block; padding: 0 5px 0 5px; width: 100%\"><input type=text ng-model=col.colDef.qgridColumnSettings.searchValue placeholder={{col.displayName}} ng-dblclick=openTypeAhead() qgrid-typeahead=\"address for address in $parent.qgrid.qgridSettings.autoComplete(col.colDef) | filter:$viewValue\" qrid-typeahead-editable=true qgrid-typeahead-loading=loadingLocations class=form-control ng-enter=$parent.qgrid.qgridSettings.performSearch()></span><div class=ngSortButtonDown ng-show=col.showSortButtonDown()></div><div class=ngSortButtonUp ng-show=col.showSortButtonUp()></div><div class=ngSortPriority>{{col.sortPriority}}</div><div ng-class=\"{ ngPinnedIcon: col.pinned, ngUnPinnedIcon: !col.pinned }\" ng-click=togglePin(col) ng-show=col.pinnable></div></div><div ng-show=col.resizable class=ngHeaderGrip ng-click=col.gripClick($event) ng-mousedown=col.gripOnMouseDown($event)></div>"
  );


  $templateCache.put('src/templates/qgrid/qgrid.html',
    "<div ng-if=qgrid.qgridSettings.isLoaded class=qgrid ng-grid=qgrid></div>"
  );

}]);
