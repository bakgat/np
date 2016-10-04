(function() {
    'use strict';

    angular
        .module('app')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig(triSettingsProvider, triRouteProvider, $mdDateLocaleProvider) {
        var now = new Date();
        // set app name & logo (used in loader, sidemenu, footer, login pages, etc)
        triSettingsProvider.setName('Mijn Klimtoren');
        triSettingsProvider.setCopyright('&copy;' + now.getFullYear() + ' klimtoren.be');
        triSettingsProvider.setLogo('assets/images/logo/my_logo_120.png');
        // set current version of app (shown in footer)
        triSettingsProvider.setVersion('0.1.3');
        // set the document title that appears on the browser tab
        triRouteProvider.setTitle('Mijn Klimtoren');
        triRouteProvider.setSeparator('|');


        //TODO move this
        $mdDateLocaleProvider.firstDayOfWeek = 1;
        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'L', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };

        $mdDateLocaleProvider.formatDate = function(date) {
            var m = moment(date);
            return m.isValid() ? m.format('L') : '';
        };

    }
})();
