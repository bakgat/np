(function() {
    'use strict';

    angular
        .module('app.global')
        .factory('ProfileService', ProfileService);

    /* @ngInject */
    function ProfileService($q, $timeout, GroupService, $rootScope) {


        var service = {
            activeGroup: activeGroup,
            setActiveGroup: setActiveGroup
        };

        var activeGroup = null;

        return service;

        ///////////////

        function activeGroup() {
            var defer = $q.defer();

            if(activeGroup === null) {
                GroupService.getList({active:true}).then(function(response) {
                    defer.resolve(response[0]);
                });
            } else {
                defer.resolve(activeGroup);
            }
            return defer.promise;
        }

        function setActiveGroup(group) {
            activeGroup = group;
            $rootScope.$broadcast('activeGroupChanged', group);
        }

    }
})();
