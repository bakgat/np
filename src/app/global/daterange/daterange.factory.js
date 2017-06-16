(function() {
    'use strict';

    angular
        .module('app.global')
        .factory('DateRangeService', DateRangeService);

    /* @ngInject */
    function DateRangeService($q, $timeout, $rootScope, moment) {


        var service = {
            thisWeek: thisWeek,
            thisMonth: thisMonth,
            thisQuarter: thisQuarter,
            thisSemester: thisSemester,
            thisSchoolyear: thisSchoolyear,
            custom: custom,
            range: range
        };

        var range = undefined;

        return service;
        //////////////////////////////

        function range() {
            if(range === undefined) {
                range = thisSemester();
            }
            return range;
        }

        function custom(cr) {
            range = cr;
            return range;
        }

        function thisWeek() {
            range = {
                start: moment().startOf('week'),
                end: moment().endOf('week')
            };
            return range;
        }

        function thisMonth() {
            range = {
                start: moment().startOf('month'),
                end: moment().endOf('month')
            };
            return range;
        }

        function thisQuarter() {
            var now = moment();

            if (now.month() > 7) {
                return quarter(1);
            } else if (now < moment().easter()) {
                return quarter(2);
            } else {
                return quarter(3);
            }
        }

        function thisSemester() {
            var now = moment();

            if(now.month() > 7) {
                return semester(1);
            } else {
                return semester(2);
            }
        }

        function quarter(q) {
            var start, end;
            //q = 1, 2, 3
            if (q == 1) {
                //First schoolQuarter
                start = moment().month(8).startOf('month');
                end = moment().month(11).endOf('month');
            } else if (q == 2) {
                //Second schoolQuarter
                start = moment().startOf('year');
                end = moment().easter();
            } else {
                start = moment().easter();
                end = moment().month(5).endOf('month');
            }
            range = {
                start: start,
                end: end
            };
            return range;
        }

        function semester(q) {
            var start, end;
            //q = 1, 2
            if(q === 1) {
                //First schoolSemester
                start = moment().month(8).startOf('month');
                end = moment().month(11).endOf('month');
            } else {
                //Second schoolSemester
                start = moment().startOf('year');
                end = moment().month(5).endOf('month');
            }
            range =  {
                start: start,
                end: end
            };
            return range;
        }

        function thisSchoolyear() {
            var start, end, now = moment();
            var yearNow = now.year();
            if (now.month() < 8) {
                start = moment().subtract(1, 'year').month(8).startOf('month');
                end = moment().month(7).endOf('month');
            } else {
                start = moment().month(8).startOf('month');
                end = moment().add(1, 'year').month(7).endOf('month');
            }
            range = {
                start: start,
                end: end
            };
            return range;
        }
    }
})();
