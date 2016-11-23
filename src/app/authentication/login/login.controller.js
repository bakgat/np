(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($rootScope, $state, googleService, triSettings, HTTPCache, _env) {
        var vm = this;
        vm.loginClick = loginClick;

        vm.triSettings = triSettings;
        init();
        ////////////////    
        function init() {}

        function loginClick() {
            googleService.login().then(function(user) {
                HTTPCache.setDefaultHeaders({ Auth: user.auth_token });

                $state.go(_env.redirectAfterLoginState);
            }, function(err) {
                console.log('Failed: ' + err);
            });
        }

    }
})();
