describe('utils', function() {
    it('should round to 2 decimals', function() {
        var dec = 1.543;
        expect(round(dec, 2)).toBe(1.54);

        dec = 1.545;
        expect(round(dec, 2)).toBe(1.55);
    });

    it('should calculate percent', function() {
        var raw = 20,
            max = 50,
            decimals = 1;
        expect(percent(raw, max, decimals)).toBe(40);

        raw = 20;
        max = 30;
        expect(percent(raw, max, decimals)).toBe(66.7);
    });

    it('should calculate median of array', function() {
        var results = [10, 20, 30];
        expect(median(results)).toBe(20);

        results.push(40);
        expect(median(results)).toBe(25);
    });

    it('should capitalize first letter', function() {
        expect(String.prototype.capitalizeFirstLetter).toBeDefined();

        expect('dit is een zin.'.capitalizeFirstLetter()).toBe('Dit is een zin.');
    });
});
