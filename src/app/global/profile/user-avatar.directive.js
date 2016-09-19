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
    function UserAvatarController($filter) {
        var vm = this;
        vm.user = vm.ngModel;

        vm.style = '';

        init();
        ////////////////////

        function init() {
            var source = 'http://schkt.volglvs.be/PIX/';
            source += vm.user.lastName.removeDiacritics(true).replace(' ', '%20');
            source += vm.user.firstName.removeDiacritics(true).replace(' ', '%20');
            source += $filter('date')(vm.user.birthday, 'dd.MM.yyyy');
            source += '.JPG';

            vm.style = 'url(' + source + ')';
        }
    }

})();
