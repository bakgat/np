describe('error-page controller', function() {

    var ErrorPageCtrl;
    
    beforeEach(module('app'));
    beforeEach(inject(function($controller, $state) {
        ErrorPageCtrl = $controller('ErrorPageController', {});
        spyOn($state, 'go');
    }));

    it('should go home', inject(function($state){
        ErrorPageCtrl.goHome();
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('triangular.analytics');
    }));

    it('should go to login', inject(function($state) {
        ErrorPageCtrl.goLogin();
        expect($state.go).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('authentication.login');
    }));
});