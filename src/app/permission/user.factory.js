(function() {
    'use strict';

    angular
        .module('app.permission')
        .factory('UserService', UserService);

    /* @ngInject */
    function UserService($q, $http, $mdToast, $rootScope, Restangular, _,
        PermRoleStore, PermPermissionStore,
        GroupService, StaffService) {

        var currentUser = {};
        var activeGroup = null;
        var groups;

        var viewAllGroups = ['SUPERADMIN', 'ADMIN', 'CARE', 'CAREMANAGER', 'SECRETARY', 'MANAGER'];


        var service = {
            getCurrentUser: getCurrentUser,
            hasAllGroupsPermission: hasAllGroupsPermission,
            hasPermission: hasPermission,
            login: login,
            logout: logout,
            allowedGroups: allowedGroups,
            getActiveGroup: getActiveGroup,
            setActiveGroup: setActiveGroup
        };

        return service;

        ///////////////

        function getCurrentUser() {
            return currentUser;
        }

        function getRoles(user) {
            return Restangular.all('staff/login').post(user)
                .then(function(response) {
                    user.auth_token = response.auth_token;
                    user.given_name = response.given_name;
                    user.roles = [];
                    angular.forEach(response.roles, function(role) {
                        user.roles.push(role.name);
                    });

                    return user;
                }, function(err) {
                    $mdToast.show(
                        $mdToast.simple()
                        .content(err.data)
                        .position('bottom right')
                        .hideDelay(3000)
                    );
                });
        }

        function hasAllGroupsPermission(role) {
            return _.intersection(getCurrentUser().roles, viewAllGroups).length > 0;
        }

        function hasPermission(permission) {
            var deferred = $q.defer();
            var hasPermission = false;

            // check if user has permission via its roles
            angular.forEach(currentUser.roles, function(role) {
                // check role exists
                if (PermRoleStore.hasRoleDefinition(role)) {
                    // get the role
                    var roles = PermRoleStore.getStore();

                    if (angular.isDefined(roles[role])) {
                        // check if the permission we are validating is in this role's permissions
                        if (-1 !== roles[role].validationFunction[2](permission)) {
                            hasPermission = true;
                        }
                    }
                }
            });

            // if we have permission resolve otherwise reject the promise
            if (hasPermission) {
                deferred.resolve();
            } else {
                deferred.reject();
            }

            // return promise
            return deferred.promise;
        }

        function login(userinfo) {
            var deferred = $q.defer();

            getRoles(userinfo).then(function(user) {
                currentUser = user;
                deferred.resolve(currentUser);
            });

            return deferred.promise;

        }

        function logout() {
            PermPermissionStore.clearStore();
            PermRoleStore.clearStore();
        }


        function allowedGroups() {
            var user = getCurrentUser();

            var defer = $q.defer();

            if (groups == null) {
                //TODO: for now group selection only for staff users
                if (!hasAllGroupsPermission()) {
                    StaffService.one(user.auth_token).all('groups').getList().then(function(response) {
                        var mappedGroups = _.map(response, function(sig) {
                            return sig.group;
                        });
                        groups = mappedGroups;
                        defer.resolve(groups);
                    });

                } else {
                    GroupService.getList({ active: true }).then(function(response) {
                        groups = response;
                        defer.resolve(response);
                    });
                }
            } else {
                defer.resolve(groups);
            }

            return defer.promise;

        }

        function getActiveGroup() {
            var defer = $q.defer();

            if (activeGroup === null) {
                allowedGroups().then(function(response) {
                    if (response[0].isRestangularized()) {
                        activeGroup = response[0];
                        defer.resolve(activeGroup);
                    } else {
                        //TODO check if response[0] exists and ID exists on this item
                        GroupService.one(response[0].id).get()
                            .then(function(restGroup) {
                                activeGroup = restGroup;
                                defer.resolve(activeGroup);
                            });
                    }

                });
            } else {
                if (activeGroup.isRestangularized()) {
                    defer.resolve(activeGroup);
                } else {
                    GroupService.one(activeGroup.id).get()
                        .then(function(restGroup) {
                            activeGroup = restGroup;
                            defer.resolve(activeGroup);
                        });
                }
            }
            return defer.promise;
        }

        function setActiveGroup(group) {
            activeGroup = group;
            $rootScope.$broadcast('activeGroupChanged', group);
        }
    }
})();
