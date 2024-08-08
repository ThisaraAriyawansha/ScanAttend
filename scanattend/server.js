const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database Connection
mongoose.connect('mongodb://localhost:27017/scanAttendDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});

// User Schema and Model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// Register a new user
app.post('/api/users/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

// Login user
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }
    res.status(200).send('User logged in successfully');
  } catch (err) {
    res.status(500).send('Error logging in user');
  }
});


const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  birthday: { type: Date, required: true },
  grade: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
  profilePic: { type: String, required: true },
  qrCodeData: { type: String, required: true },
  attendanceCount: { type: Number, default: 0 },  // New field
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;


// Register a new student
app.post('/api/students/register', async (req, res) => {
  try {
    const { studentName, birthday, grade, phoneNumber, gender, profilePic, qrCodeData } = req.body;
    const student = new Student({ studentName, birthday, grade, phoneNumber, gender, profilePic, qrCodeData });
    await student.save();
    res.status(201).send('Student registered successfully');
  } catch (err) {
    res.status(500).send('Error registering student');
  }
});


// Update student's attendance count
app.put('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { attendanceCount } = req.body;

    const student = await Student.findByIdAndUpdate(id, { attendanceCount }, { new: true });
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).send('Attendance updated successfully');
  } catch (err) {
    res.status(500).send('Error updating attendance');
  }
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
