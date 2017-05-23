var Users = require('../controllers/loginreg.js')
var mongoose = require('mongoose');
// var User = mongoose.model("User");

module.exports = function(app){
    app.get('/', function(req, res) {
        console.log('inside index')
        Users.index(req, res)
    })

    app.post("/add_user", Users.add)
    app.post("/login_user", Users.login)
}