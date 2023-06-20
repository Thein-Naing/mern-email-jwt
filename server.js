const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000
const users = require('./routes/users');
const auth = require('./routes/auth');

//define app.

const app = express();


//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/users', users);
app.use('/api/auth', auth);


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
