(function() {
    'use strict';
    angular
        .module('app.permission')
        .factory('googleService', GoogleService);

    /* @ngInject */
    function GoogleService($http, $rootScope, $q, UserService, _env) {
        var deferred = $q.defer();

        var service = {
            login: login,
            handleClientLoad: handleClientLoad,
            checkAuth: checkAuth,
            handleAuthResult: handleAuthResult,
            handleAuthClick: handleAuthClick
        }
        return service;

        //////////////////////


        function login() {
            gapi.auth.authorize({
                client_id: _env.googleClientId,
                scope: _env.scopes,
                immediate: false,
                hd: _env.domain
            }, handleAuthResult);

            return deferred.promise;
        }

        function handleClientLoad() {
            gapi.client.setApiKey(_env.googleSecret);
            gapi.auth.init(function() {});
            window.setTimeout(checkAuth, 1);
        };

        function checkAuth() {
            gapi.auth.authorize({
                client_id: _env.googleClientId,
                scope: _env.scopes,
                immediate: false,
                hd: _env.domain
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
                client_id: _env.googleClientId,
                scope: _env.scopes,
                immediate: false,
                hd: _env.domain
            }, handleAuthResult);
            return false;
        };
    }
})();
