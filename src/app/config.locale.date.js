(function() {
    'use strict';

    angular
        .module('app')
        .config(localeDateConfig);

    /* @ngInject */
    function localeDateConfig($mdDateLocaleProvider) {
        $mdDateLocaleProvider.firstDayOfWeek = 1;
        $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'DD/MM/YYYY', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };

        $mdDateLocaleProvider.formatDate = function(date) {
          console.log('ok');
            var m = moment(date);
            return m.isValid() ? m.format('DD/MM/YYYY') : '';
        };
    }
})();
