describe('dashboards', function() {

    var scope, AnalyticsController;

    beforeEach(module('app'));
    beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();

            AnalyticsController = $controller('AnalyticsController', {
                '$scope': scope,
            });
        }));
        it('should have the testData', function() {
            expect(AnalyticsController.testData).toBeDefined();
            expect(AnalyticsController.testData[0]).toBe('triangular');
        });
});
