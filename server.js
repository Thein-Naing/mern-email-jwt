const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

//define app.

const app = express();


//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('api/users', userRoutes);
app.use('api/auth', authRoutes);


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
