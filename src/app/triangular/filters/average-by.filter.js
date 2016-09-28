(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('averageByPercent', averageByPercent);

    function averageByPercent(_, $filter) {
        return filterFilter;

        ////////////////

        function filterFilter(array, property, max, decimals) {
            var mean = _.meanBy(array, function(result) {
                if (result[property])  {
                    var score = parseFloat(result[property]);
                    return score;
                }
            });
            if (!isNaN(mean) && max) {
                return $filter('percent')(mean, max, decimals);
            }

            return mean;
        }
    }
})();
