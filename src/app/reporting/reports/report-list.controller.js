(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('ReportListController', ReportListController);

    /* @ngInject */
    function ReportListController(BaseStateService, UserService, _env, $window, $filter, DateRangeService, students, _) {
        var vm = this;

        vm.generateReport = generateReport;
        vm.range = DateRangeService.range();
        vm.queryStudents = queryStudents;
        vm.students = [];
        vm.byGroup = true;

        init();
        //////////////////////////////////////
        function init() {
            BaseStateService.setBaseState('triangular.reporting.reports');
            angular.forEach(students, function(student) {
                var source = 'http://schkt.volglvs.be/PIX/';
                source += student.lastName.removeDiacritics(true).replace(' ', '%20');
                source += student.firstName.removeDiacritics(true).replace(' ', '%20');
                source += $filter('date')(student.birthday, 'dd.MM.yyyy');
                source += '.JPG';

                student.image = source;
            });
        }

        function generateReport() {
            UserService.getActiveGroup().then(function(group) {
                var request = _env.api;
                var query = [];

                request += '/pdf/report';

                if (vm.byGroup) {
                    request += '/group/' + group.id;
                } else {
                    request += '/student';
                    var studIds = _.map(vm.students, function(student) {
                        return student.id;
                    });
                    query.push('id=' + studIds.join(','));
                }

                query.push('qstart=' + vm.range.start.format('YYYY-MM-DD'));
                query.push('qend=' + vm.range.end.format('YYYY-MM-DD'));
                query.push('render=' + vm.content);

                request += '?' + query.join('&');

                $window.open(request, '_blank');
            });
        }

        function queryStudents($query) {
            var lowerQuery = $query.toLowerCase();
            return _.filter(students, function(student) {
                var lowerStudent = student.displayName.toLowerCase();
                return lowerStudent.indexOf(lowerQuery) > -1;
            });
        }
    };
})();
