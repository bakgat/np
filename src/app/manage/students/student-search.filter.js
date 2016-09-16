(function() {
    'use strict';

    angular
        .module('app.manage')
        .filter('studentSearchFilter', studentSearchFilter);

    function studentSearchFilter() {
        return filterFilter;

        ////////////////

        function filterFilter(students, studentSearch) {
            return students.filter(function(student) {
                if(student.displayName.toLowerCase().indexOf(studentSearch.toLowerCase()) > -1) {
                    return student;
                }
            });
        }
    }

})();