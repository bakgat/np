(function() {
    'use strict';

    angular
        .module('app.dashboards')
        .component('counterWidget', {
            templateUrl: 'app/dashboards/analytics/widgets/counter-widget/counter-widget.tmpl.html',
            controllerAs: 'vm',
            bindings: {
                title: '@',
                count: '<',
                icon: '@',
                background: '@',
                color: '@'
            }
        });
})();
