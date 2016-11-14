(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /* @ngInject */
    function config(RestangularProvider, _env) {
        RestangularProvider.setBaseUrl(_env.api);
    }
})();