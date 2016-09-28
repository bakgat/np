(function() {
    'use strict';

    angular
        .module('app.global')
        .factory('BranchService', BranchService);

    /* @ngInject */
    function BranchService(HTTPCache) {
        return HTTPCache.service('branches');
    }
})();
