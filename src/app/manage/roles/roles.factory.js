(function() {
    'use strict';

    angular
        .module('app.manage')
        .factory('RoleService', RoleService);

    /* @ngInject */
    function RoleService(HTTPCache) {
        return HTTPCache.service('roles');
    }
})();
