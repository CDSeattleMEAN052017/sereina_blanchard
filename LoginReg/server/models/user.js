var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First Name is required'],
        minlength: [2, 'First name must be at least 2 characters']
    },

    last_name: {
        type: String,
        required: [true, 'Last Name is required'],
        minlength: [2, 'Last name must be at least 2 characters']
    },

    password: {
        type: String,
        required: [true, 'Password is required'], 
        minlength: [8, 'Password must be at least 8 characters']
    },

    birthday: {
        type: Date,
        required: [true, 'Please enter a valid birthday']
},

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already in use'],
        uniqueCaseInsensitive: [true, 'Email is already in use'],
        validate: {
          validator: function( value ) {
            return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test( value );
          },
          message: "Email must be valid"
        }
    },

    }, {timestamps: true})

UserSchema.plugin(uniqueValidator);

mongoose.model("User", UserSchema)
