(function() {
    'use strict';

    angular
        .module('triangular')
        .provider('BaseStateService', BaseStateService);

    /* @ngInject */
    function BaseStateService() {
        // Provider
        var baseState = 'triangular.dashboard-analytics';

        this.setBaseState = setBaseState;
        this.$get = svc;

        function setBaseState(state) {
            this.baseState = state;
        }

        // Service
        function svc() {
            return {
                baseState: this.baseState,
                setBaseState: setBaseState
            };
        }
    }
})();
