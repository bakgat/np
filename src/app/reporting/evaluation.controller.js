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
        vm.headerBg = headerBg;

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
            var templateUrl = 'app/reporting/points-dialog.tmpl.html';
            var controller = 'PointsDialogController'
            if (vm.evaluation.type == 'C') {
                templateUrl = 'app/reporting/comprehensive-dialog.tmpl.html';
                controller = 'ComprehensiveDialogController'
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

        function headerBg() {
            var id = '40';

            /*var avatar = vm.evaluation.course.avatar;
            
            switch (avatar) {
                case 'mk':
                    id = '01';
                    break;
                case 'c':
                    id = '05';
                    break;
                case 'hr':
                    id = '10';
                    break;
                case 'mr':
                    id = '12';
                    break;
                case 't':
                    id = '17';
                    break;
                case 'gk':
                    id = '08';
                    break;
            }*/
            return 'mb-bg-' + id;
        }
    }
})();
