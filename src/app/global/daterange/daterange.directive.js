(function() {
    'use strict';

    angular
        .module('app.global')
        .directive('mdDaterange', mdDaterange);

    /* @ngInject */
    function mdDaterange() {
        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                range: '=',
                onDaterangeChanged: '&'
            },
            templateUrl: 'app/global/daterange/daterange.tmpl.html',
            controller: DateRangeController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;
        ////////////////////////

        function link($scope, $element, $attrs) {}
    }

    /* @ngInject  */
    function DateRangeController($mdPanel, $rootScope, DateRangeService, HTTPCache, moment) {
        var vm = this;

        vm.showMenu = showMenu;


        init();
        /////////////////////////

        function init() {
            vm.range = DateRangeService.range();
            setRequestParams();
        }

        function showMenu(ev) {
            var position = $mdPanel.newPanelPosition()
                .relativeTo(ev.target)
                .addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);

            var config = {
                attachTo: angular.element(document.body),
                controller: DateRangePickerController,
                controllerAs: 'vm',
                templateUrl: 'app/global/daterange/daterange-picker.tmpl.html',
                panelClass: 'demo-menu-example',
                position: position,
                locals: {
                    range: vm.range,
                    onClose: closePicker
                },
                openFrom: ev,
                clickOutsideToClose: true,
                escapeToClose: true,
                focusOnOpen: false,
                zIndex: 2
            };

            $mdPanel.open(config);


        }

        function closePicker(data) {
            vm.range = data.range;
            setRequestParams();
            vm.onDaterangeChanged && vm.onDaterangeChanged();
        }

        function setRequestParams() {
            HTTPCache.setDefaultRequestParams({
                qstart: vm.range.start.format('YYYY-MM-DD'),
                qend: vm.range.end.format('YYYY-MM-DD')
            });
        }



    }


    /* @ngInject */
    function DateRangePickerController($scope, mdPanelRef, range, onClose, DateRangeService) {
        var vm = this;

        vm.range = range;

        vm.select = select;
        vm.selectCustomStart = selectCustomStart;
        vm.selectCustomEnd = selectCustomEnd;

        vm.cancel = cancel;

        init();
        /////////////////////////
        function init() {

        }

        function select(option) {
            if (option == 'week') {
                vm.range = DateRangeService.thisWeek();
            } else if (option == 'month') {
                vm.range = DateRangeService.thisMonth();
            } else if (option == 'quarter') {
                vm.range = DateRangeService.thisQuarter();
            } else if (option == 'schoolyear') {
                vm.range = DateRangeService.thisSchoolyear();
            }
            saveAndClose();
        }

        function cancel() {
            mdPanelRef.close();
        }

        function saveAndClose() {
            mdPanelRef.close().then(function(mdPanelRef) {
                onClose({
                    range: vm.range
                });
            });
        }

        function selectCustomStart() {
            vm.range.start = moment(vm.start);
            vm.selectedTab = 1;
        }

        function selectCustomEnd() {
            vm.range.end = moment(vm.end);
            DateRangeService.custom(vm.range);
            saveAndClose();
        }

        $scope.$watch('vm.range', function() {
            vm.start = vm.range.start.toDate();
            vm.end = vm.range.end.toDate();
        }, true);

    }

})();
