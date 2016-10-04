(function() {
    'use strict';

    angular
        .module('app.permission')
        .run(permissionRun);

    /* @ngInject */
    function permissionRun($rootScope, $cookies, $state, PermPermissionStore, PermRoleStore, UserService) {
       

        // create permissions and add check function verify all permissions
        var permissions = [
            'dashboards',
            'care',
            'reporting', 'reportingEvaluations', 'reportingIAC', 'reportingReports',
            'manage', 'manageStudents', 'manageGroups', 'manageStaff',
            'addSunflowerEvaluation', 'addMultipleEvaluation'
            ];
        PermPermissionStore.defineManyPermissions(permissions, function (permissionName) {
            return UserService.hasPermission(permissionName);
        });

        // create roles for app
        PermRoleStore.defineManyRoles({
            'SUPERADMIN': permissions, //ALLOW ALL FOR SA
            'ADMIN': ['dashboards', 'reporting', 'reportingEvaluations', 'reportingIAC', 'reportingReports', 'manage', 'manageStudents', 'manageGroups', 'manageStaff'],
            'TEACHER': ['dashboards', 'reporting', 'reportingEvaluations', 'reportingIAC', 'reportingReports'],
            'SECRETARY': ['dashboards', 'manage', 'manageStudents', 'manageGroups', 'manageStaff'],
            'MANAGER': ['dashboards', 'care', 'reporting', 'reportingEvaluations', 'reportingIAC', 'reportingReports'],
            'CAREMANAGER': ['dashboards', 'care','reporting', 'reportingEvaluations'],
            'CARE': ['dashboards', 'care','reporting', 'reportingEvaluations'],
            'ANONYMOUS': []
        });

        ///////////////////////

        // default redirect if access is denied
        function accessDenied() {
            $state.go('authentication.login');
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
