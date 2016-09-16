(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('StudentIACController', StudentIACController);

    /* @ngInject */
    function StudentIACController($state, iac) {
        var vm = this;

        vm.isAchieved = isAchieved;
        vm.isPractice = isPractice;
        
        vm.iac = {
          goals: iac
        }
        

        function init() {

        }

        function isAchieved(goal) {
            if(goal.isAchieved == null) {
                return '';
            }
            return goal.isAchieved ? 'zmdi zmdi-check-square' : '';
        }

        function isPractice(goal) {
            if(goal.isPractice == null) {
                return '';
            }
            return goal.isPractice ? 'zmdi zmdi-block' : '';
        }
    }
})();