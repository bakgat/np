(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('IacListController', IacListController);

    /* @ngInject */
    function IacListController(BaseStateService, $state, iacs, $filter) {
        var vm = this;
        vm.openIAC = openIAC;

        vm.iacs = iacs;


        init();
        ///////////////////////////////////

        function init() {
            
            BaseStateService.setBaseState('triangular.reporting.iacs');
            createGroups();
        }

        function openIAC(iac) {
            $state.go(vm.baseState + '.iac', {
                iacId: iac.id
            });
            vm.selectedIac = iac.id;
        }


        function createGroups() {
            var students = [];

            angular.forEach(iacs, function(iac) {
                if (_.filter(students, { displayName: iac.student.displayName }).length == 0) {
                    students.push({ displayName: iac.student.displayName, iacs: [] });
                }
            });
            angular.forEach(students, function(group) {
                group.iacs = $filter('studentGroup')(iacs, group);
            });

            vm.students = students;
        }
    }
})();
