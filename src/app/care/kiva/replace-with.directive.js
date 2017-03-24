(function() {
    'use strict';

    angular
        .module('app.care')
        .directive('replaceWith', replaceWith);

    /* @ngInject */
    function replaceWith() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$observe('replaceWith', function(value) {
                if (value) {
                    element.replaceWith(angular.isUndefined(value) ? '' : value);
                }
            });
        }
    }
})();