'use strict';

describe('manage.config', function() {
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
        $httpBackend.expectGET('http://localhost:4000/groups?active=true').respond(200, {});
        mockTemplate('app/triangular/layouts/states/triangular/triangular.tmpl.html');
        mockTemplate('app/layouts/leftsidenav/leftsidenav.tmpl.html');
        mockTemplate('app/layouts/rightsidenav/rightsidenav.tmpl.html');
        mockTemplate('app/layouts/toolbar/toolbar.tmpl.html');
        mockTemplate('app/layouts/loader/loader.tmpl.html');
    });

    describe('when /students', function() {
        beforeEach(function() {
            mockTemplate('app/manage/layout/toolbar/student.toolbar.tmpl.html');
            mockTemplate('app/manage/students/student-list.tmpl.html');
        });

        it('should return list view ', function() {
            goTo('/manage/students');
            expect($state.current.name).toEqual('triangular.manage.students');
        });
    });


});
