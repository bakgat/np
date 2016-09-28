'use strict';

describe('config.route', function() {
    var $state, $stateParams, $q, $templateCache,
        $location, $rootScope, $injector, $httpBackend,
        userServiceMock;

    function mockTemplate(templateRoute, tmpl) {
        $templateCache.put(templateRoute, tmpl || templateRoute);
    }

    function goFrom(url) {
        return {
            toState: function(state, params) {
                $location.replace().url(url); //Don't actually trigger a reload
                $state.go(state, params);
                $rootScope.$digest();
            }
        };
    }

    function goTo(url) {
        $location.url(url);
        $rootScope.$digest();
    }

    beforeEach(module('app', function($provide) {
        userServiceMock = {
            hasPermission: function(any) {
                return true;
            }
        }

        $provide.value('UserService', userServiceMock);
    }));

    beforeEach(inject(function(_$state_, _$stateParams_, _$q_, _$templateCache_, _$location_, _$rootScope_, _$injector_,
        _$httpBackend_) {



        $state = _$state_;
        $stateParams = _$stateParams_;
        $q = _$q_;
        $templateCache = _$templateCache_;
        $location = _$location_;
        $rootScope = _$rootScope_;
        $injector = _$injector_;
        $httpBackend = _$httpBackend_;

    }));

    beforeEach(function() {
        $httpBackend.expectGET('app/i18n/en.json').respond(200, {});
        mockTemplate('app/triangular/layouts/states/triangular/triangular.tmpl.html');
        mockTemplate('app/layouts/leftsidenav/leftsidenav.tmpl.html');
        mockTemplate('app/layouts/rightsidenav/rightsidenav.tmpl.html');
        mockTemplate('app/layouts/toolbar/toolbar.tmpl.html');
        mockTemplate('app/layouts/loader/loader.tmpl.html');
    });


    describe('when empty', function() {
        beforeEach(function() {
            mockTemplate('app/dashboards/analytics.tmpl.html');
        });

        it('should return analytics ', function() {
            goTo('');
            expect($state.current.name).toEqual('triangular.analytics');
        });
    });

    describe('when /', function() {
        beforeEach(function() {
            mockTemplate('app/dashboards/analytics.tmpl.html');
        });

        it('should return analytics ', function() {
            goTo('/');
            expect($state.current.name).toEqual('triangular.analytics');
        });
    });

    describe('when /401', function() {
        beforeEach(function() {
            mockTemplate('401.tmpl.html');
        });

        it('should return 401 page', function() {
            goTo('/401');
            expect($state.current.name).toEqual('401');
        });
    });

    describe('when /500', function() {
        beforeEach(function() {
            mockTemplate('500.tmpl.html');
        });

        it('should return 500 page', function() {
            goTo('/500');
            expect($state.current.name).toEqual('500');
        });
    });

    //TODO : why does this not work?
    /*
        describe('when bad url', function() {
            var badUrl = '/someNonExistentUrl';
            beforeEach(function() {
                mockTemplate('404.tmpl.html');
            });

            it('should return 404 not found ', function() {
                goTo(badUrl);
                expect($state.current.name).toEqual('404');
            });
            it('should not change the url', function() {
                goTo(badUrl);
                expect($location.url()).toEqual(badUrl);
            });
        });*/
});
