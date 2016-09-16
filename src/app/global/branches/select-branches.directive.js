(function() {
    'use strict';

    angular
        .module('app.global')
        .directive('selectBranches', selectBranches);

    /* @ngInject */
    function selectBranches($timeout, $filter, BranchService, ProfileService) {
        // Usage:
        //
        // ```html
        // <select-courses ng-value="">
        // ```
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                'ngModel': '='
            },
            templateUrl: 'app/global/branches/select-branches.tmpl.html'
        };
        return directive;
        ////////////////////////

        function link($scope, $element, attrs) {
            $scope.majors = null;
            $scope.branchGroups = null;
            
            if (attrs.hasOwnProperty('multiple')) {
                $scope.multiple = true;
            } else {
                $scope.multiple = false;
            }


            if (attrs.hasOwnProperty('byGroups')) {
                ProfileService.activeGroup().then(function(group) {
                    var result = [];
                    group.getList('branches').then(function(branchGroups) {
                        BranchService.getList({ 'group': group.id }).then(function(majors) {
                            angular.forEach(majors, function(major) {
                                result.push({
                                    major: {
                                        id: major.id,
                                        name: major.name
                                    },
                                    branchForGroup: []
                                });
                            });
                            angular.forEach(result, function(r) {
                                r.branchForGroup = $filter('majorGroup')(branchGroups, r);
                            });
                            $scope.branchGroups = result;
                        });
                    });
                });
            } else {
                ProfileService.activeGroup().then(function(group) {
                    BranchService.getList({ 'group': group.id }).then(function(majors) {
                        $scope.majors = majors;
                    });
                });
            }


        }
    }

})();
