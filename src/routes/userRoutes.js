const router = require('express').Router();
const { follow, unfollow } = require('../controllers/followController');
const { getTimeline, getUserDetailsAndPosts, getSuggestionsToFollow, getDetailsAndPosts } = require('../controllers/userController');


router.get('/timeline', getTimeline);
router.get('/profile', getDetailsAndPosts);
router.post('/follow/:id', follow);

router.delete('/unfollow/:id', unfollow);
router.get('/profile/:id', getUserDetailsAndPosts);
router.get('/suggestions', getSuggestionsToFollow);


module.exports = router;