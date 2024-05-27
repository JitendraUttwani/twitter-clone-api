const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginController = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.query().findOne({
            email
        });
        if(!user){
            return res.status(400).json({
                message: 'User does not exist, please signup',
                success: false
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: 'Incorrect Password',
                success: false
            })
        }
        const payload = {
            userId: user.user_id,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return res.status(200).json({
            success: true,
            message: 'Login Successful',
            data: user,
            token
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error
        })
    }
}
const registerController = async (req,res) => {
    try {
        const {name, username, email, password, bio, location} = req.body;
        if(!name || !username || !password || !bio) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.query().insert({
            name,
            username,
            email,
            password: hashedPassword,
            bio,
            location,
        });
        const payload = {
            userId: newUser.user_id,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({
            message: 'Registration Successful',
            data: newUser,
            token,
            success: true,
        });
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user', success: false, error: error});
    }
}

const checkEmail = async (req, res) => {
    try {
    const { email } = req.body;
    console.log(email);
    console.log(typeof email);
    if(!email){
        return res.status(400).json({
            success: false,
            message: 'Email is required',
        });
    }
      const user = await User.query().findOne({ email });
      if (user) {
        res.status(200).json({ success: false, message: "User already exists", data: true});
      } else {
        res.status(200).json({ success: true, message: 'You can continue with signup', data: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error: error});
    }
}
const checkUsername = async (req, res) => {
    try {
        const { username } = req.body;
        if(!username){
            return res.status(400).json({
                success: false,
                message: 'username is required',
            });
        }
          const user = await User.query().findOne({ username });
          if (user) {
            res.status(200).json({ success: false, message: "Username already taken", data: true});
          } else {
            res.status(200).json({ success: true, message: 'You can continue with signup', data: false });
          }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error', error: error });
    }
  };
  


module.exports = {
    loginController,
    registerController,
    checkEmail,
    checkUsername
}
