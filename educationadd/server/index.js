const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const app = express();
const port =  5000;

app.use(cors());
app.use(bodyParser.json());

const dbURI = 'mongodb+srv://gokulkannan:gokulkannan@model.tumsyii.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

//secret key
  const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secretKey);



  //student register
const Userschema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  mobile:Number,
  
});

const Users = mongoose.model('Users', Userschema);

app.post('/register', async (req, res) => {
  const { username, email, password,mobile} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
      mobile,
      
    });

    await newUser.save();
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts from this IP. Please try again later.',
});

app.use('/login', limiter);

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//admin register
const AdminUserschema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  mobile:Number,
  
});

const AdminUsers = mongoose.model('AdminUsers', AdminUserschema);

app.post('/adminregister', async (req, res) => {
  const { username, email, password,mobile} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AdminUsers({
      username,
      email,
      password: hashedPassword,
      mobile,
      
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, secretKey, {
      expiresIn: '50h', // Set the expiration time as needed
    });
    res.json({ success: true,token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const limiters = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts from this IP. Please try again later.',
});

app.use('/adminlogin', limiters);

app.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AdminUsers.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: '5h', // Set the expiration time as needed
    });
    res.status(200).json({ message: 'Login successful' ,token});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const EducationSchema = new mongoose.Schema({
  university: String,
  degree: String,
  fieldOfStudy: String,
  grade: String,
  activities: String,
  startYear: String,
  endYear: String,
  description: String
});

const Education = mongoose.model('Education', EducationSchema);

app.post('/education', async (req, res) => {
  try {
    const { university, degree, fieldOfStudy, grade, activities, startYear, endYear, description } = req.body.education;
    const newEducation = new Education({ university, degree, fieldOfStudy, grade, activities, startYear, endYear, description });
    await newEducation.save();
    res.json({ message: 'Education data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/education', async (req, res) => {
  try {
    const educationData = await Education.findOne(); // You might need to adjust this based on your specific needs
    res.status(200).json(educationData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching education data', error: error.message });
  }
});
///////////////////////////////skills 
const skillSchema = new mongoose.Schema({
  name: String,
});

const Skill = mongoose.model('Skill', skillSchema);



// Define a route to store a skill
app.post('/skills', async (req, res) => {
  try {
    const { name } = req.body;
    const newSkill = new Skill({ name });
    await newSkill.save();
    res.status(201).json({ message: 'Skill saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving skill', error: error.message });
  }
});
app.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
});


///////////////////////////////experiance
const experienceSchema = new mongoose.Schema({
  experience: String,
});

const Experience = mongoose.model('Experience', experienceSchema);

// Define a route to add a new experience
app.post('/experiences', async (req, res) => {
  try {
    const { experience } = req.body;
    const newExperience = new Experience({experience});
    await newExperience.save();
    res.status(201).json({ message: 'Experience added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding experience', error: error.message });
  }
});

app.get('/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences', error: error.message });
  }
});
// //verify token
// app.post('/verifyToken', (req, res) => {
//   const { token } = req.body;

//   if (!token) {
//     return res.status(400).json({ success: false, message: 'Token is missing' });
//   }

//   try {
//     const decodedToken = jwt.verify(token, secretKey); // Replace with your actual secret key
    
//     const user = {
//       _id: decodedToken.userId, // Assuming userId is in the payload
//       username: 'exampleUser',
//       email: 'user@example.com',
//       mobile: '1234567890',
//     };
// console.log(user)
//     res.json({ success: true, user });
//   } catch (error) {
//     console.error('Token verification error:', error);
//     res.status(401).json({ success: false, message: 'Invalid token' });
//   }
// });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
