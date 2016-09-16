(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('round', round);

    function round() {
        return filterFilter;

        ////////////////

        function filterFilter(value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }
    }
})();
