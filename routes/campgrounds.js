var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");

router.get("/", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: campgrounds});
        }
    });
});
router.get("/new", isLoggenIn, function (req, res) {
    res.render("campgrounds/new");
});

router.post("/", isLoggenIn, function (req, res) {
    var author = {
        id: req.user._id,
        username:req.user.username
    };
    var newCampground  = {
        name: req.body.name,
        image: req.body.image,
        author: author,
        description: req.body.description
    };
    Campground.create(newCampground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            // console.log("NEWLY CREEATED CAMPGROUND");
            console.log(campground);
        }
    });
    res.redirect("/campgrounds");
});

router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: campground });
        }
    });
});
function isLoggenIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;