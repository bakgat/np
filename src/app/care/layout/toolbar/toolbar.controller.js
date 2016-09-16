(function() {
    'use strict';

    angular
        .module('app.care')
        .controller('CareToolbarController', CareToolbarController);

    /* @ngInject */
    function CareToolbarController($rootScope, $mdMedia, $filter, $mdUtil, $mdSidenav,
        $state, triBreadcrumbsService, triLayout) {
        var vm = this;
        vm.breadcrumbs = triBreadcrumbsService.breadcrumbs;
        vm.filterStudentList = filterStudentList;
        vm.hideMenuButton = hideMenuButton;
        vm.openSideNav = openSideNav;
        vm.showSearch = false;
        vm.toggleSearch = toggleSearch;
        vm.toolbarMenu = [];

        /////////////////

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


    }
})();
