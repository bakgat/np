(function() {
    'use strict';
    angular
        .module('app.examples.dashboards')
        .component('lineChartWidget', {
            templateUrl: 'app/examples/dashboards/analytics/widgets/line-chart-widget/line-chart-widget.tmpl.html',
            controllerAs: 'vm',
            controller: LineChartWidgetController,
            bindings: {
                start: '<',
                end: '<',
                timeSpans: '<',
                onTimeChange: '&',
                data: '<',
                options: '<'
            }
        });

    /* @ngInject */
    function LineChartWidgetController($timeout) {
        var vm = this;

        $timeout(function() {
            vm.api.refreshWithTimeout(200);
        }, 0);
    }
})();
