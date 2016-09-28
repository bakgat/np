(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($rootScope, $state, googleService, triSettings, UserService, HTTPCache) {
        var vm = this;
        vm.loginClick = loginClick;

        vm.triSettings = triSettings;
        init();
        ////////////////    
        function init() {}

        function loginClick() {
            googleService.login().then(function(user) {
                HTTPCache.setDefaultHeaders({Auth: user.auth_token});
                
                $state.go('triangular.analytics');
            }, function(err) {
                console.log('Failed: ' + err);
            });
        }
    }
})();
