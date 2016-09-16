(function() {
    'use strict';

    angular
        .module('app.manage')
        .directive('groupname', groupname);

    /* @ngInject */
    function groupname($q, $timeout, GroupService, _) {
        var directive = {
            link: link,
            require: 'ngModel',
            restrict: 'A',
            scope: {
                groupname: '='
            }
        };
        return directive;
        //////////////////
        function link(scope, elem, attrs, ctrl) {
            ctrl.$asyncValidators.groupname = validator;


            function validator(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return $q.when();
                }

                var def = $q.defer();

                GroupService.getList().then(groupsLoaded);

                function groupsLoaded(response) {
                    var exclude = scope.groupname;
                    var names = _.map(response, function(group) {
                        if (exclude != group.id) {
                            return group.name;
                        }
                    });
                    if (names.indexOf(modelValue) === -1) {
                        //available
                        def.resolve();
                    } else {
                        def.reject();
                    }
                }

                return def.promise;
            }
        }
    }
})();
