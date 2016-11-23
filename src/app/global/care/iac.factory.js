(function() {
    'use strict';

    angular
        .module('app.global')
        .factory('IacService', IacService);

    /* @ngInject */
    function IacService(HTTPCache) {
        return HTTPCache.all('iac');
    }
})();
