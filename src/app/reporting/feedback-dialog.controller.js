(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('FeedbackDialogController', FeedbackDialogController);

    /* @ngInject */
    function FeedbackDialogController($scope, $timeout, $mdDialog, $filter, _, triSkins, evaluation,
        EvaluationService, StudentService) {

        var vm = this;
        vm.cancel = cancel;
        vm.evaluation  = evaluation;

        //actions
        vm.save = save;
        vm.close = close;


        init();
        ///////////////

        function init() {

        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $mdDialog.hide(vm.evaluation);
        }

    }
})();
