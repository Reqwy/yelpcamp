var express = require('express');
var router = express.Router({mergeParams:true});

var Campground = require("../models/campground");
var Comment = require('../models/comment');

router.get("/new", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

router.post("/", isLoggenIn, function (req, res) {

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
                    // console.log("comment  created");
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save(function(err, campground){
                        if (err){
                            console.log(err);
                        } else {
                            // console.log("COMMENT ADDED TO CG")
                        }
                    });
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
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