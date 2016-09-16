(function() {
    'use strict';

    angular
        .module('app.permission')
        .run(permissionRun);

    /* @ngInject */
    function permissionRun($rootScope, $cookies, $state, PermPermissionStore, PermRoleStore, UserService) {
       

        // create permissions and add check function verify all permissions
        var permissions = ['viewAll','manageStudents', 'addSunflowerEvaluation', 'addMultipleEvaluation'];
        PermPermissionStore.defineManyPermissions(permissions, function (permissionName) {
            return UserService.hasPermission(permissionName);
        });

        // create roles for app
        PermRoleStore.defineManyRoles({
            'SUPERADMIN': permissions, //ALLOW ALL FOR SA
            'ADMIN': ['viewAll'],
            'TEACHER': ['viewAll'],
            'SECRETARY': ['viewAll'],
            'MANAGER': ['viewAll'],
            'ANONYMOUS': []
        });

        ///////////////////////

        // default redirect if access is denied
        function accessDenied() {
            $state.go('401');
        }

        // watches

        // redirect all denied permissions to 401
        var deniedHandle = $rootScope.$on('$stateChangePermissionDenied', accessDenied);

        // remove watch on destroy
        $rootScope.$on('$destroy', function() {
            deniedHandle();
        });
    }
})();
