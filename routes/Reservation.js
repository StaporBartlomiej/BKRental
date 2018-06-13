class Reservation{
    constructor(reservation_model){
    this.reservation_model = reservation_model;
    }


    insertIntoReservation = function(userId, carId, bookInDate, bookOutDate, totalPrice, isApprovedByAdmin, bookInPlace, bookOutPlace) {
        this.reservations_model.create({
            userId: userId,
            carId: carId,
            bookInDate: bookInDate,
            bookOutDate: bookOutDate,
            bookInPlace: bookInPlace,
            bookOutPlace: bookOutPlace,
            totalPrice: totalPrice,
            isApprovedByAdmin: isApprovedByAdmin
        }).then(task => {
            console.log((task.get({
            plain: true
        })))
    });
    }
}