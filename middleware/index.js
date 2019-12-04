var middlewareObj = {};
var Campground = require('../models/campgrounds');
var Comment = require('../models/comments');
middlewareObj.checkCampgroundOwnerShip = function (req,res,next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function (err, foundCampground) {
            if(err) {
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }

            }
        });
    } else {
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
};
middlewareObj.checkCommentOwnerShip = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                req.flash("error","OOPS!!! Something went wrong :-p");
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
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
};
middlewareObj.isLoggedIn = function  (req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;