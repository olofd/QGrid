angular.module('qgrid').factory('qgridExtender', function () {
    return {
        deepExtend: function (destination, source) {
            for (var property in source) {
                if (source[property] && source[property].constructor && source[property].constructor === Object) {
                    destination[property] = destination[property] || {};
                    arguments.callee(destination[property], source[property]);
                } else {
                    destination[property] = source[property];
                }
            }
            return destination;
        }
    };
});
//# sourceMappingURL=qgid-extender.js.map
