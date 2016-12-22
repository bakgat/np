(function() {
    'use strict';

    angular
        .module('app.global')
        .directive('userAvatar', userAvatar);

    /* @ngInject */
    function userAvatar() {
        // Usage:
        //
        // ```html
        // <select-groups ng-value="">
        // ```
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                'ngModel': '='
            },
            templateUrl: 'app/global/profile/user-avatar.tmpl.html',
            controller: UserAvatarController,
            controllerAs: 'vm',
            bindToController: true // because the scope is isolated
        };
        return directive;
        ////////////////////////

        function link($scope, $element, attrs) {
            
        }
    }

    /* @ngInject */
    function UserAvatarController($filter, _env) {
        var vm = this;
        vm.user = vm.ngModel;

        vm.style = '';

        init();
        ////////////////////

        function init() {
            var source = _env.api;
            source += '/students/pic/';
            source += vm.user.id;

            vm.style = 'url(' + source + ')';
        }
    }

})();
