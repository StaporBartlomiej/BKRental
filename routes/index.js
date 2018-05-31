var express = require('express');
var router = express.Router();
// var mysql = require('mysql');
var DateDiff = require('date-diff');
var model = require('../models/index');


// var db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '11111111',
//     database: 'pai_group_project'
//
// });
// db.connect();


// router.get('/', function(req, res, next) {
//
//     model.BKRental.findAll({})
//         .then(index => res.json({
//         error: false,
//         data: index
//     }))
//     .catch(error => res.json({
//         error: true,
//         data: [],
//         error: error
//     }));
//
//     // res.render('index', { title: 'Home' });
// });

router.post('/', function (req, res, next) {
   const {
       title,
       description
   } = req.body;
   model.BKRental.create({
       title: title,
       description: description
   })
       .then(bkrental => res.status(201).json({
       error: false,
       data: bkrental,
       message: 'New bkrental has been created'
   }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
});
//
// router.get('/flota', function (req,res) {
//     var query = "select * from cars order by cost_class;";
//
//     // res.render('index', { title: 'Express'});t
//     db.query(query, function(error, dane) {
//         console.log(dane[0].car_name);
//         res.render('flota', {title: 'Express', dane: dane});
//     });
//     // res.render('index2', {title: 'flota'});
//
// });


// router.get('/admin', function (req,res) {
//     res.render('admin', {title: "Admin Panel"});

// });
// router.get('/confirm', function (req,res) {
//     var get_unapproved_query = "select id_card_number from reservations where is_approved_by_admin='0';";
//     db.query(get_unapproved_query,function (err, data) {
//         var full_name = data[0].consumer_name + data[0].consumer_surname;
//        res.render('confirm', {data: data, select_customer_to_approve: req.body.select_customer_to_approve})
//     });
// });
//
// router.get('/edit', function (req,res) {
//     var query = "select id_card_number from reservations;";
//     db.query(query,function (err, data) {
//         var full_name = data[0].consumer_name + data[0].consumer_surname;
//         res.render('edit', {data: data, select_customer_to_edit: req.body.select_customer_to_edit})
//     });
//
// });
//
// router.post('/editResult', function (req,res) {
//
//     console.log("select_customer_to_edit = " + req.body.select_customer_to_edit);
//     res.render('editResult', {title: "Edit Result2",select_customer_to_edit: req.body.select_customer_to_edit});
//
//
// });
//
// router.post('/editResult2', function (req,res) {
//     var book_in_place = req.body.book_in_place;
//     var book_in_date = req.body.book_in_date;
//     var book_in_time = req.body.book_in_time;
//     var book_out_place = req.body.book_out_place;
//     var book_out_date = req.body.book_out_date;
//     var book_out_time = req.body.book_out_time;
//     var chosen_car = req.body.edit_chosen_car;
//     var id_card_number = req.body.id_card_number_edit_result2_view;
//     var price;
//
//     var book_in_date_converted_to_js_format = new Date(book_in_date);
//     var book_out_date_converted_to_js_format = new Date(book_out_date);
//     var car_price_query = "Select price_per_day from cars where car_name='" + chosen_car + "';";
//     console.log("price query= " + car_price_query);
//     console.log("id_card_number= " + id_card_number);
//     console.log("book out place= " + book_out_place);
//
//     var total_days_car_is_rented = new DateDiff(book_out_date_converted_to_js_format, book_in_date_converted_to_js_format);
//
//
//     db.query(car_price_query,function (error,result) {
//
//         price = result[0].price_per_day;
//         var total_price = price * total_days_car_is_rented.days();
//
//
//         var insert_query = "update reservations set book_in_date='" + book_in_date + "', book_out_date='" + book_out_date + "', total_price=" + total_price +
//             ", book_in_time='" + book_in_time + "', book_out_time='" + book_out_time + "',book_in_place='" + book_in_place + "', book_out_place='" + book_out_place
//             + "' where id_card_number='" + id_card_number + "';";
//         console.log("query= " + insert_query);
//         db.query(insert_query,function (error, result) {
//
//         })
//     });
//
//     res.render('editResult2', {title: "Edit Result 2"});
//
//
// });
//
// router.post('/confirmResult', function (req,res) {
//     var select_customer_to_approve = req.body.select_customer_to_approve;
//     var query = "update reservations set is_approved_by_admin=1 where id_card_number='" + select_customer_to_approve + "';";
//
//     db.query(query,function (err, data) {
//         res.render('confirmResult', {title: "Confirmation", select_customer_to_approve: select_customer_to_approve});
//     });
//
//
// });
//
// router.get('/delete', function (req,res) {
//     var get_unapproved_query = "select id_card_number from reservations;";
//     db.query(get_unapproved_query,function (err, data) {
//         var full_name = data[0].consumer_name + data[0].consumer_surname;
//         res.render('delete', {data: data, select_customer_to_delete: req.body.select_customer_to_delete})
//     });
// });
//
// router.post('/deleteResult', function (req,res) {
//     var select_customer_to_delete = req.body.select_customer_to_delete;
//     var query = "delete from reservations where id_card_number='" + select_customer_to_delete + "';";
//     console.log("query:" + query);
//
//     db.query(query,function (err, data) {
//         res.render('deleteResult', {data: data, title: "Deletion", select_customer_to_delete: select_customer_to_delete});
//     });
//
// });
//
//
// router.get('/search', function (req, res) {
//     res.render('search', {tittle: "Search", searched_car: req.body.searched_car});
// });
//
// router.post('/searchResult', function (req, res) {
//
//     var searched_car = req.body.searched_car;
//     var number_of_days = req.body.number_of_days_being_searched_for;
//     var query = "select * from cars where car_name='" + searched_car + "';";
//     console.log("query: " + query);
//     db.query(query, function (err, data) {
//         var price_per_day = data[0].price_per_day;
//         var total_price = price_per_day * number_of_days;
//         console.log("total price:" + total_price);
//         res.render('searchResult', {title: 'Search Result', data: data, total_price: total_price, number_of_days: number_of_days});
//
//     });
//
//
//
// });
//
// router.post('/reserveResult', function (req,res) {
//     var book_in_place = req.body.book_in_place;
//     var book_in_date = req.body.book_in_date;
//     var book_in_time = req.body.book_in_time;
//     var book_out_place = req.body.book_out_place;
//     var book_out_date = req.body.book_out_date;
//     var book_out_time = req.body.book_out_time;
//     var consumer_name = req.body.consumer_name;
//     var consumer_surname = req.body.consumer_surname;
//     var consumer_email = req.body.consumer_email;
//     var consumer_phone = req.body.consumer_phone;
//     var chosen_car = req.body.chosen_car;
//     var id_card_number = req.body.ID_card_number;
//     var price;
//
//     var book_in_date_converted_to_js_format = new Date(book_in_date);
//     var book_out_date_converted_to_js_format = new Date(book_out_date);
//     var car_price_query = "Select price_per_day from cars where car_name='" + chosen_car + "';";
//
//     var total_days_car_is_rented = new DateDiff(book_out_date_converted_to_js_format, book_in_date_converted_to_js_format);
//
//
//     db.query(car_price_query,function (error,result) {
//
//         price = result[0].price_per_day;
//         var total_price = price * total_days_car_is_rented.days();
//
//
//         var insert_query = "Insert into reservations(consumer_name,consumer_surname,id_card_number," +
//             "consumer_email,consumer_phone,book_in_date, book_out_date, total_price,book_in_time, book_out_time, book_in_place, book_out_place) values" +
//             "('" + consumer_name + "', '" + consumer_surname + "', '" + id_card_number + "', '" + consumer_email + "', " + consumer_phone + ", '" +
//             book_in_date + "', '" + book_out_date + "'," + total_price + ",'" + book_in_time + "','" + book_out_time + "','" + book_in_place +
//             "','" + book_out_place + "');";
//         console.log("Query:" + insert_query);
//
//         db.query(insert_query,function (error, result) {
//
//         })
//     });
//
//     res.render('reserveResult', {title: "Reservation Details"});
//
// });
//
//
// router.get('/reserve', function (req,res) {
//
//
//
//
//     res.render('reserve', {title: "Reserve" });  //test: req.body.book_out_place
//
// });
//
// router.get('/display_reservations', function (req,res) {
//
//     var query = "select consumer_name, consumer_surname, id_card_number, consumer_email, consumer_phone, book_in_date," +
//         " book_out_date, total_price, is_approved_by_admin, book_in_place, book_out_place from reservations;";
//     db.query(query, function (err, data) {
//         res.render('display_reservations', {title: "Display of Reservations", data : data})
//     });
//
//
//     // res.render('display_reservations', {title: "Display of Reservations" });  //test: req.body.book_out_place
//
// });

module.exports = router;
