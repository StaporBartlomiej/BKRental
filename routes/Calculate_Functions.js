function convertSqlDateToJavascriptDate(dateToConvert) {
    return new Date(dateToConvert);
}

function calculateDiffBetweenDates(bookInDate, bookOutDate){
    return new DateDiff(bookInDate, bookOutDate);
}

function calculateRentalCost(bookInDate, bookOutDate, carPricePerDay) {
    var convertedBookInDate = convertSqlDateToJavascriptDate(bookInDate);
    var convertedBookOutDate = convertSqlDateToJavascriptDate(bookOutDate);
    var date = calculateDiffBetweenDates(convertedBookInDate,convertedBookOutDate);
    return carPricePerDay * date.days;

}
