var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelpcamp");


// SCHEMA
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


// Campground.create({
//     name: "Salmon Creek",
//     image: "http://www.camp-liza.com/wp-content/uploads/2017/10/20170708_093155_HDR-2.jpg",
//     description: "This is a huge Creek full of salmon"
// }, function (err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("NEWLY CREEATED CAMPGROUND");
//     }
// });

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { campgrounds: campgrounds });
        }
    });
});

app.get("/campgrounds/new", function (req, res) {
    res.render("new");
});

app.post("/campgrounds", function (req, res) {
    Campground.create({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    }, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("NEWLY CREEATED CAMPGROUND");
        }
    });
    res.redirect("/campgrounds");
});

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", { campground: campground });
        }
    });
})

app.listen(3000, function () {
    console.log("Server started");
});