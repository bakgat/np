(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('EditFeedbackDialogController', EditFeedbackDialogController);

    /* @ngInject */
    function EditFeedbackDialogController($scope, $timeout, $mdDialog, $filter, _, triSkins, result, focusOnOpen,
        ReportingService, StudentService, textAngularManager, $sanitize) {

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
            ReportingService.one('student', result.student.id).get().then(function(response) {
                makeReport(response);
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            // use precompiled regexp for speed
            var rsb1 = new RegExp(/<span id="selectionBoundary_\d+_\d+" class="rangySelectionBoundary">[^<>]+?<\/span>/ig);
            var rsb2 = new RegExp(/<span class="rangySelectionBoundary" id="selectionBoundary_\d+_\d+">[^<>]+?<\/span>/ig);
            var rsb3 = new RegExp(/<span id="selectionBoundary_\d+_\d+" class="rangySelectionBoundary">[^<>]+?<\/span>/ig);
            var unsafe = vm.result.summary;
            unsafe = unsafe.replace(rsb1, '');
            unsafe = unsafe.replace(rsb2, '');
            unsafe = unsafe.replace(rsb1, '');
            unsafe = unsafe.replace(rsb3, '');
            vm.result.summary = $sanitize(unsafe);

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
                    if (cur.permanent) {
                        permRaw += cur.permanent;
                        pMaxRaw += cur.max;
                    }
                    if (cur.final) {
                        finalRaw += cur.final;
                        fMaxRaw += cur.max;
                    }
                    if (cur.total) {
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
        if (focusOnOpen) {
            $timeout(function() {
                // Retrieve the scope and trigger focus
                var editorScope = textAngularManager.retrieveEditor('feedbackSummary').scope;
                editorScope.displayElements.text.trigger('focus');
            }, 500);
        }
    }
})();
