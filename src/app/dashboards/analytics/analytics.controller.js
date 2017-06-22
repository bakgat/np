/* global d3 */
(function() {
    'use strict';

    angular
        .module('app.dashboards')
        .controller('DashboardAnalyticsController', DashboardAnalyticsController);

    /* @ngInject */
    function DashboardAnalyticsController(BaseStateService, analytics, _, moment, DiffService) {
        var vm = this;

        vm.data = analytics;
        vm.otherWork = [];
        vm.overviewEvaluations = [];
        vm.overviewReports = [];
        vm.overviewLogins = [];

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
                return _.indexOf(['BEE', 'MSF', 'SF', 'BF'], r.redicodi) > -1;
            })
            vm.specGroups = _.map(specGroups, function(r) {
                totalSpecGroupOthers -= r.count;
                return {
                    value: r.count,
                    name: r.redicodi
                };
            });
            vm.specGroups.push({value: totalSpecGroupOthers, name: 'andere'});



            /*
             * OVERVIEWS
             */
            var lastMonthEI = [];
            var lastMonthEU = [];
            var ei = vm.data.dailyReport.evaluation.insert;
            var eu = vm.data.dailyReport.evaluation.update;

            var lastMonthRS = [];
            var lastMonthRG = [];
            var rs = vm.data.dailyReport.report.reportStudent;
            var rg = vm.data.dailyReport.report.reportGroup;

            var lastMonthLogins = [];
            var l = vm.data.dailyReport.staff.login;

            for(var i=0;i<30;i++) {
                var date = moment().subtract(i, 'days');
                lastMonthEI.push(findByDate(ei, date));
                lastMonthEU.push(findByDate(eu, date));
                lastMonthRS.push(findByDate(rs, date));
                lastMonthRG.push(findByDate(rg, date));
                lastMonthLogins.push(findByDate(l, date));
            }

            
            function findByDate(array, d) {
                var found = _.find(array, {date: d.format('YYYY-MM-DD')});
                var count = found ? found.count || 0 : 0;
                return { count: count, date: d };
            }

            vm.overviewEvaluations.push({values: lastMonthEI, key: 'Nieuwe evaluaties'});
            vm.overviewEvaluations.push({values: lastMonthEU, key: 'Bijgewerkte evaluaties'});

            vm.overviewReports.push({values: lastMonthRS, key: 'Leerlingenrapport gemaakt'});
            vm.overviewReports.push({values: lastMonthRG, key: 'Klasrapport gemaakt'});

            vm.overviewLogins.push({values: lastMonthLogins, key: 'Logins'});
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

        vm.overviewLineChartOptions = {
                chart: {
                    type: 'lineChart',
                    y: function(d){
                        return d.count;
                        //return d.date;
                    },
                    x: function(d){
                        return d.date;
                    },
                    color: ['#82B1FF','#ff7f0e'],
                    yAxis: {
                        axisLabel: 'Aantal',
                        tickFormat: function(d){
                            return d3.format(',')(d);
                        },
                        axisLabelDistance: -10
                    },
                    xAxis: { 
                        tickFormat: function(d) {
                            return d3.time.format('%d/%m')(new Date(d));
                        }
                    }
                }
            };

    }
})();
