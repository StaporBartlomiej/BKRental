var express = require('express');
var router = express.Router();
var DateDiff = require('date-diff');
var model = require('../models/index');
const user_model = model.sequelize.import("../models/user.js");
const car_type_model = model.sequelize.import("../models/car_type.js");
const reservations_model = model.sequelize.import("../models/reservations.js");
const cars_model = model.sequelize.import("../models/cars.js");


checkConnectionWithDB(model);
//dropTables(user_model,car_type_model,reservations_model, cars_model);
generateTables(user_model,car_type_model,reservations_model,cars_model);
createCars();
// insertIntoUser("Bartek","Stapor",24,"AVH431432","test@gmail.com",123456789);

// Check if user is authenticated
var auth = function(req, res, next) {
    if (req.session && req.session.user)
        return next();
    else {
        res.redirect('/login');
    }
};

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

router.get('/', function (req, res) {

    cars_model.findAll().then(cars => {

        if (req.session && req.session.user) {
            res.render('flota', {title: 'flota', cars: cars, logged: req.session.user});
        } else {
            res.render('flota', {title: 'flota', cars: cars});
        }
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

function updateResservation(bookInDate,bookInPlace,bookOutDate, bookOutPlace, carId, reservationId, totalprice) {
    reservations_model.update({
        bookInDate: bookInDate,
        bookInPlace: bookInPlace,
        bookOutDate: bookOutDate,
        bookOutPlace: bookOutPlace,
        carId: carId,
        totalPrice: totalprice
    }, {
        where: {
            id: reservationId
        }
    }
    );
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
    }).then( reservation => {
        if(reservation == null) {
        {
            var msg = "Car you choose is not available. Choose another one.";
            res.render('error', {title: "Reservation Error", msg: msg});
        }
    }
    else {
        console.log("Chosen reservation price per day: " + reservation.price_per_day);
        var totalDaysCarIsRented = new DateDiff(book_out_date_converted_to_js_format, book_in_date_converted_to_js_format).days();
        var totalPrice = reservation.price_per_day * totalDaysCarIsRented;
        console.log("Price per day: " + reservation.price_per_day);
        console.log("Total days reservation is rented: " + totalDaysCarIsRented);
        console.log("Total price: " + totalPrice);
        var userId = req.session.user;
        insertIntoReservations(userId,reservation.id, book_in_date,book_out_date, totalPrice, isApprovedByAdmin, book_in_place, book_out_place);
        var query = "UPDATE cars SET available = 0 WHERE id = ";
        model.sequelize.query(query + reservation.id);
        res.render('reserveResult', {title: "Reservation Details"});
    }})

});


router.get('/reserve', auth, function (req,res) {

    res.render('reserve', {title: "Reserve", logged: req.session.user});  //test: req.body.book_out_place

});

router.get('/displayMyReservations', auth, function (req, res) {

    var userId = req.session.user;
    reservations_model.findAll({
        where: {
            userId: userId
        }
    }).then(reservation => {
        if(reservation == null){
            var msg = "Użytkownik nie ma żadnych rezerwacji.";
            res.render('error', {title: "Error", msg: msg});
        } else {
            console.log("Reservations: " + reservation);
            res.render('displayMyReservations', {title: "My Reservations", reservation: reservation, logged: req.session.user});
        }
    });
});

router.get('/cancelReservation', auth,  function (req,res) {

    console.log("start");
    var userId = req.session.user;
    reservations_model.findAll({
        where: {
            userId: userId
        }
    }).then(reservation => {
        console.log("in findall before if");
        if(reservation == null){
            console.log("in if");
        var msg = "User did not make any reservations.";
        res.render('error', {title: "Error", msg: msg});
        } else {
            console.log("in else");
            console.log("Reservations: " + reservation);
            res.render('cancelReservation', {title: "Cancel Reservation", reservation: reservation, logged: req.session.user});
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
        } else {
            var query = "DELETE FROM reservations WHERE id = ";
            model.sequelize.query(query + chosen_reservation);
            res.render('cancelReservationResult', {title: "Cancel Reservation Info"});
        }
    });
});

router.get('/edit', auth, function (req, res) {
    var userId = req.session.user;
    reservations_model.findAll({
        where: {
            userId: userId
        }
    }).then(reservation => {
        if(reservation == null){
            var msg = "Użytkownik nie ma żadnych rezerwacji.";
            res.render('error', {title: "Error", msg: msg});
        } else {
            console.log("Reservations: " + reservation);
            res.render('edit', {title: "Edit", reservation: reservation, logged: req.session.user});
        }
    });
});

router.post('/editResult', function (req, res) {
    console.log("Res id: " + req.body.reservation_id);
    res.render('editResult', {title: "Edit result 2", reservation_id: req.body.reservation_id})
});

router.post('/editResult2', function (req, res) {

    var book_in_place = req.body.book_in_place;
    var book_in_date = req.body.book_in_date;
    var book_out_place = req.body.book_out_place;
    var book_out_date = req.body.book_out_date;
    var book_in_date_converted_to_js_format = new Date(book_in_date);
    var book_out_date_converted_to_js_format = new Date(book_out_date);

    console.log("ResevationID: " + req.body.reservation_id);
    console.log("ResevationID: " + book_in_date);
    console.log("ResevationID: " + book_out_date);
    console.log("ResevationID: " + book_out_place);
    console.log("ResevationID: " + book_in_place);
    reservations_model.findOne({
        where: {
            id: req.body.reservation_id,
        },
    }).then( reservation => {
        if(reservation == null){
            console.log("Res content: " + reservation);
            var msg = "Wybrane rezerwacja nie istnieje";
            res.render('error', {title: "Reservation Error", msg: msg});

        } else {
            var query = "UPDATE cars SET available = 1 WHERE id = ";
            model.sequelize.query(query + reservation.carId);
            console.log(query);

            cars_model.findOne({
                where: {
                 id: reservation.carId,
                },
                attributes: ['price_per_day']
            }).then( car => {
                if(car == null) {
                    var msg = "Car you choose is not available. Choose another one.";
                    res.render('error', {title: "Reservation Error", msg: msg});
                } else {
                    console.log("Chosen reservation price per day: " + car.price_per_day);
                    var totalDaysCarIsRented = new DateDiff(book_out_date_converted_to_js_format, book_in_date_converted_to_js_format).days();
                    var totalPrice = car.price_per_day * totalDaysCarIsRented;
                    console.log("Price per day: " + car.price_per_day);
                    console.log("Total days reservation is rented: " + totalDaysCarIsRented);
                    console.log("Total price: " + totalPrice);
                    var userId = req.session.user;
                    updateResservation(book_in_date,book_in_place, book_out_date,book_out_place,car.id,req.body.reservation_id,totalPrice);
                    res.render('editResult2', {title: "Edit Result"});
                }})
        }})
});

function checkConnectionWithDB(model) {
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

router.get('/reserve', auth, function (req, res) {
    res.render('reserve', {title: "Reserve", logged: req.session.user});

});

// Handle user login
router.get('/login', function (req, res, next) {
    if (req.session && req.session.user) {
        res.render('user', {logged: req.session.user});
    } else {
        res.render('login');
    }
});

// Handle user auth
router.post('/login', function (req, res) {

    if (req.body.email && req.body.password) {
        user_model.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(function (users) {
            if (users != null) {
                req.session.user = users.id;
                console.log("User [ id=",users.id,"] authenticated");
                res.redirect('/');
            } else {
                res.render('login', {fail: "Incorrect Username or password"});
            }
        });
    } else if (req.body.email) {
        res.render('login', {
            user: req.body.email,
            error: "Enter password."
        });
    } else {
        res.render('login', {
            error: "The username you’ve entered doesn’t match any account."
        })
    }
});

// Handle user logout
router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});


// Handle user registration
router.get('/register', function(req, res) {
    if (req.session && req.session.user) {
        res.render('user', {logged: req.session.user});
    } else {
        res.render('register')
    }

});


// Handle registration auth
router.post('/register', function(req, res) {
    console.log(req.body);

    user_model.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (email) {
        if (email != null) {
            res.send("User exists already");
        } else {
            var user_data = {
                password : req.body.password,
                firstName : req.body.firstname,
                lastName : req.body.lastname,
                email: req.body.email
            };

            var user = new user_model(user_data);
            user.save();
        }
    });
    res.redirect('/login');
});


router.get('/admin', function(req, res) {
    user_model.hasMany(reservations_model, {foreignKey: 'userId'})
    reservations_model.belongsTo(user_model, {foreignKey: 'id'})

    reservations_model.findAll().then(reservation => {
        console.log(reservation);
        res.render('admin', {reservation: reservation});
    });
});

router.post('/admin/update/id=:id', function(req, res) {
    const reservation_id = req.params.id;

    var query = "UPDATE reservations SET isApprovedByAdmin = 1 WHERE id = '" + reservation_id + "'";
    model.sequelize.query(query);
    res.redirect('/admin');

});

router.post('/admin/cancel/id=:id', function(req, res) {
    const reservation_id = req.params.id;

    reservations_model.destroy({
        where: {
            id: reservation_id
        }
    });
    res.redirect('/admin');
});

router.get('/user', auth, function(req, res) {
   res.render('user', {logged: req.session.user});
});

module.exports = router;