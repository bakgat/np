/* global d3 */
(function() {
    'use strict';

    angular
        .module('app.dashboards')
        .controller('DashboardAnalyticsController', DashboardAnalyticsController);

    /* @ngInject */
    function DashboardAnalyticsController(BaseStateService, analytics, _, DiffService) {
        var vm = this;

        vm.data = analytics;
        vm.otherWork = [];

        // init
        init();
        /////////////////////

        function init() {
            BaseStateService.setBaseState('triangular.dashboard-analytics');
            var totalOthers = vm.data.students.count;
            var totalIacOthers = vm.data.students.count;
            var totalSpecGroupOthers = vm.data.students.count;

            var bcs = _.filter(vm.data.redicodi, function(r) {
                return _.indexOf(['B', 'C'], r.redicodi) > -1;
            });
            vm.otherWork = _.map(bcs, function(r) {
                totalOthers -= r.count;
                return {
                    value: r.count,
                    name: r.redicodi
                };

            });
            vm.otherWork.push({ value: totalOthers, name: 'andere' });

            var iacs = _.filter(vm.data.redicodi, function(r) {
                return _.indexOf(['IAC'], r.redicodi) > -1;
            });
            vm.iacs = _.map(iacs, function(r) {
                totalIacOthers -= r.count;
                return {
                    value: r.count,
                    name: r.redicodi
                };

            });
            vm.iacs.push({ value: totalIacOthers, name: 'gewoon curriculum' });

            var specGroups = _.filter(vm.data.redicodi, function(r) {
                return _.indexOf(['BEE', 'MSF', 'SF'], r.redicodi) > -1;
            })
            vm.specGroups = _.map(specGroups, function(r) {
                totalSpecGroupOthers -= r.count;
                return {
                    value: r.count,
                    name: r.redicodi
                };
            });
            vm.specGroups.push({value: totalSpecGroupOthers, name: 'andere'});

        }

        vm.otherWorkOptions = {
            chart: {
                type: 'pieChart',
                height: 300,
                x: function(d) {
                    var n = DiffService.toLabel(d.name);
                    if (!n) return d.name;
                    return n;
                },
                y: function(d) {
                    return d.value;
                },
                valueFormat: function(d) {
                    return d3.format('.0')(d);
                },
                showLegend: true,
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        };

    }
})();
