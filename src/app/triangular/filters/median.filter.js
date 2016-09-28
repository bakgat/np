(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('medianPercent', medianPercent)
        .filter('medianByPercent', medianByPercent);

    function medianPercent(_, $filter) {
        return filterFilter;

        ////////////////

        function filterFilter(arr, max, decimals) {
            var arrResults = arr;
            arrResults.sort(function(a, b) {
                return a - b;
            });

            var half = Math.floor(arrResults.length / 2);
            var median = 0;
            if (arrResults.length % 2)
                median = arrResults[half];
            else
                median = (arrResults[half - 1] + arrResults[half]) / 2.0;

            return $filter('percent')(median, max, decimals);
        }
    }

    function medianByPercent(_, $filter) {
        return filterFilter;

        ////////////////

        function filterFilter(array, property, max, decimals) {
            var arrResults = _.flatMap(array, function(result) {
                if (result[property]) {
                    return parseFloat(result[property]);
                }
            });
            return $filter('medianPercent')(arrResults, max, decimals);
        }
    }
})();
