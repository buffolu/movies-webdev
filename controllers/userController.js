const User = require('../model/user.js');
const path = require('path');

const userController = {
    getMainPage: (req, res) => {
      res.sendFile(path.join(__dirname,'../client/home.html'))
           },

    showRegister: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/login.html'));
    },
    showLogin: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/login.html'));
    },
    register: async (req, res) => {
      const { username, email, password, confirmPassword } = req.body;
  
      if (!username || !email || !password || !confirmPassword) {
          return res.status(400).json({ error: "All fields are required" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: "Email is already registered" });
      }
  
      if (password !== confirmPassword) {
          return res.status(400).json({ error: "Passwords do not match" });
      }
  
      if (username.length < 6 || username.length > 50) {
          return res.status(400).json({ error: "Username must be between 6 and 50 characters" });
      }
  
      if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/)) {
          return res.status(400).json({ error: "Password must contain at least one capital letter, one small letter, and one number" });
      }
  
      if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
          return res.status(400).json({ error: "Invalid email" });
      }
  
      const newUser = new User({ username, email, password, role: 'user' });
      await newUser.save();
      
      res.status(200).json({ success: true, message: "Registration successful" });    
      },
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email,password });
            if (user) {
                res.status(200).json({ username:user.username,userId: user._id });
            } else {
              // If login fails, send error response
              res.status(401).json({ error: "Invalid username or password" });
            }
             
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).send('<h1>Internal Server Error</h1>');
        }
        
    }
};

exports.userController = userController;