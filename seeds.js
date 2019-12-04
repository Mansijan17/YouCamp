// var mongoose = require("mongoose");
// var Campground = require('./models/campgrounds');
// var Comment = require('./models/comments');
// var data = [
//     {
//         name: 'Clouds Rest',
//         image: 'https://lmnl68e6271girkc1twlft11-wpengine.netdna-ssl.com/wp-content/uploads/2015/06/Camping-In-Tent-Under-Stars.jpg',
//         description: 'This is a master piece'
//     },
//     {
//         name: 'Desert Mesa',
//         image: 'https://indiabookinns.files.wordpress.com/2011/10/river-side-night-camping-www-dandelimasti-com-dandeli-india1152_12993853103-tpfil02aw-828.jpg',
//         description: 'This is a master piece'
//     },
//     {
//         name: 'Canyon Floor',
//         image: 'https://www.webreserv.com/catalog/sagecreekcampgroundswa/images/isolation.jpg',
//         description: 'This is a master piece'
//     }
// ];
//
// function seedDB() {
//     // Remove all campgrounds
//     Campground.remove({}, function (err) {
//         // if (err) {
//         //     console.log(err);
//         // } else {
//         //     console.log("removed all campgrounds");
//         //     data.forEach(function (seed) {
//         //         Campground.create(seed,function (err,campground) {
//         //             if(err){
//         //                 console.log(err);
//         //             } else {
//         //                 console.log("Added new camp");
//         //                 Comment.create({
//         //                     text: 'This is a great place to be at!',
//         //                     author: 'Sanket'
//         //                 }, function (err,comment) {
//         //                     if(err){
//         //                         console.log(err);
//         //                     } else {
//         //                         campground.comments.push(comment);
//         //                         campground.save();
//         //                         console.log("Created a new comment");
//         //                     }
//         //                 });
//         //             }
//         //         });
//         //     });
//         // }
//     });
// }
//
// module.exports = seedDB();
