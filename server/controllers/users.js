import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const register = async (req, res) => {
  const body = req.body;
  const user = new User(body);
  user.password = await bcrypt.hash(user.password, 10);
  try {
    await user.save();
    return res
      .status(201)
      .send({ user, message: 'Account created successfully.' });
  } catch (err) {
    return res.status(422).send({ err, message: 'Username is already taken.' });
  }
};

export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ message: 'Invalid Credentials' });
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid Credentials' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '900000',
  });

  return res
    .status(201)
    .cookie('jwt', token, { httpOnly: true, maxAge: 900000 })
    .json({ user, message: 'Login Success', token });
};

export const verify = async (req, res) => {
  const cookie = req.headers.cookie || '';
  try {
    const token = cookie.split('=')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    res.send({ user });
  } catch (error) {
    return res.status(404).clearCookie('jwt').send(error.message);
  }
};

export const logout = async (req, res) => {
  req.user = null;
  console.log(`after logout = ${req.user}`);
  return res.status(200).clearCookie('jwt').send('Logged out');
};

// export const changeUsername = async (req, res) => {
//   const userId = req.params.userId;
//   const body = req.body;
//   const user = await User.findByIdAndUpdate(
//     userId,
//     {
//       username: body.username,
//     },
//     { new: true }
//   );
//   return res.send({ message: "Success", user });
// };
