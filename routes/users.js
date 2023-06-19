// // create router.
// const router = require('express').Router();

// //import User , validate from model.
// const { User, validate} = require('../models/User');

// // import bcrypt.
// const bcrypt = require('bcrypt');

// router.post('/', async(req, res) => {
//   try {
//     const {error} = validate(req.body);
//     if (error) return res.status(400).send({mssg:error.details[0].message});
//     const user = await User.findOne({email: req.body.email});

//     if (!user)
//     return
//     res.status(401).send({mssg:"Invalid Email or Password"})
//     // if (user)
//     // return res.status(409).send({mssg:"User with given email already existed"})
//     const validPassword =
//      await bcrypt.compare(
//       req.body.password, user.password
//      );
//      if(!validPassword)
//      return
//      res.status(401).send({mssg:"Invalid Email or Password"})

//     const token = user.generateAuthToken();
//     res.status(200).send({data: token, mssg:"Logged in successfully"});


//   } catch (error) {
//     res.status(500).send({message:"Internal Server Error"})
//   }

// })




// module.exports = router;


const router = require("express").Router();
const { User, validate } = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
