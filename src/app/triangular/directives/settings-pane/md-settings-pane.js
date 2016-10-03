(function() {
    'use strict';

    angular
        .module('triangular.directives')
        .directive('mdSettingsList', mdSettingsList)
        .directive('mdSettingsItem', mdSettingsItem)
        .directive('mdSettingsItemHeader', mdSettingsItemHeader);

    /* @ngInject */
    function mdSettingsList() {
        var directive = {
            restrict: 'E',
            compile: compile
        };
        return directive;
        /////////////////////////

        function compile(element) {
            element[0].setAttribute('role', 'list');

            return {
                post: function(scope, iElem) {
                    scope.active = false;
                    scope.$on('closeItems', function() {
                        iElem.find('.active').removeClass('active');
                    });
                }
            }
        }
    }

    /* @ngInject */
    function mdSettingsItem() {
        var directive = {
            restrict: 'E',
            compile: compile,
            scope: true
        };
        return directive;
        /////////////////////////

        function compile(tElem) {

            tElem[0].setAttribute('role', 'listitem');

            return {
                post: function(scope, iElem) {
                    scope.active = false;
                    scope.$on('toggleItem', function(event, element) {
                        var active = element.parent().hasClass('active');
                        iElem.parent().find('.active').removeClass('active');
                        if (!active) {
                            element.parent().addClass('active');
                        }
                    });
                }
            }
        }
    }

    /* @ngInject */
    function mdSettingsItemHeader() {
        var directive = {
            restrict: 'E',
            link: link
        };
        return directive;
        //////////////////////

        function link(scope, iElem, iAttrs) {
            iElem.on('click', function() {
                if (!(iElem.hasClass('readonly') || iElem.parent().hasClass('readonly'))) { 
                    scope.$emit('toggleItem', iElem);
                }
            });
        }
    }

})();
