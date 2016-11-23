(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('EvaluationController', EvaluationController);

    /* @ngInject */
    function EvaluationController($scope, $stateParams, $timeout, $filter,
        $mdToast, $mdDialog, _, evaluation) {
        var vm = this;


        vm.closeEvaluation = closeEvaluation;
        vm.editEvaluation = editEvaluation;
        vm.removeEvaluation = removeEvaluation;
        vm.editFeedback = editFeedback;
        vm.barChart = {
            data: [
                []
            ],
            labels: [],
            series: ['dummy'],
            options: {
                datasetFill: false,
                responsive: true
            }
        };

        vm.average = null;
        vm.median = null;

        vm.profileChart = {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            labels: []
        };

        init();
        /////////////////////////////////
        function init() {
            vm.evaluation = evaluation;
            makeCharts();
            $scope.$emit('evaluationOpened', vm.evaluation);
            //calculate();
        }

        function makeCharts() {
            for (var i = 0; i < 10; i++)  {
                vm.profileChart.labels[i] = (((i + 1) * 10) - 10) + '-' + ((i + 1) * 10) + '%';
            }
            $timeout(function() {
                angular.forEach(evaluation.pointResults, function(result) {
                    var percent = (result.score / evaluation.max) * 100;
                    var roundedPercent = Math.round(percent, 2);

                    vm.barChart.labels.push(result.student.displayName);
                    vm.barChart.data[0].push(roundedPercent);

                    vm.profileChart.data[Math.floor(percent / 10)] += 1;
                });
            });
        }

        function calculate() {

            var scores = _.flatMap(vm.evaluation.pointResults, function(result) {
                return parseFloat(result.score);
            });

            //AVERAGE
            var sum = 0;
            for (var i = 0; i < scores.length; i++) {
                sum += scores[i];
            }
            var average = sum / scores.length;
            //vm.average = round(average / parseFloat(vm.evaluation.max) * 100, 2);
            vm.average = percent(average, vm.evaluation.max);

            //MEDIAN
            scores = _.sortBy(scores, function(a, b) {
                return a - b;
            });

            var middle = Math.floor((scores.length - 1) / 2); // NB: operator precedence
            if (scores.length % 2) {
                vm.median = m[middle];
            } else {
                vm.median = (scores[middle] + scores[middle + 1]) / 2.0;
            }


        }

        $scope.$watch('vm.evaluation.pointResults', function() {
            //calculate();
        }, true);

        function closeEvaluation() {
            $scope.$emit('closeEvaluation');
        }

        function editEvaluation($event) {
            var templateUrl = 'app/reporting/evaluations/points/points-dialog.tmpl.html';
            var controller = 'PointsDialogController';
            if (vm.evaluation.type == 'C') {
                templateUrl = 'app/reporting/evaluations/comprehensive/comprehensive-dialog.tmpl.html';
                controller = 'ComprehensiveDialogController';
            } else if (vm.evaluation.type == 'S') {
                templateUrl = 'app/reporting/evaluations/spoken/spoken-dialog.tmpl.html';
                controller = 'SpokenDialogController';
            } else if (vm.evaluation.type == 'MC') {
                templateUrl = 'app/reporting/evaluations/multiplechoice/multiplechoice-dialog.tmpl.html';
                controller = 'MultiplechoiceDialogController';
            }
            $mdDialog.show({
                    controller: controller,
                    controllerAs: 'vm',
                    templateUrl: templateUrl,
                    targetEvent: $event,
                    locals: {
                        evaluation: vm.evaluation
                    },
                    focusOnOpen: false
                })
                .then(function(evaluation) {

                    evaluation.date = $filter('date')(evaluation.date, 'yyyy-MM-dd');

                    if (evaluation.id) {
                        //save this evaluation object and notify list controller
                        evaluation.save().then(function(evaluation) {
                            $scope.$emit('evaluationSaved', evaluation);
                        }, cancelEvaluation);

                    } else {
                        //list controller take care of this
                        $scope.$emit('saveEvaluation', evaluation);
                    }

                }, cancelEvaluation);

            function cancelEvaluation() {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Geannuleerd.')
                    .position('bottom right')
                    .hideDelay(3000)
                );
            }
        }

        function removeEvaluation(evaluation) {
            evaluation.delete().then(function(response) {
                if (response) {
                    $scope.$emit('removeEvaluation', evaluation);
                }
            })
        }

        function editFeedback($event, result) {
            var templateUrl = 'app/reporting/evaluations/feedback/editfeedback-dialog.tmpl.html';
            var controller = 'EditFeedbackDialogController';
            
            $mdDialog.show({
                    controller: controller,
                    controllerAs: 'vm',
                    templateUrl: templateUrl,
                    targetEvent: $event,
                    locals: {
                        result: result
                    },
                    focusOnOpen: true
                })
                .then(function(result) {
                    //TODO: get this more efficient 
                    //Only save committed summary !!! for this student
                    //eg: post /evaluation/{id}/student/{id}/summary !?
                    vm.evaluation.save().then(function(response) {
                        console.log(response);
                    });
                }, cancelEvaluation);

            function cancelEvaluation() {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Geannuleerd.')
                    .position('bottom right')
                    .hideDelay(3000)
                );
            }
        }

   
    }
})();
