(function() {
    'use strict';

    angular
        .module('app.manage')
        .controller('SanitizeController', SanitizeController);

    /* @ngInject */
    function SanitizeController($http, groups, BaseStateService, _env) {
        var vm = this;

        vm.groups = [];
        vm.loading = false;

        vm.doSanitize = sanitize;
       
        init();
        ////////////////////
        function init() {
            BaseStateService.setBaseState('triangular.manage.sanitize');
            vm.groups = groups;
        }

        function sanitize(group) {
            vm.loading = true;
            $http.get(_env.api + '/evaluations/sanitize/group/' + group.id)
                .then(function(response) {
                    vm.loading = false;
                });
        }
        
    }
})();
