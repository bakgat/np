(function() {
    'use strict';

    angular
        .module('app.care')
        .controller('StudentRecordController', StudentRecordController);

    /* @ngInject */
    function StudentRecordController($scope, $state, $mdDialog, $mdToast, $filter, student) {
        var vm = this;

        vm.student = student;

        //actions

        vm.closeStudent = closeStudent;
        vm.revert = revert;
        vm.save = save;

        vm.addRedicodi = addRedicodi;
        vm.openIac = openIac;

        init();
        //////////////////////

        function init() {
            loadRedicodi();
        }

        function setIcon(item) {
            var icon = '';
            switch (item.redicodi) {
                case 'T':
                    icon = 'tools';
                    break;
                case 'S':
                    icon = 'support';
                    break;
                case 'C':
                    icon = 'challenge';
                    break;
                case 'B':
                    icon = 'basic';
                    break;
            }
            item.icon = icon;
            return item;
        }

        function loadRedicodi() {
            student.getList('redicodi').then(function(response) {
                angular.forEach(response, function(item) {
                    item = setIcon(item);
                });
                vm.redicodi = response;
            });
        }

        function closeStudent() {
            $scope.$emit('closeStudent');
        }

        function revert() {
            collapseOptions();
        }

        function save() {
            collapseOptions();
        }

        function collapseOptions() {
            $scope.$broadcast('closeItems');
        }

        function addRedicodi($event, redicodiPeriod) {
            if (redicodiPeriod) {
                redicodiPeriod.start = $filter('fromNtDate')(redicodiPeriod.start);
                redicodiPeriod.end = $filter('fromNtDate')(redicodiPeriod.end);
            } else {
                redicodiPeriod = {
                    start: new Date(),
                    end: null,
                    redicodi: null,
                    branch: null
                }
            }

            $mdDialog.show({
                controller: 'AddToDiffDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/care/add-to-diff-dialog.tmpl.html',
                targetEvent: $event,
                focusOnOpen: false,
                locals: {
                    redicodiPeriod: redicodiPeriod
                }
            }).then(function(redicodiPeriod) {
                //Convert date to string to override UTC timezone conversion
                redicodiPeriod.start = $filter('date')(redicodiPeriod.start, 'yyyy-MM-dd');
                redicodiPeriod.end = $filter('date')(redicodiPeriod.end, 'yyyy-MM-dd');

                if (redicodiPeriod.id) {
                    redicodiPeriod.save().then(insertRedicodi, cancelAddRedicodi);
                } else {
                    vm.redicodi.post(redicodiPeriod).then(insertRedicodi, cancelAddRedicodi);
                }


                function insertRedicodi(redicodiPeriod) {
                    var foundRedicodi = false;
                    var i = 0;
                    for (i = 0; i < vm.redicodi.length; i++) {
                        if (vm.redicodi[i].id == redicodiPeriod.id) {
                            redicodiPeriod = setIcon(redicodiPeriod);
                            vm.redicodi.splice(i, 1, redicodiPeriod);
                            foundRedicodi = true;
                        }
                    }
                    if (!foundRedicodi) {
                        vm.redicodi.push(redicodiPeriod);
                    }
                }

                function cancelAddRedicodi() {

                    $mdToast.show(
                        $mdToast.simple()
                        .content('Redicodi toevoegen geannuleerd')
                        .position('bottom right')
                        .hideDelay(2000)
                    );
                }
            })
        }

        function openDiff($event) {
            $mdDialog.show({
                    controller: 'AddToDiffDialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/care/add-to-diff-dialog.tmpl.html',
                    targetEvent: $event,
                    focusOnOpen: false
                })
                .then(function(diffmodule) {
                    console.info(diffmodule);
                }, cancelDiff);

            function cancelDiff() {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Geannuleerd.')
                    .position('bottom right')
                    .hideDelay(3000)
                );
            }
        }

        function openIac($event, iac) {
            $mdDialog.show({
                    controller: 'CareIacDialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/care/iac-dialog.tmpl.html',
                    targetEvent: $event,
                    focusOnOpen: false,
                    locals: {
                        iac: iac
                    }
                })
                .then(function(iac) {
                    console.info(iac);
                }, cancelIac);

            function cancelIac() {
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
