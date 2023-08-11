const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'IamSendingASignature';


//Create a User using: POST "/api/auth/createuser"  (Doesn't require Authentication)
//inside the [] write the things that need to be validated
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
      }

      //securing the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })

      //after creating account we get the user id from the db
      const data = {
        user:{
          id: user.id
        }
      }
      //for the token we are using the id and the secret signature
      const authtoken = jwt.sign(data, JWT_SECRET);
      
  
      // res.json(user)
      res.json({authtoken})
      
      //if there is any problem into the above code then error will show
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  })    



// Authenticate a User using: POST "/api/auth/login". (No login required)
router.post('/login', [ 
    body('email', 'Enter a valid email').isEmail(), 
    body('password', 'Password cannot be blank').exists(), 
  ], async (req, res) => {
  
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }
  
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({authtoken})
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

  
module.exports = router





//for validation: npm install --save express-validator
//for changing the pass: npm i bcryptjs
//json token: npm i jsonwebtoken