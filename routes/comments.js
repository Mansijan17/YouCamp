var express = require('express');
var router = express.Router();
var Campground = require('../models/campgrounds');
var Comment = require('../models/comments');
var middleWare = require('../middleware/index.js');
router.get('/campgrounds/:id/comments/new', middleWare.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });

});

router.post("/campgrounds/:id/comments", middleWare.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            req.flash("error","OOPS!!! Something went wrong :-p");
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    //add username to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // save comment
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","You successfully added a comment");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

router.get("/campgrounds/:id/comments/:comment_id/edit", middleWare.checkCommentOwnerShip, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });

});
router.put("/campgrounds/:id/comments/:comment_id",middleWare.checkCommentOwnerShip, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/campgrounds/:id/comments/:comment_id",middleWare.checkCommentOwnerShip, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});



module.exports = router;