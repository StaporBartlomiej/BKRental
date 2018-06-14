var express = require('express');
var router = express.Router();
var DateDiff = require('date-diff');
var model = require('../models/index');
const user_model = model.sequelize.import("../models/user.js");
const car_type_model = model.sequelize.import("../models/car_type.js");
const reservations_model = model.sequelize.import("../models/reservations.js");
const cars_model = model.sequelize.import("../models/cars.js");


checkConnectionWithDB(model);
// dropTables(user_model,car_type_model,reservations_model, cars_model);
generateTables(user_model,car_type_model,reservations_model,cars_model);
createCars();
insertIntoUser("Bartek","Stapor",24,"AVH431432","test@gmail.com",123456789);

router.get('/', function(req, res, next) {

    res.render('index', { title: 'Home' });
});


function createCars() {
    model.cars.create({
        cost_class: 'A+',
        car_name: 'Mazda 6',
        price_per_day: 95,
        air_conditioning: true,
        number_of_seats: 4,
        engine_type: 'Benzyna',
        bluetooth: false,
        img_link: '/images/mazda_6.png',
        available: true,
        transmission: "Manualna"
    }).then(task => {
        console.log(task.get({
        plain: true
    }))
})

    model.cars.create({
        cost_class: 'A+',
        car_name: 'Kia Picanto',
        price_per_day: 95,
        air_conditioning: true,
        number_of_seats: 4,
        engine_type: 'Diesel',
        bluetooth: false,
        img_link: '/images/kia_pinceto.png',
        available: true,
        transmission: "Automat"
    }).then(task => {
        console.log(task.get({
        plain: true
    }))
})
};

router.get('/flota', function (req, res) {

    cars_model.findAll().then(cars => {

        console.log(cars);
    res.render('flota', {title: 'flota', cars: cars});
});
});


function insertIntoReservations(userId, carId, bookInDate, bookOutDate, totalPrice, isApprovedByAdmin, bookInPlace, bookOutPlace) {
    reservations_model.create({
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

function insertIntoUser(firstName, lastName, age, idCardNumber, email, phone){
    user_model.create({
        firstName: firstName,
        lastName: lastName,
        age: age,
        idCardNumber: idCardNumber,
        email: email,
        phone: phone
    }).then(task => {
        console.log((task.get({
        plain: true
    })))
});
};

router.post('/reserveResult', function (req,res) {
    var book_in_place = req.body.book_in_place;
    var book_in_date = req.body.book_in_date;
    var book_out_place = req.body.book_out_place;
    var book_out_date = req.body.book_out_date;
    var chosen_car = req.body.chosen_car;
    var book_in_date_converted_to_js_format = new Date(book_in_date);
    var book_out_date_converted_to_js_format = new Date(book_out_date);
    var isApprovedByAdmin = false;

    cars_model.findOne({
        where: {
            car_name: chosen_car,
            available: 1
        },
        attributes: ['id','price_per_day']
    }).then( car => {
        if(car == null){
        {
            var msg = "Wybrane auto nie jest dostepne. Prosze wybierz inne.";
            res.render('error', {title: "Reservation Error", msg: msg});
        }
    }
    else {
        console.log("Chosen car price per day: " + car.price_per_day);
        var totalDaysCarIsRented = new DateDiff(book_out_date_converted_to_js_format, book_in_date_converted_to_js_format).days();
        var totalPrice = car.price_per_day * totalDaysCarIsRented;
        console.log("Price per day: " + car.price_per_day);
        console.log("Total days car is rented: " + totalDaysCarIsRented);
        console.log("Total price: " + totalPrice);
        // @TODO User ID get from session and insert below to var userid
        var userId = 1;
        insertIntoReservations(userId,car.id, book_in_date,book_out_date, totalPrice, isApprovedByAdmin, book_in_place, book_out_place);
        var query = "UPDATE cars SET available = 0 WHERE id = ";
        model.sequelize.query(query + car.id);
        res.render('reserveResult', {title: "Reservation Details"});
    }})

});



router.get('/reserve', function (req,res) {

    res.render('reserve', {title: "Reserve" });  //test: req.body.book_out_place

});

router.get('/displayMyReservations', function (req, res) {

    // @TODO get user Id from session so it will display only reservations that belongs to him
    var userId = 1;
    reservations_model.findAll({
        where: {
            userId: userId
        }
    }).then(reservation => {
        if(reservation == null){
            var msg = "Użytkownik nie ma żadnych rezerwacji.";
            res.render('error', {title: "Error", msg: msg});
    }
    else{
            console.log("Reservations: " + reservation);
            res.render('displayMyReservations', {title: "My Reservations", reservation: reservation});
    }
    });


    // res.render('cancelReservation',{title: "Cancel Reservation", id: id})
});

router.get('/cancelReservation', function (req,res) {

    console.log("start");
    // @TODO get user Id from session so it will display only reservations that belongs to him
    var userId = 1;
    reservations_model.findAll({
        where: {
            userId: userId
        }
    }).then(reservation => {
        console.log("in findall before if");
        if(reservation == null){
            console.log("in if");
        var msg = "Użytkownik nie ma żadnych rezerwacji.";
        res.render('error', {title: "Error", msg: msg});
    }
    else{
            console.log("in else");
        console.log("Reservations: " + reservation);
        res.render('cancelReservation', {title: "Cancel Reservation", reservation: reservation});
    }
});
});


router.post('/cancelReservationResult',function (req, res) {
    var chosen_reservation = req.body.chosen_reservation;
    reservations_model.findAll({
        where: {
            id: chosen_reservation
        }
    }).then(reservation => {
        if(reservation == null){
        var msg = "Chosen reservation does not exist! Please choose other one.";
        res.render('error', {title: "Error", msg: msg});
    }
    else {
        var query = "DELETE FROM reservations WHERE id = ";
        model.sequelize.query(query + chosen_reservation);
        res.render('cancelReservationResult', {title: "Cancel Reservation Info"});
    }
});

    // res.render('reserve', {title: "Reserve" });  //test: req.body.book_out_place

    });



function checkConnectionWithDB(model){
    model.sequelize.authenticate()
        .then(() => {
            console.log('connected to DB');
        });
}

function dropTables(user_model,car_type_model,reservations_model, cars_model){
    user_model.drop();
    car_type_model.drop();
    cars_model.drop();
    reservations_model.drop();
}

function generateTables(user_model,car_type_model,reservations_model,cars_model){
    cars_model.sync();
    car_type_model.sync();
    user_model.sync();
    reservations_model.sync();
}

module.exports = router;