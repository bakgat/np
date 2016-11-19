(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('EditFeedbackDialogController', EditFeedbackDialogController);

    /* @ngInject */
    function EditFeedbackDialogController($scope, $timeout, $mdDialog, $filter, _, triSkins, result, focusOnOpen,
        ReportingService, StudentService, textAngularManager) {

        var vm = this;
        vm.cancel = cancel;
        vm.result = result;

        //actions
        vm.save = save;
        vm.close = close;

        vm.report = {};


        init();
        ///////////////

        function init() {
            ReportingService.one('student').one(result.student.id).get().then(function(response) {
                makeReport(response);
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $mdDialog.hide(vm.result);
        }

        function makeReport(data) {
            vm.report.start = data.start;
            vm.report.end = data.end;
            if (data.students.length > 0) {
                vm.report.majors = data.students[0].majors;
            }
            angular.forEach(vm.report.majors, function(major) {
                var permRaw = 0;
                var finalRaw = 0;
                var totalRaw = 0;
                var pMaxRaw = 0;
                var fMaxRaw = 0;
                var tMaxRaw = 0;
                angular.forEach(major.branches, function(branch) {
                    var cur = branch.history[0];
                    if(cur.permanent) {
                        permRaw += cur.permanent;
                        pMaxRaw += cur.max;
                    }
                    if(cur.final) {
                        finalRaw += cur.final; 
                        fMaxRaw += cur.max;
                    }
                    if(cur.total) {
                        totalRaw += cur.total;
                        tMaxRaw += cur.max;
                    }
                });
                major.permanent = (permRaw / pMaxRaw) * 100;
                major.final = (finalRaw / fMaxRaw) * 100;
                major.total = (totalRaw / tMaxRaw) * 100;
            });
        }

         ////////////////
        if(focusOnOpen) {
            $timeout(function() {
                // Retrieve the scope and trigger focus
                var editorScope = textAngularManager.retrieveEditor('feedbackSummary').scope;
                editorScope.displayElements.text.trigger('focus');
            }, 500);
        }
    }
})();