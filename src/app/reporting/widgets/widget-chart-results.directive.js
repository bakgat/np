(function() {
    'use strict';

    angular
        .module('app.reporting')
        .directive('chartResultsWidget', chartResultsWidget);

    /* @ngInject */
    function chartResultsWidget($timeout) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            require: 'triWidget',
            link: link,
            restrict: 'A'
        };
        return directive;

        function link($scope, $element, attrs, widgetCtrl) {
            widgetCtrl.setLoading(true);
            
            $timeout(function() {
                widgetCtrl.setLoading(false);
            }, 1500);

            widgetCtrl.setMenu({
                icon: 'zmdi zmdi-more-vert',
                items: [{
                    icon: 'zmdi zmdi-select-all',
                    title: 'Alle resultaten',
                    click: filterResults
                }, {
                    icon: 'zmdi zmdi-arrow-right',
                    title: 'Gewoon traject'
                }, {
                    type: 'divider'
                }, {
                    icon: 'notos notos-support',
                    title: 'Met ondersteuning'
                }, {
                    icon: 'notos notos-tools',
                    title: 'Met hulpmiddelen'
                }, {
                    icon: 'notos notos-challenge',
                    title: 'Uitdaging'
                }, {
                    icon: 'notos notos-basic',
                    title: 'Basis'
                }]
            });

            function filterResults(filter) {
                widgetCtrl.setLoading(true);
                $timeout(function() {
                    widgetCtrl.setLoading(false);
                }, 1500);

            }

        }
    }
})();
