(function() {
    'use strict';

    angular
        .module('app.reporting')
        .filter('decimal2comma', decimal2comma);

    function decimal2comma() {
        return filterFilter;

        ////////////////

        function filterFilter(input, decimals) {
            var ret = (input) ? input.toString().replace(".", ",") : null;
            if (ret) {
                var decArr = ret.split(',');
                if (decArr.length === 1) {
                    if (decimals && decimals > 0) {
                        ret += ',';
                        for (var i = 0; i < decimals; i++) {
                            ret += '0';
                        }
                    }
                } else if (decArr.length > 1) {
                    if (decimals && decimals > 0 && decimals > decArr[1].length) {
                        for (var i = 0; i < decimals - decArr[1].length; i++) {
                            ret += '0';
                        }
                    }
                }
            }
            return ret;
        }
    }

})();
