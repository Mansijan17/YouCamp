var express = require("express");

var app = express();

var bodyparser = require("body-parser");

var mongoose = require("mongoose");

var Campground = require('./models/campgrounds');

var Comment = require('./models/comments');

var passport = require('passport');

var localStratergy = require('passport-local');

var User = require('./models/user');

var methodOverride = require('method-override');

var seedDB = require('./seeds');

var flash = require('connect-flash');

mongoose.connect("mongodb+srv://MansiSaxena:Qwerty12@cluster0.7bulo.mongodb.net/YelpDB?retryWrites=true&w=majority",{
    useUnifiedTopology:true,
    useNewUrlParser:true
});


app.use(bodyparser.urlencoded({extended: true})); // To initialize bodyparser

app.set("view engine", "ejs"); // To set the default html embedded enjine to ejs
const path=require("path")
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride("_method"));
app.use(flash());

var campgroundRoutes = require('./routes/campgrounds');
var commentRoutes = require('./routes/comments');
var indexRoutes = require('./routes/index');

// seedDB;

// PassPort config
app.use(require("express-session")({
    secret: 'Ruby on rails is better than node.js',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
// compiling the schema into a model
// Campground.create(
//     {
//         name: "Mansi Saxena",
//         image: "http://s3.amazonaws.com/digitaltrends-uploads-prod/2017/06/camping-tent-1500x1000.png",
//         description: "This is a huge Granite hill, no Bathrooms, no water. Beautiful Granite!"
//     }, function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Newly Created CAMPGROUND");
//         }
//     }
// );

app.use(indexRoutes);
app.use(commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.listen(3000, function () {
    console.log("You Camp Server Has Started on 3000");
});