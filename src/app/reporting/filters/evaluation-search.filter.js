(function() {
    'use strict';

    angular
        .module('app.manage')
        .filter('evaluationSearchFilter', evaluationSearchFilter);

    function evaluationSearchFilter() {
        return filterFilter;

        ////////////////

        function filterFilter(evaluations, evaluationSearch) {
            return evaluations.filter(function(evaluation) {
                if(evaluation.title.toLowerCase().indexOf(evaluationSearch.toLowerCase()) > -1 ||
                    evaluation.branchForGroup.branch.name.toLowerCase().indexOf(evaluationSearch.toLowerCase()) > -1 ||
                    evaluation.branchForGroup.branch.major.name.toLowerCase().indexOf(evaluationSearch.toLowerCase()) > -1) {
                    return evaluation;
                }
            });
        }
    }

})();