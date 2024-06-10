const Follows = require("../models/Follows");
const Like = require("../models/Like");
const Post = require("../models/Post");
const User = require("../models/User");


const getUserData = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.query().findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Count followers and followings
        const followerCount = await User.relatedQuery('followers').for(userId).resultSize();
        const followingCount = await User.relatedQuery('following').for(userId).resultSize();

        const { password, ...userData } = user;

        res.status(200).json({ 
            success: true, 
            data: { 
                ...userData, 
                followerCount, 
                followingCount 
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.message });
    }
};
const getAllPosts = async (req, res) => {
    const userId = req.params.userId;
    try {
        // const userPosts = await Post.query().where('user_id', userId).orderBy('created_at', 'desc');
        const userPosts = await Post.query()
            .where('user_id', userId)
            .orderBy('created_at', 'desc')
            .select('posts.*')
            .select(
                Post.relatedQuery('likes')
                    .count()
                    .as('likeCount')
            );
        // console.log(userPosts);
        res.status(200).json({ success: true, data: userPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.message });
    }
};

const getAllFollowers = async (req, res) => {
    try {
        const userId = req.params.userId;
        const followers = await Follows.query().select('follower_id').where('followee_id', userId);
        const followerIds = followers.map(follower => follower.follower_id);
        const usersFollowed = await User.query().whereIn('user_id', followerIds);
        res.status(200).json({ success: true, data: usersFollowed });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.message });
    }
};

const getAllFollowings = async (req, res) => {
    const userId = req.params.userId;
    try {
        const followings = await Follows.query().select('followee_id').where('follower_id', userId);
        const followingIds = followings.map(following => following.followee_id);
        const usersFollowing = await User.query().whereIn('user_id', followingIds);
        res.status(200).json({ success: true, data: usersFollowing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.message });
    }
};

const getAllLikedPosts = async (req, res) => {
    const userId = req.params.userId;
    try {
        const liked = await Like.query().select('post_id').where('user_id', userId);
        const likedPostIds = liked.map(like => like.post_id);
        const likedPosts = await Post.query().whereIn('post_id', likedPostIds).select('posts.*')
        .select(
            Post.relatedQuery('likes')
                .count()
                .as('likeCount')
        );
        const newLikedPosts = [];
        for (let post of likedPosts) {
            const user = await User.query().findById(post.user_id);
            newLikedPosts.push({
                ...post,
                user
            });
        }
        res.status(200).json({ success: true, data: newLikedPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.message });
    }
};




const getSuggestionsToFollow = async (req,res) => {
    try {
        const userId = req.userId;
        // console.log(userId);
    
        const followingIds = await User.query().findById(userId).withGraphFetched('following').then(user => user.following.map(f => f.user_id));
    
        const suggestions = await User.query().select('user_id','name','username').whereNotIn('user_id', [userId, ...followingIds]);
    
        return res.status(200).json({
            success: true,
            data: suggestions,
            message: 'Suggestions fetched successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
}


// const getDetailsAndPosts = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const user = await User.query().findById(userId);
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }
//         const userPosts = await Post.query().where('user_id', userId).orderBy('created_at', 'desc');
//         const followers = await Follows.query().select('follower_id').where('followee_id', userId);
//         const followersIds = followers.map((follower) => follower.follower_id);
//         const usersFollowed = await User.query().whereIn('user_id',followersIds);
//         const followings = await Follows.query().select('followee_id').where('follower_id', userId);
//         const followingsIds = followings.map((follower) => follower.followee_id);
//         const usersFollowing = await User.query().whereIn('user_id',followingsIds);
//         const liked = await Like.query().select('post_id').where('user_id', req.userId);
//         const newLiked = liked.map((like) => like.post_id);
//         // console.log(newLiked);
//         const likedPosts = await Post.query().whereIn('post_id',newLiked);
//         const newLikedPosts = [];
//         for(let post of likedPosts){
//             const user = await User.query().findById(post.user_id);
//             newLikedPosts.push({
//                 ...post,
//                 user
//             });
//         }
//         // console.log(liked);
//         // console.log(Array.isArray(liked));

//         // console.log(likedPosts);
//         console.log(user)
//         console.log(userPosts)
//         console.log(usersFollowed)
//         console.log(usersFollowing)
//         console.log(likedPosts)
//         console.log(newLikedPosts)

//         const {password, ...newData} = user;
//         res.status(200).json({
//             success: true,
//             data: {
//                 user: newData,
//                 userPosts,
//                 usersFollowed,
//                 usersFollowing,
//                 likedPosts: newLikedPosts
//             },
//             message: 'User details and posts fetched successfully',
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' , success: false, error});
//     }
// }
// const getUserDetailsAndPosts = async (req, res) => {
//     try {
//         const userId = parseInt(req.params.userId);
//         const user = await User.query().findById(userId);
//         if (!user) return res.status(404).json({ success: false, message: 'User not found' });
//         const userPosts = await Post.query().where('user_id', userId).orderBy('created_at', 'desc');
//         const follows = await Follows.query().select('followee_id').where('follower_id', req.userId).where('followee_id', userId);
//         const followers = await Follows.query().select('follower_id').where('followee_id', userId);
//         const followings = await Follows.query().select('followee_id').where('follower_id', userId);
//         const {password, ...newData} = user;
//         console.log(follows);
//         newData.follows = (follows && follows.length ? true : false);
//         res.status(200).json({
//             success: true,
//             data: {
//                 user: newData,
//                 userPosts,
//                 followers,
//                 followings,
//             },
//             message: 'User details and posts fetched successfully',
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' , success: false, error});
//     }
// }

const getTimeline = async (req,res) => {
    try {
        const userId = req.userId;
        // console.log(userId);
        const followings = await User.query().findById(userId).withGraphFetched('following').then(user => user.following.map((u) => u));
        // console.log(followings);
        const timeline = [];
        for (const followingId of followings) {
            const posts = await Post.query().where('user_id', followingId.user_id).orderBy('created_at', 'desc').select('posts.*')
            .select(
                Post.relatedQuery('likes')
                    .count()
                    .as('likeCount')
            );
            posts.forEach(post => {
                timeline.push({
                    ...post,
                    user: {
                        username: followingId.username,
                        name: followingId.name
                    }
                });
            });
        }
        timeline.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        res.status(200).json({
            message: 'Timeline fetched successfully',
            success: true,
            data: timeline,         
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error',error });
    }
}

module.exports = {
    getSuggestionsToFollow,
    getTimeline,
    getAllFollowers,
    getAllFollowings,
    getAllLikedPosts,
    getUserData,
    getAllPosts
}