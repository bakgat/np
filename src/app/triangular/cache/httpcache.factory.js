(function() {
    'use strict';

    angular
        .module('triangular.cache')
        .factory('HTTPCache', HTTPCache);

    /* @ngInject */
    function HTTPCache(Restangular, $cacheFactory, $rootScope) {
        var cache;
        cache = $cacheFactory('http');

        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setDefaultHttpFields({ cache: cache });
            
            RestangularConfigurer.setResponseInterceptor(function(response, operation, model, url) {
                if (operation === 'put' || operation === 'post' || operation === 'delete') {
                    cache.removeAll();
                }
                return response;
            });

            // Custom Global Method(s) for Restangularized Elements.
           /* RestangularConfigurer.setOnElemRestangularized(function(elem, isCollection) {
                elem.clearCache = function() {
                    cache.removeAll();
                }
                return elem;
            });*/
        });
    }
})();
