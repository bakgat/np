(function() {
    angular
        .module('app')
        .controller('ErrorPageController', ErrorPageController);

    /* @ngInject */
    function ErrorPageController($state) {
        var vm = this;

        vm.goHome = goHome;
        vm.goLogin = goLogin;

        /////////

        function goHome() {
            $state.go('triangular.analytics');
        }
        function goLogin() {
            $state.go('authentication.login');
        }
    }
})();
