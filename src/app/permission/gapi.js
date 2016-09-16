(function() {
    'use strict';
    angular
        .module('app.permission')
        .factory('googleService', GoogleService);

    /* @ngInject */
    function GoogleService($http, $rootScope, $q, UserService) {
        var deferred = $q.defer();

        var service = {
            login: login,
            handleClientLoad: handleClientLoad,
            checkAuth: checkAuth,
            handleAuthResult: handleAuthResult,
            handleAuthClick: handleAuthClick,

            clientId: '790747751237-7umr4fnen0kvt1avk96uo7r30vptm71f.apps.googleusercontent.com',
            apiKey: 'AIzaSyAnSbvlhrnzybVDYM3ziI-2IhvVYhhtLVw',
            scopes: 'profile email',
            domain: ''
        }
        return service;

        //////////////////////


        function login() {
            gapi.auth.authorize({
                client_id: service.clientId,
                scope: service.scopes,
                immediate: false,
                hd: service.domain
            }, handleAuthResult);

            return deferred.promise;
        }

        function handleClientLoad() {
            gapi.client.setApiKey(service.apiKey);
            gapi.auth.init(function() {});
            window.setTimeout(checkAuth, 1);
        };

        function checkAuth() {
            gapi.auth.authorize({
                client_id: service.clientId,
                scope: service.scopes,
                immediate: true,
                hd: service.domain
            }, handleAuthResult);
        };

        function handleAuthResult(authResult) {
            if (authResult && !authResult.error) {
                var data = {};

                gapi.client.load('oauth2', 'v2', function() {
                    var request = gapi.client.oauth2.userinfo.get();
                    request.execute(function(resp) {
                        data = resp;
                        data.provider = 'google+';

                        UserService.login(data)
                            .then(function(user) {
                                deferred.resolve(user);
                            });

                    });
                });
            } else {
                //$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                deferred.reject('error');
            }
        };

        function handleAuthClick(event) {
            gapi.auth.authorize({
                client_id: service.clientId,
                scope: service.scopes,
                immediate: false,
                hd: service.domain
            }, handleAuthResult);
            return false;
        };
    }
})();
