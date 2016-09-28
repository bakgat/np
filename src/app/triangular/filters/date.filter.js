(function() {
    'use strict';

    angular
        .module('app.filters')
        .filter('ntDate', ntDate)
        .filter('fromNtDate', fromNtDate);

    function ntDate($filter) {
        return filterFilter;

        ////////////////

        function filterFilter(value, format) {
            if(!format) {
                format = 'dd/MM/yyyy';
            }
            //Far Future ISO-8601 date
            var FUTURE = '9999-12-31';
            //Far Past ISO 8601 date
            var PAST = '1000-01-01';

            if(value == null || value == FUTURE || value == PAST) {
                return '...';
            } else {
                var d= new Date(value);
                return $filter('date')(d, format);
            }
        }
    }

    function fromNtDate($filter) {
        return filterFilter;
        ////////////////////
        
        function filterFilter(value) {
            //Far Future ISO-8601 date
            var FUTURE = '9999-12-31';
            //Far Past ISO 8601 date
            var PAST = '1000-01-01';

            if(value == FUTURE || value == PAST) {
                return null;
            } else {
                return new Date(value);
            }
        }
    }
})();
