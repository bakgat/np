(function() {
    'use strict';

    angular
        .module('app.reporting')
        .config(moduleConfig);

    function moduleConfig($provide) {
        /***
        * Setup Editor Toolbar here
        ***/
        $provide.decorator('taOptions', ['taRegisterTool', 'taTranslations', '$delegate', function(taRegisterTool, taTranslations, taOptions){
            taOptions.forceTextAngularSanitize = true; 
            
            taOptions.toolbar = [['bold', 'italics', 'underline']];

            taOptions.classes = {
                focussed: 'focussed',
                toolbar: 'editor-toolbar',
                toolbarGroup: 'editor-group',
                toolbarButton: 'md-button',
                toolbarButtonActive: '',
                disabled: '',
                textEditor: 'form-control',
                htmlEditor: 'form-control'
            };
            return taOptions;
        }]);

        $provide.decorator('taTools', ['$delegate', function(taTools){
            taTools.bold.iconclass = 'zmdi zmdi-format-bold';
            taTools.italics.iconclass = 'zmdi zmdi-format-italic';
            taTools.underline.iconclass = 'zmdi zmdi-format-underlined';
            return taTools;
        }]);
    }
})();