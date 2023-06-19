# mern-email-jwt
`This is the Login and Singup Email mernstack app using jwt.`

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


mongoose.connect(process.env.MONGO_URI, {

  useNewUrlParser: true,
  
  useUnifiedTopology: true
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


      
