(function() {
    'use strict';

    angular
        .module('app.manage')
        .directive('emailUnique', emailUnique);

    /* @ngInject */
    function emailUnique($q, $timeout, StudentService, _) {
        var directive = {
            link: link,
            require: 'ngModel',
            restrict: 'A',
            scope: {
                emailUnique: '='
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

                StudentService.getList().then(studentsLoaded);

                function studentsLoaded(response) {
                    var exclude = scope.emailUnique;
                    var emails = _.map(response, function(student) {
                        if (exclude != student.id) {
                            return student.email;
                        }
                    });
                    if (emails.indexOf(modelValue) === -1) {
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
