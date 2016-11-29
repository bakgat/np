(function() {
    'use strict';

    angular
        .module('app.care')
        .controller('CareToolbarController', CareToolbarController);

    /* @ngInject */
    function CareToolbarController($rootScope, $mdMedia, $filter, $mdUtil, $mdSidenav,
        $state, triBreadcrumbsService, triLayout, UserService) {
        var vm = this;

        vm.breadcrumbs = triBreadcrumbsService.breadcrumbs;

        vm.filterStudentList = filterStudentList;
        vm.hideMenuButton = hideMenuButton;

        vm.openSideNav = openSideNav;
        vm.showSearch = false;
        vm.toggleSearch = toggleSearch;

        vm.isFullScreen = false;
        vm.fullScreenIcon = 'zmdi zmdi-fullscreen';
        vm.toggleFullScreen = toggleFullScreen;

        initToolbar();
        /////////////////

        function initToolbar() {
            vm.user = UserService.getCurrentUser();
        }

        function filterStudentList(studentSearch) {
            $rootScope.$broadcast('studentSearch', studentSearch);
        }

        function toggleSearch() {
            vm.showSearch = !vm.showSearch;
        }

        function hideMenuButton() {
            return triLayout.layout.sideMenuSize !== 'hidden' && $mdMedia('gt-sm');
        }

        /**
         * Build handler to open/close a SideNav;
         */
        function openSideNav(navID) {
            $mdUtil.debounce(function() {
                $mdSidenav(navID).toggle();
            }, 300)();
        }


        function toggleFullScreen() {
            vm.isFullScreen = !vm.isFullScreen;
            vm.fullScreenIcon = vm.isFullScreen ? 'zmdi zmdi-fullscreen-exit' : 'zmdi zmdi-fullscreen';
            // more info here: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
            var doc = $document[0];
            if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                if (doc.documentElement.requestFullscreen) {
                    doc.documentElement.requestFullscreen();
                } else if (doc.documentElement.msRequestFullscreen) {
                    doc.documentElement.msRequestFullscreen();
                } else if (doc.documentElement.mozRequestFullScreen) {
                    doc.documentElement.mozRequestFullScreen();
                } else if (doc.documentElement.webkitRequestFullscreen) {
                    doc.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (doc.exitFullscreen) {
                    doc.exitFullscreen();
                } else if (doc.msExitFullscreen) {
                    doc.msExitFullscreen();
                } else if (doc.mozCancelFullScreen) {
                    doc.mozCancelFullScreen();
                } else if (doc.webkitExitFullscreen) {
                    doc.webkitExitFullscreen();
                }
            }
        }
    }
})();
