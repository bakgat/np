(function() {
    'use strict';

    angular
        .module('app.manage')
        .factory('GroupService', GroupService);

    /* @ngInject */
    function GroupService(HTTPCache) {

        return HTTPCache.all('groups');
    }
})();
