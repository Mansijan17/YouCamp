var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);

// AIzaSyAke5zkBjujyiMnszXdC31igw7mNTaFQ8Y google_api_key