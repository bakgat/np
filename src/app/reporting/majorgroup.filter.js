(function() {
    'use strict';

    angular
        .module('app.reporting')
        .filter('majorGroup', majorGroup);

    function majorGroup(_) {
        return filterFilter;

        ////////////////

        function filterFilter(list, majorGroup) {
            return list.filter(function(item) {
                var branch = item.branchForGroup ? item.branchForGroup.branch : item.branch;

                if (branch && branch.major && branch.major.name) {
                    if (branch.major.name.toUpperCase() === majorGroup.major.name.toUpperCase()) {
                       return item;
                    }
                }
            });
        }
    }

})();
