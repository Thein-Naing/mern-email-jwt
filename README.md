# mern-email-jwt

`This is the Login and Singup Email mernstack app using jwt.`

# Clarification notes.
`express : Express is minimal and flexible Node.js web applicaton framework.`

`mongoose : Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.`

`jsonwebtoken : It's a compact URL of representing claims to be transferred between two parties.`

`bcrypt : It's a password hashing function.`

`joi : Joi is an object schema description language and validator for javascript objects.`

`dotenv : It loads environment variables from a .env file.`


`[1]` npm init -y

`[2]` npm i express cors mongoose dotenv

`[3]` npm i --save-dev nodemon

`[4]`then in sever folder create server.js, .env and in package.json add "start":"nodemon server.js" in script tag. 

`[5]` Then import all dependencies/create express app/ listen requests/ middleware/connect mongoose database/create test routes and test it. 

`[6]` Now server and mongoose database is connected and tested it and working fine. 

const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 4000

//define app.

const app = express();


//middleware

app.use(express.json());

app.use(cors());

//connect mongo database.

mongoose.connect(process.env.MONGO_URI, {

  useNewUrlParser: true, // I don't know this word meaning.
  
  useUnifiedTopology: true // I don't know this word meaning.
  
})
.then((req, res) => {

  console.log('MongoDB is connected')})
  
  .catch((error) => {
  
    console.log(error)
  })

//listen to requests.

app.listen(PORT, ()=> {

  console.log(`Server is connected on port ${PORT}`)
})



`[7]` We have to create models/routes/controllers and first we will create User model. Before we create User model
we will install jwt and related dependencies like that"

npm i jsonwebtoken joi joi-password-complexity "



`[8]` //define method for authenticate user using schema.

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

 //then // export to controllers.

module.exports = mongoose.model('User', User)

`[9]`Then we create users.js in routers folder. 

npm i bcrypt for hashing password.

then we write coding for users in router.
// create router.

const router = require('express').Router();

//import User , validate from model.

const { User, validate} = require('../models/User');

// import bcrypt.

const bcrypt = require('bcrypt');

router.post('/', async(req, res) => {

  try {
    const {error} = validate(req.body);
    
    if (error) return res.status(400).send({mssg:error.details[0].message});
    
    const user = await User.findOne({email: req.body.email});

    if (!user)
    
    return
    
    res.status(401).send({mssg:"Invalid Email or Password"})
    
    // if (user)
    // return res.status(409).send({mssg:"User with given email already existed"})
    
    const validPassword =
    
     await bcrypt.compare(
     
      req.body.password, user.password
     );
     
     if(!validPassword)
     
     return
     
     res.status(401).send({mssg:"Invalid Email or Password"})

    const token = user.generateAuthToken();
    
    res.status(200).send({data: token, mssg:"Logged in successfully"});


  } catch (error) {
  
    res.status(500).send({message:"Internal Server Error"})
  }

})

`[10]` import routes to server.js and  make middleware.

const userRoutes = require('./routes/users');

const authRoutes = require('./routes/auth');

//routes

app.use('api/users', userRoutes);

app.use('api/auth', authRoutes);

`[11]` For more readable code practice, I will split router in Auth.js and users.js.
