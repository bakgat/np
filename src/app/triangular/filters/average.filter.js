(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('averagePercent', averagePercent);

    function averagePercent(_, $filter) {
        return filterFilter;

        ////////////////

        function filterFilter(array, max, decimals) {
            var mean = _.mean(array);
            if (!isNaN(mean) && max) {
                return $filter('percent')(mean, max, decimals);
            }

            return mean;
        }
    }
})();
