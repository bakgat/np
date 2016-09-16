(function() {
    'use strict';

    angular
        .module('triangular.directives')
        .directive('follow', follow);

    
    /* @ngInject */
    function follow() {
        var directive = {
            link: link,
            restrict: 'A'
        }
        return directive;
        ///////////////////

        function link($scope, $element, attrs) {
            $element.on('focus', function() {
                $element.parent()[0].scrollIntoView(false);
            });
        }
    }
})();
