const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { createUser, getUserByEmail } = require('../models/userModel');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  if (!['Admin', 'Artist', 'Viewer'].includes(role)) return res.status(400).json({ error: 'Invalid role' });

  const existing = getUserByEmail(email);
  if (existing) return res.status(409).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), email, password: hashedPassword, role };
  createUser(newUser);
  res.status(201).json({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};
