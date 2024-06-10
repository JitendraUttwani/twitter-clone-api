const router = require('express').Router();
const { loginController, registerController, checkEmail, checkUsername, logoutController } = require('../controllers/authControllers');


router.post('/login', loginController);
router.post('/register', registerController);
router.post('/logout', logoutController);
router.post('/check-email', checkEmail);
router.post('/check-username', checkUsername);

module.exports = router;