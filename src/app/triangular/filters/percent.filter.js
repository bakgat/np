(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('percent', percent);

    function percent($filter) {
        return filterFilter;

        ////////////////

        function filterFilter(raw, max, decimals) {
            if (!max) return;

            var rp = (raw / max) * 100;
            if (!decimals) decimals = 2;

            return $filter('round')(rp, decimals);
        }

    }
})();
