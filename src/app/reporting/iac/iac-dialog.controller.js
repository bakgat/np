(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('IacDialogController', IacDialogController);

    /* @ngInject */
    function IacDialogController($scope, $mdDialog, $mdEditDialog, iac) {

        var vm = this;
        vm.cancel = cancel;
        vm.iac = iac;
        vm.editComment = editComment;


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
            $mdDialog.hide(vm.iac);
        }

        function editComment($event, iacGoal) {
            $event.stopPropagation();

            var promise = $mdEditDialog.large({
                modelValue: iacGoal.comment,
                placeholder: 'Opmerking toevoegen',
                save: function(input) {
                    iacGoal.comment = input.$modelValue;
                },
                targetEvent: event,
                clickOutsideToClose: true
            });
        }
    }
})();
