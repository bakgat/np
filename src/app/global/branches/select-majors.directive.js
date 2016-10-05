(function() {
    'use strict';

    angular
        .module('app.global')
        .directive('selectMajors', selectMajors);

    /* @ngInject */
    function selectMajors($timeout, $filter, BranchService) {
        // Usage:
        //
        // ```html
        // <select-majors ng-value="">
        // ```
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                'ngModel': '=',
                'required': '=?'
            },
            templateUrl: 'app/global/branches/select-majors.tmpl.html'
        };
        return directive;
        ////////////////////////

        function link($scope, $element, attrs) {

            $scope.majors = null;

            if (attrs.hasOwnProperty('multiple')) {
                $scope.multiple = true;
            } else {
                $scope.multiple = false;
            }
            if (attrs.hasOwnProperty('required')) {
                $scope.required = true;
            } else {
                $scope.required = false;
            }


            BranchService.one('majors').getList().then(function(majors) {
                $scope.majors = majors;
            });



        }
    }

})();
