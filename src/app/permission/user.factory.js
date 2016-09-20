(function() {
    'use strict';

    angular
        .module('app.permission')
        .factory('UserService', UserService);

    /* @ngInject */
    function UserService($q, $http, $mdToast, Restangular, PermRoleStore, PermPermissionStore) {
        var currentUser = {};

        var service = {
            getCurrentUser: getCurrentUser,
            hasPermission: hasPermission,
            login: login,
            logout: logout
        };

        return service;

        ///////////////

        function getCurrentUser() {
            return currentUser;
        }

        function getRoles(user) {
            return Restangular.all('staff/login').post(user)
                .then(function(response) {
                    user.auth_token  = response.auth_token;
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
                        if (-1 !== roles[role].validationFunction.indexOf(permission)) {
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

            currentUser = userinfo;

            getRoles(userinfo).then(function(user) {
                deferred.resolve(user);
            });

            return deferred.promise;

        }

        function logout() {
            PermPermissionStore.clearStore();
            PermRoleStore.clearStore();
        }
    }
})();
