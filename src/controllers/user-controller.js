const User = require('../../models/users');
const bcrypt = require('bcrypt');
const jwtService = require('../middllewares/jwt-service')

const getUserById = async (req, res) => {

  try {
    const { userId } = req.user;
    const user = await User.findByPk(userId);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token' });
    }

    res.status(500).json({ error: 'Something went wrong' });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: 'ERROR',
        message: 'User not found',
        data: null,
        error: 'User not found',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        code: 401,
        status: 'ERROR',
        message: 'Invalid password',
        data: null,
        error: 'Invalid password',
      });
    }

    const token = jwtService.generateToken(user.id, user.role);

    res.status(200).json({
      code: 200,
      status: 'OK',
      message: 'Login successful',
      data: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token, 
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: 'ERROR',
      message: 'Internal server error',
      data: null,
      error: error.message,
    });
  }
};


const registerUser = async (req, res) => {
  const { fullName, email, phoneNumber, profileIcon, password } = req.body;

  try {

    const find = await User.findOne({ where: { email } });

    if (find != null) {
      return res.status(400).json({
        code: 400,
        status: 'ERROR',
        message: 'email already used',
        data: null,
        error: 'email already used',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      profileIcon,
      hashedPassword
    });


    res.status(200).json({
      code: 200,
      status: 'OK',
      message: 'success',
      data: {
        fullName: user.fullName,
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      code: 400,
      status: 'ERROR',
      message: error.message,
      data: null,
      error: error.message,
    });
  }
};




module.exports = {
  getUserById,
  registerUser,
  loginUser
};
