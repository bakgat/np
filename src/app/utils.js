function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function percent(raw, max, decimals) {
    if (!decimals) {
        decimals = 2;
    }
    return round((raw / max) * 100, decimals);
}

function median(arr) {
    var arrResults = arr;
    arrResults.sort(function(a, b) {
        return a - b;
    });

    var half = Math.floor(arrResults.length / 2);
    var median = 0;
    if (arrResults.length % 2)
        median = arrResults[half];
    else
        median = (arrResults[half - 1] + arrResults[half]) / 2.0;

    return median;
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}