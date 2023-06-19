// import mongoose database.
const mongoose = require('mongoose');

// import jwt/joi/joi-password-complexity
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('jsonwebtoken');


// create User schema. It is an object and you have to define it.
//We have created user table with name, email and password.

const User = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
});

//define method for authenticate user using schema.
//also with JWT, we generate token with payload of user id.

User.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATE_KEY, {expiresIn: '7d'})
  return token
};

//With Joi, we gonna validate data.

const validate = (data) => {
  const schema = Joi.object({
      firstName: Joi.string().required().label('First Name'),
      lastName: Joi.string().required().label('Last Name'),
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().passwordComplexity().required().label('Password')
  });
  return schema.validate(data);
};


// export to controllers.

module.exports = mongoose.model('User', User)
