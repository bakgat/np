(function() {
    'use strict';

    angular
        .module('app.global')
        .filter('staffType', staffType);

    function staffType() {
        return filterFilter;

        ////////////////

        function filterFilter(input) {
            switch (input) {
                case 'T':
                    return 'Leerkracht';
                    break;
                case 'X':
                    return 'Titularis';
                    break;
            }
        }
    }

})();
