(function() {
    'use strict';

    angular
        .module('app.care')
        .controller('CareIacDialogController', CareIacDialogController);

    /* @ngInject */
    function CareIacDialogController($scope, $timeout, $mdDialog, $filter, _, CourseService, IacService) {

        var vm = this;

        vm.iac = {
            course: null,
            start: new Date(),
            end: null,
            objectives: []
        }
        
        vm.courses = [];
        vm.objectives = [];

        //actions

        vm.cancel = cancel;
        vm.save = save;



        init();
        ///////////////

        function init() { 
            CourseService.getCourses().then(coursesLoaded);
            IacService.getObjectives().then(objectivesLoaded);

            function coursesLoaded(courses) {
                vm.courses = courses.data;
            }
            function objectivesLoaded(objectives) {
                vm.objectives = objectives.data;
            }
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $mdDialog.hide(vm.diffmodule);
        }

    }
})();
