const router = require('express').Router();

const { addPost } = require('../controllers/postController');


router.post('/', addPost);


module.exports = router;