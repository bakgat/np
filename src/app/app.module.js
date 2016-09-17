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
            'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngMaterial',
            'googlechart', 'chart.js', 'linkify', 'ui.calendar', 'angularMoment', 'textAngular', 'uiGmapgoogle-maps', 'hljs', 'md.data.table',
            angularDragula(angular), 'ngFileUpload',
            'checklist-model', 'restangular',
            'app.authentication',
            //all global needed services and directives
            'app.global',
            // 'seed-module',
            // uncomment above to activate the example seed module
            'app.translate',
            // only need one language?  if you want to turn off translations
            // comment out or remove the 'app.translate', line above
            'app.permission',
            'app.filters',
            // dont need permissions?  if you want to turn off permissions
            // comment out or remove the 'app.permission', line above
            // also remove 'permission' from the first line of dependencies
            // https://github.com/Narzerus/angular-permission see here for why
            //'app.examples',
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
        //RestangularProvider.setDefaultHttpFields({cache: true});
        RestangularProvider.setBaseUrl('http://localhost:4000');


    });

})();
