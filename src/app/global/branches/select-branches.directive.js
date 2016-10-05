(function() {
    'use strict';

    angular
        .module('app.global')
        .directive('selectBranches', selectBranches);

    /* @ngInject */
    function selectBranches($timeout, $filter, BranchService, UserService, GroupService) {
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
                'ngModel': '=',
                'required': '=?'
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
            if (attrs.hasOwnProperty('required')) {
                $scope.required = true;
            } else {
                $scope.required = false;
            }


            if (attrs.hasOwnProperty('byGroups')) {
                var type = attrs.hasOwnProperty('byType') ? { evaluationtype: attrs.byType } : {}; 
                UserService.getActiveGroup().then(function(group) {
                    var result = [];
                    //i.e. /groups/{id}/branches?evaluationtype=C
                    GroupService.one(group.id).getList('branches', type).then(function(branchGroups) {
                        // /branches?group={id}
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
                UserService.getActiveGroup().then(function(group) {
                    BranchService.getList({ 'group': group.id }).then(function(majors) {
                        $scope.majors = majors;
                    });
                });
            }


        }
    }

})();
