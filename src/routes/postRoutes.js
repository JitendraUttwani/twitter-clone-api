const router = require('express').Router();

const { likeAPost, unLikeAPost } = require('../controllers/likesController');
const { addPost } = require('../controllers/postController');


router.post('/', addPost);
router.post('/:postId/like',likeAPost);
router.delete('/:postId/unlike', unLikeAPost);


module.exports = router;