(function() {
    'use strict';

    angular
        .module('triangular.directives')
        .directive('enterAsTab', enterAsTab);

    /* @ngInject */
    function enterAsTab() {
        var directive = {
            link: link,
            restrict: 'A'
        }

        return directive;
        ///////////////////

        function link($scope, $element, attrs) {
            $element.on('keydown keypress', function(event) {
                if (event.which === 13) {
                    event.preventDefault();
                    var fields = $(this).parents('form:eq(0),body').find('input, textarea, select');
                    var index = fields.index(this);
                    if (index > -1 && (index + 1) < fields.length)
                        fields.eq(index + 1).focus();
                }
            });
        }
    }
})();
