(function() {
    'use strict';

    angular
        .module('app.global')
        .factory('DiffService', DiffService);

    var redicodi = [{
        "id": "B",
        "name": "basis",
        "icon": "notos notos-basic"
    }, {
        "id": "C",
        "name": "uitdaging",
        "icon": "notos notos-challenge"
    }, {
        "id": "S",
        "name": "ondersteuning",
        "icon": "notos notos-support"
    }, {
        "id": "T",
        "name": "hulpmiddelen",
        "icon": "notos notos-tools"
    }, {
        "id": "P",
        "name": "filosofie",
        "icon": "notos notos-lamp"
    }, {
        "id": "SF",
        "name": "zonnebloemklas",
        "icon": "notos notos-sunflower"
    }, {
        "id": "MSF",
        "name": "mini-zonnebloemklas",
        "icon": "notos notos-mini-sunflower"
    }, {
        "id": "BEE",
        "name": "bijtjesklas",
        "icon": "notos notos-bee"
    }, {
        "id": "M",
        "name": "rekenmonster",
        "icon": "notos notos-monster"
    }, {
        "id": "BF",
        "name": "vlinderklas",
        "icon": "notos notos-butterfly"
    }, {
        "id": "RT",
        "name": "leestrein",
        "icon": "notos notos-abc-train"
    }, {
        "id": "MT",
        "name": "rekentrein",
        "icon": "notos notos-math-train"
    }, {
        "id": "TGR",
        "name": "rekentijger",
        "icon": "notos notos-tiger"
    }, {
        "id": "IAC",
        "name": "individuele leerlijn",
        "icon": "notos notos-iac"
    }];
    /* @ngInject */
    function DiffService($q, $http, _) {

        var service = {
            getModules: getModules,
            toLabel: toLabel
        };

        return service;

        ///////////////

        function getModules() {
            return redicodi;
        }

        function toLabel(r) {
            var m = _.filter(redicodi, function(module) {
                return module.id == r;
            });
            if (m.length > 0) {
                return m[0].name;
            }
        }

    }



})();
