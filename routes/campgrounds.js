var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campgrounds');
var Comment = require('../models/comments');
var middleWare = require('../middleware/index.js');

router.get("/", function (req, res) {
    // Find all the campgrounds from the DataBase
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})
        }
    });
});

router.post("/", middleWare.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc,author: author};
    // Create a new campground with the database
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    // campgrounds.push(newCampground);

});

// Show form to create new campground
router.get("/new", middleWare.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
});

// Edit Campground
router.get("/:id/edit",function (req, res) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function (err, foundCampground) {
            if(err) {
                req.flash("error","OOPS!!! Something went wrong :-p");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    res.render("campgrounds/edit",{campground: foundCampground});
                } else {
                    req.flash("error","You Don't Have Permissions To Do That");
                    res.redirect("back");
                }

            }
        });
    } else {
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }

});


// Update Campground
router.put("/:id",middleWare.checkCampgroundOwnerShip,function (req,res) {

    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function (err,updatedCampground) {
        if(err){
            req.flash("error","OOPS!! Something Went Wrong. Please Try Again");
            res.redirect("/campgrounds");
        } else {
            req.flash("success","You successfully updated the campground");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
});
// Destroy
router.delete("/:id",middleWare.checkCampgroundOwnerShip,function (req,res) {
    Campground.findByIdAndRemove(req.params.id,function (err) {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;