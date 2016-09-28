(function() {
    'use strict';

    angular
        .module('app.dashboards')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {


        $stateProvider.state('triangular.analytics', {
            url: '/dashboards/analytics',
            templateUrl: 'app/dashboards/analytics.tmpl.html',
            // set the controller to load for this page
            controller: 'AnalyticsController',
            controllerAs: 'vm',
            // layout-column class added to make footer move to
            // bottom of the page on short pages
            data: {
                layout: {
                    contentClass: 'layout-column'
                },
                permissions: {
                    only: ['dashboards']
                }
            }
        });

        triMenuProvider.addMenu({
            name: 'Dashboard',
            icon: 'fa fa-home',
            type: 'link',
            priority: 0,
            state: 'triangular.analytics'
        });
    }
})();
