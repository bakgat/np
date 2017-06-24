(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('EditFeedbackDialogController', EditFeedbackDialogController);

    /* @ngInject */
    function EditFeedbackDialogController($scope, $timeout, $mdDialog, $filter, _, triSkins, result, focusOnOpen,
        ReportingService, StudentService, textAngularManager, $sanitize, _env, DateRangeService, UserService, $http) {

        var vm = this;
        vm.cancel = cancel;
        vm.result = result;

        //actions
        vm.save = save;
        vm.close = close;

        vm.report = {};

        vm.fbMceOptions = {
            menubar: false,
            toolbar: 'undo redo | bold italic | code',
            valid_elements: 'div,p,b,strong,em,i',
            invalid_elements: 'span',
            valid_classes: '',
            elementpath: false
        };


        init();
        ///////////////


        function init() {
            console.log('init');
            var range = DateRangeService.range();
            var rangeQuery = '&qstart=' + moment(range.start).format('YYYY-MM-DD') + '&qend=' + moment(range.end).format('YYYY-MM-DD');
            var tokenQuery = '&token=' + UserService.getCurrentUser().auth_token;
            $http.get(_env.api + '/report/student?id=' + result.student.id + rangeQuery + tokenQuery)
                .then(function(response) {
                    console.log(response.data);
                    makeReport(response.data);
                });
            /*ReportingService.one('student').get({id: result.student.id}).get().then(function(response) {
                console.log(response);
                makeReport(response);
            });*/
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            
            //vm.result.summary = $sanitize(unsafe);

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
                    var cur = branch.current;
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

                    /*
                     * CHARTS
                     */
                     var markers = [];
                        angular.forEach(branch.history, function(item) {
                            var marker = (item.total / item.max) * 100;
                            markers.push(marker);
                        });

                        

                        if (markers.length > 1) {
                            //reverse markers because they are ordered DESC
                            markers.reverse();
                            //generate url for google charts.
                            //this API is deprecated but the only hack for now
                            var url = 'http://chart.apis.google.com/chart?chs=75x30&chd=t:' +
                                markers.join(',') +
                                '&cht=lc:nda&chm=o,0066FF,0,-1,4|o,FFFFFF,0,-1,2&chma=2,2,2,2';
                            branch.chartUrl = url;
                        }
                       
                });

                major.permanent = (permRaw / pMaxRaw) * 100;
                major.final = (finalRaw / fMaxRaw) * 100;
                major.total = (totalRaw / tMaxRaw) * 100;
            });
        }

        ////////////////
        /*if (focusOnOpen) {
            $timeout(function() {
                // Retrieve the scope and trigger focus
                var editorScope = textAngularManager.retrieveEditor('feedbackSummary').scope;
                editorScope.displayElements.text.trigger('focus');
            }, 500);
        }*/
    }
})();
