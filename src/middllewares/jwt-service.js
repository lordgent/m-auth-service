const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = "fMg5RIj8uNp2lcXRLFEoyAAD2deMiukbfZt8QMfJBy9Bv57XgqMc3HyUcCvRn4zu";

const generateToken = (userId, role) => {
  const payload = {
    userId: userId,
    role: role,
  };

  const options = {
    expiresIn: '1h', 
  };

  return jwt.sign(payload, JWT_SECRET_KEY, options);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

const authVerify = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      code: 403,
      status: 'ERROR',
      message: 'No token provided',
      data: null,
      error: 'No token provided',
    });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        code: 401,
        status: 'ERROR',
        message: 'Invalid token',
        data: null,
        error: 'Invalid token',
      });
    }

    req.user = decoded;
    next();
  });
};

const extractTokenFromHeader = (req) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) throw new Error('Authorization header missing');

  const token = authHeader.split(' ')[1]; 
  if (!token) throw new Error('Token missing in authorization header');

  return token;
};

module.exports = {
  generateToken,
  verifyToken,
  extractTokenFromHeader,
  authVerify
};
