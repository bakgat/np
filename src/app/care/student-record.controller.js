(function() {
    'use strict';

    angular
        .module('app.care')
        .controller('StudentRecordController', StudentRecordController);

    /* @ngInject */
    function StudentRecordController($scope, $state, $mdDialog, $mdToast, $filter, student, modules, _, IacService) {
        var vm = this;

        vm.student = student;
        vm.convertedIacs = [];

        //actions

        vm.closeStudent = closeStudent;
        vm.revert = revert;
        vm.save = save;

        vm.addRedicodi = addRedicodi;
        vm.openIac = openIac;
        vm.openKivaFile = openKivaFile;
        vm.addKivaStep = addKivaStep;
        vm.selectedKiva = '';

        init();
        //////////////////////

        function init() {
            loadRedicodi();
            loadIacs();
        }

        /* function getIcon(item) {
             var module =
                 return module.icon;
         }

         function getRedicodiName(item) {
             var module = _.filter(modules, function(module) {
                 return module.id == item.redicodi;
             });
             return module.name;
         }*/
        function getFullRedicodiItem(item) {
            return _.find(modules, function(module) {
                return module.id == item.redicodi;
            });
        }

        function loadRedicodi() {
            student.getList('redicodi').then(function(response) {
                angular.forEach(response, function(item) {
                    var module = getFullRedicodiItem(item);
                    item.module = {
                        id: module.id,
                        name: module.name,
                        icon: module.icon
                    }
                });

                vm.redicodi = response;
            });
        }

        function loadIacs() {
            student.all('iac').getList().then(function(response) {
                vm.iacs = response;
                return vm.iacs
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
                    module: null,
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
                            var module = getFullRedicodiItem(redicodiPeriod);
                            redicodiPeriod.module = {
                                id: module.id,
                                name: module.name,
                                icon: module.icon
                            }
                            vm.redicodi.splice(i, 1, redicodiPeriod);
                            foundRedicodi = true;
                        }
                    }
                    if (!foundRedicodi) {
                        var module = getFullRedicodiItem(redicodiPeriod);
                        redicodiPeriod.module = {
                            id: module.id,
                            name: module.name,
                            icon: module.icon
                        }
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


        function openIac($event, iac) {
            //TODO: this iac is an converted iac not the original Restangular object
            //Get it again by it's id

            if (iac) {
                iac.start = $filter('fromNtDate')(iac.start);
                iac.end = $filter('fromNtDate')(iac.end);
            } else {
                iac = {
                    start: new Date(),
                    end: null,
                    goals: []
                }
            }
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
                    //Convert date to string to override UTC timezone conversion
                    iac.start = $filter('date')(iac.start, 'yyyy-MM-dd');
                    iac.end = $filter('date')(iac.end, 'yyyy-MM-dd');

                    if (iac.id) {
                        iac.save().then(insertIac, cancelIac);
                    } else {
                        vm.iacs.post(iac).then(insertIac, cancelAddedIac);
                    }

                    function insertIac(iac) {
                        var foundIac = false;
                        var i = 0;
                        for (i = 0; i < vm.iacs.length; i++) {
                            if (vm.iacs[i].id == iac.id) {

                                vm.iacs.splice(i, 1, iac);
                                foundIac = true;
                            }
                        }
                        if (!foundIac) {
                            vm.iacs.push(iac);
                        }
                    }

                    function cancelAddedIac() {
                        console.log('cancel added');
                    }
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

        function openKivaFile($event, kiva) {
            if (vm.selectedKiva == kiva) {
                vm.selectedKiva = null;
            } else {
                vm.selectedKiva = kiva;
            }
        }


        function addKivaStep($event, kivaFile) {
            $mdDialog.show({
                    controller: 'KivaDialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/care/kiva/kiva-dialog.tmpl.html',
                    targetEvent: $event,
                    focusOnOpen: false,
                    locals: {
                        kiva: kivaFile
                    }
                })
                .then(function(iac) {
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

        vm.events = [{
            title: 'Melding',
            subtitle: '21 september 2016 09:15<br/>door Karl Van Iseghem',
            date: '21/9/2016<br/>09:15',
            icon: 'zmdi zmdi-notifications-active',
            content: '<div class="padding-10"><h5>Betrokken leerlingen:</h5><ul class="list-disc"><li>Leerling 1</li><li>Leerling 2</li></ul></div>',
            more: false
        }, {
            title: 'Gesprek slachtoffer',
            subtitle: '21 september 2016 10:20<br/>door Karl Van Iseghem',
            date: '21/9/2016',
            icon: 'notos notos-spoken',
            content: '<div class="padding-10"><h5>Actieve pesters:</h5><ul class="list-disc"><li>Leerling 1</li><li>Leerling 2</li></ul><h5>Steuners:</h5><ul class="list-disc"><li>Leerling 3</li><li>Leerling 4</li></ul></div>',
            more: false
        }, {
            title: 'Aanpak',
            subtitle: '21 september 2016 10:35<br/>door Karl Van Iseghem',
            date: '21/9/2016',
            content: '<div class="padding-10"><h5>Steungroep</h5>Kort verslag en zo verder</div>',
            icon: 'zmdi zmdi-accounts',
            more: false
        }, {
            title: 'Ouders verwittigd',
            subtitle: '',
            date: '24/6/2015',
            icon: 'zmdi zmdi-phone-in-talk',
            content: '',
            more: false
        }, {
            title: 'Leerkracht verwittigd',
            subtitle: '',
            date: '23/6/2015',
            icon: 'fa fa-graduation-cap',
            content: ' ',
            more: false
        }, {
            title: 'Opvolggesprek slachtoffer',
            subtitle: '',
            date: '23/6/2015',
            icon: 'notos notos-spoken',
            content: '',
            more: false
        }, {
            title: 'Opvolggesprek steungroep',
            subtitle: '',
            date: '17/6/2015',
            icon: 'zmdi zmdi-accounts',
            content: '',
            palette: 'cyan:500',
            more: false
        }, {
            title: 'Afgesloten',
            subtitle: '',
            date: '23/6/2015',
            icon: 'zmdi zmdi-stop',
            content: '',
            more: false
        }];
    }
})();
