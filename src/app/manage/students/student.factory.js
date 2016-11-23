(function() {
    'use strict';

    angular
        .module('app.manage')
        .factory('StudentService', StudentService);

    /* @ngInject */
    function StudentService(HTTPCache) {
        return HTTPCache.all('students');
    }
})();
