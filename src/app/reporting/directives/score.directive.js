(function() {
    'use strict';

    angular
        .module('app.reporting')
        .directive('score', score);

    /* @ngInject */
    function score($filter) {

        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };
        return directive;
        ////////////////////////
        function link($scope, $element, attrs, ngModelController) {
            $element.on('focus', function() {
                $element.parent()[0].scrollIntoView(false);
            });
        }
    }
})();
