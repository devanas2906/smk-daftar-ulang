const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

const hashPassword = async (password) => await argon2.hash(password);
const verifyPassword = async (hashedPassword, password) => await argon2.verify(hashedPassword, password);

const generateToken = ({ _id, role }) => jwt.sign({ id: _id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
const validateToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = { hashPassword, verifyPassword, generateToken, validateToken };