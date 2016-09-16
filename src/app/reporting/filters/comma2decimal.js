(function() {
    'use strict';

    angular
        .module('app.reporting')
        .filter('comma2decimal', comma2decimal);

    function comma2decimal() {
        return filterFilter;

        ////////////////

        function filterFilter(input) {
            var ret = (input) ? input.toString().replace(",", ".") : null;
            return ret;
        }
    }

})();
