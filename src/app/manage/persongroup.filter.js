(function() {
    'use strict';

    angular
        .module('app.manage')
        .filter('personGroup', personGroup);

    function personGroup(_) {
        return filterFilter;

        ////////////////

        function filterFilter(persons, personGroup) {
            return persons.filter(function(person) {
                if (person.lastName) {
                    if (person.lastName.charAt(0).toUpperCase() == personGroup.name.toUpperCase()) {
                        return person;
                    }
                }
            });
        }
    }

})();
