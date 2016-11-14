(function() {
    'use strict';

    angular
        .module('app.manage')
        .factory('StaffService', StaffService);

    /* @ngInject */
    function StaffService(HTTPCache) {
        return HTTPCache.service('staff');
    }
})();
