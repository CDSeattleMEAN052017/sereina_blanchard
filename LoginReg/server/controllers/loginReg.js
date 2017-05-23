var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require('bcrypt');


module.exports = {
    index: function(req, res) {
    },

    add: (req, res) => {
        let new_user = new User(req.body)
        new_user.save()
            .then(() => {res.json(true)})
            .catch(err => {
                console.log("User save error: ", err);
                res.status(500).json(err);
            })
    },

    login: (req, res) => {
        User.findOne({email: req.body.email}, function(err, user) {
            if(err || user === null) {
                    res.status(500).json({'error': "Invalid Login"})
            } else {
                if(req.body.password === user.password) {
                    req.session.id = user._id
                    res.json(true)
                } else {
                    res.status(500).json({'error': "Invalid Login"})
                }
            }
        })
    }


    
}
