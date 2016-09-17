
(function() {
    'use strict';


    angular
        .module('app')
        .run(runFunction);

    /* @ngInject */
    function runFunction($rootScope, $state) {
        

        // default redirect if access is denied
        function redirectError() {
            $state.go('500');
        }

        // watches

        // redirect all errors to permissions to 500
        var errorHandle = $rootScope.$on('$stateChangeError', redirectError);

        // remove watch on destroy
        $rootScope.$on('$destroy', function() {
            errorHandle();
        });

        $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
            if (from.name !== '401')
                $rootScope.$previousState = from;
        });
    }
})();
