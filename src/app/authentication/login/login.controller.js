(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($rootScope, $state, googleService, UserService) {
        var vm = this;
        vm.loginClick = loginClick;

        
        init();
        ////////////////    
        function init() {
        }

        function loginClick() {
            googleService.login().then(function(data) {
                //console.log($rootScope.$previousState);
                $state.go('triangular.analytics');
            }, function(err) {
                console.log('Failed: ' + err);
            });
        }
    }
})();
