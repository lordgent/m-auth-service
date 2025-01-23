const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const auth = require('../middllewares/jwt-service'); 

router.get('/user/me',auth.authVerify, userController.getUserById);

router.post('/auth/signup',userController.registerUser);
router.post('/auth/signin',userController.loginUser);

router.get('/protected-resource', auth.authVerify, (req, res) => {
    res.status(200).json({
      code: 200,
      status: 'OK',
      message: 'Access granted to protected resource',
      data: {
        userId: req.user.userId,
        role: req.user.role, 
      },
      error: null,
    });
  });
module.exports = router;
