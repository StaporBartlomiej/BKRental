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

router.get('/', function(req, res, next) {

    res.render('index', { title: 'Home' });
});

router.get('/addCar', function (req, res, next) {


})



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
        car_name: 'Kia Pinceto',
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


function insertIntoReservations(userId, carId, bookInDate, bookOutDate, totalPrice, isApprovedByAdmin, bookInPlace, bookOutPlace){
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
        var userId = null;
        insertIntoReservations(userId,car.id, book_in_date,book_out_date, totalPrice, isApprovedByAdmin, book_in_place, book_out_place);
        res.render('reserveResult', {title: "Reservation Details"});
    }})

});

router.get('/reserve', function (req,res) {

    res.render('reserve', {title: "Reserve" });  //test: req.body.book_out_place

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