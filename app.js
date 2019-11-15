var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Campground = require("./models/campground");
var seedDB = require('./seeds');
var Comment = require('./models/comment');
var passport = require("passport");
var localStrategy = require("passport-local");

var User = require('./models/user');

seedDB();
app.use(require("express-session")({
    secret: "Kek olololololo 123123213",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb://localhost/yelpcamp");

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    });
});

app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
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
            console.log(campground);
        }
    });
    res.redirect("/campgrounds");
});

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: campground });
        }
    });
});


//=======================================
app.get("/campgrounds/:id/comments/new", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function (req, res) {

    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            var comment = req.body.comment;
            Comment.create(comment, function(err, comment){
                if (err){
                    console.log(err);
                    res.redirect("/campgrounds");
                } else {
                    console.log("comment  created");
                    campground.comments.push(comment);
                    campground.save(function(err, campground){
                        if (err){
                            console.log(err);
                        } else {
                            console.log("COMMENT ADDED TO CG")
                        }
                    });
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    });
});
//=======================================



// AUTH ----------------------------------

app.get("/register", function (req, res) {
    res.render("register");
});

app.post("/register", function (req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
       if (err){
           console.log(err);
           res.render("register");
       }
       passport.authenticate("local")(req, res, function () {
           res.redirect("/campgrounds");
       });
    });
});


app.get("/login", function (req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "login"}),function (req, res) {
});

app.listen(3000, function () {
    console.log("Server started");
});