(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($rootScope, $state, googleService, triSettings, UserService, Restangular) {
        var vm = this;
        vm.loginClick = loginClick;

        vm.triSettings = triSettings;
        init();
        ////////////////    
        function init() {}

        function loginClick() {
            googleService.login().then(function(user) {
                Restangular.setDefaultRequestParams({
                    auth_token: user.id
                });
                //console.log($rootScope.$previousState);
                $state.go('triangular.analytics');
            }, function(err) {
                console.log('Failed: ' + err);
            });
        }
    }
})();
