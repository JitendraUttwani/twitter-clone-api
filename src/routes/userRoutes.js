const router = require('express').Router();
const { follow, unfollow } = require('../controllers/followController');
const { getTimeline, getSuggestionsToFollow, getUserData, getAllPosts, getAllFollowers, getAllFollowings, getAllLikedPosts } = require('../controllers/userController');


router.get('/timeline', getTimeline);
router.post('/:userId/follow', follow);

router.delete('/:userId/unfollow', unfollow);
router.get('/suggestions', getSuggestionsToFollow);
router.get('/:userId', getUserData);
router.get('/:userId/posts', getAllPosts);
router.get('/:userId/followers', getAllFollowers);
router.get('/:userId/followings', getAllFollowings);
router.get('/:userId/liked-posts', getAllLikedPosts);



module.exports = router;