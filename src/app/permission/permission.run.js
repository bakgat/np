(function() {
    'use strict';

    angular
        .module('app.permission')
        .run(permissionRun);

    /* @ngInject */
    function permissionRun($rootScope, $cookies, $state, PermPermissionStore, PermRoleStore, UserService, _) {


        // create permissions and add check function verify all permissions
        var permissions = [
            'dashboards',
            'care',
            'reporting', 'reportingEvaluations', 'reportingIAC', 'reportingReports',
            'manage', 'manageStudents', 'manageGroups', 'manageStaff',
            'addSunflowerEvaluation', 'addMultipleEvaluation'
        ];


        PermPermissionStore.defineManyPermissions(permissions, function(permissionName) {
            return UserService.hasPermission(permissionName);
        });

        // create roles for app
        PermRoleStore.defineManyRoles({
            'SUPERADMIN': preparePermissions(permissions), //ALLOW ALL FOR SA
            'ADMIN': preparePermissions(['dashboards', 'reporting', 'reportingEvaluations', 'reportingIAC', 'reportingReports', 'manage', 'manageStudents', 'manageGroups', 'manageStaff']),
            'TEACHER': preparePermissions(['dashboards', 'reporting', 'reportingEvaluations', 'reportingIAC', 'reportingReports']),
            'SECRETARY': preparePermissions(['dashboards', 'manage', 'manageStudents', 'manageGroups', 'manageStaff']),
            'MANAGER': preparePermissions(['dashboards', 'care', 'reporting', 'reportingEvaluations', 'reportingIAC', 'reportingReports']),
            'CAREMANAGER': preparePermissions(['dashboards', 'care', 'reporting', 'reportingEvaluations']),
            'CARE': preparePermissions(['dashboards', 'care', 'reporting', 'reportingEvaluations']),
            'ANONYMOUS': preparePermissions([])
        });

        function preparePermissions(perms) {
            return function(perm) {
                _.includes(perms, perm);
            }
        };
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
