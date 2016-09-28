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
            // ngModelController.$parsers.push(function(data) {
            //     //convert data from view format to model format

            //     data = $filter('comma2decimal')(data);

            //     return data;
            // });

            // ngModelController.$formatters.push(function(data) {
            //     //convert data from model format to view format

            //     data = $filter('decimal2comma')(data, 1);

            //     return data;
            // });

            $element.on('focus', function() {
                $element.parent()[0].scrollIntoView(false);
            });
        }
    }
})();
