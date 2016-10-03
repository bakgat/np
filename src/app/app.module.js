(function() {
    'use strict';

    var env = {};

    // Import variables if present (from env.js)
    if (window) {
        Object.assign(env, window.__env);
    }


    angular
        .module('app', [
            'ui.router', 'permission',
            'triangular',
            'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngMaterial', 'angular.filter',
            'googlechart', 'chart.js', 'linkify', 'ui.calendar', 'angularMoment', 'textAngular', 'uiGmapgoogle-maps', 'hljs', 'md.data.table',
            angularDragula(angular), 'ngFileUpload',
            'checklist-model', 'restangular',
            'app.authentication',
            //all global needed services and directives
            'app.global',
            'app.translate',
            // only need one language?  if you want to turn off translations
            // comment out or remove the 'app.translate', line above
            'app.permission',
            'app.filters',
            'app.dashboards',
            'app.manage',
            'app.care',
            'app.reporting'
        ])

    // set a constant for the API we are connecting to
    .constant('API_CONFIG', {
            'url': 'http://localhost:4000/'
        })
        .constant('_', window._)
        .constant('moment', moment)
        .constant('_env', env)

    .config(function(RestangularProvider, $mdDateLocaleProvider) {
        RestangularProvider.setBaseUrl(env.api);
    });

})();
