(function() {
    'use strict';

    angular
        .module('app.reporting')
        .filter('studentGroup', studentGroup);

    function studentGroup(_) {
        return filterFilter;

        ////////////////

        function filterFilter(list, studentGroup) {
            return list.filter(function(item) {
                if(item.student.displayName === studentGroup.displayName) {
                    return item;
                }
            });
        }
    }

})();
