(function() {
    'use strict';

    angular
        .module('app.reporting')
        .directive('max', max);

    /* @ngInject */
    function max($q) {
        var directive = {
            link: link,
            require: 'ngModel',
            restrict: 'A',
            scope: {
                max: '='
            }
        }

        return directive;



        ///////////////////////

        function link(scope, elem, attrs, ctrl) {
            ctrl.$asyncValidators.max = validator;

            function validator(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return $q.when();
                }

                var def = $q.defer();

                var max = scope.max;
                if (modelValue <= max) {
                    def.resolve();
                } else {
                    def.reject();
                }

                return def.promise;
            }


        }
    }
})();
