(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('IacListController', IacListController);

    /* @ngInject */
    function IacListController($state, iacs, $filter) {
        var vm = this;
        vm.baseState = 'triangular.reporting.iacs';
        vm.openIAC = openIAC;

        vm.iacs = iacs;


        init();
        ///////////////////////////////////

        function init() {
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
