const Follows = require("../models/Follows");
const Post = require("../models/Post");
const User = require("../models/User");

const getSuggestionsToFollow = async (req,res) => {
    try {
        const userId = req.userId;
    
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


const getDetailsAndPosts = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.query().findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const userPosts = await Post.query().where('user_id', userId).orderBy('created_at', 'desc');
        const followers = await Follows.query().select('follower_id').where('followee_id', userId);
        const followings = await Follows.query().select('followee_id').where('follower_id', userId);
        const {password, ...newData} = user;
        res.status(200).json({
            success: true,
            data: {
                user: newData,
                userPosts,
                followers,
                followings
            },
            message: 'User details and posts fetched successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' , success: false, error});
    }
}
const getUserDetailsAndPosts = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await User.query().findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const userPosts = await Post.query().where('user_id', userId).orderBy('created_at', 'desc');
        const follows = await Follows.query().select('followee_id').where('follower_id', req.userId).where('followee_id', userId);
        const followers = await Follows.query().select('follower_id').where('followee_id', userId);
        const followings = await Follows.query().select('followee_id').where('follower_id', userId);
        const {password, ...newData} = user;
        console.log(follows);
        newData.follows = (follows && follows.length ? true : false);
        res.status(200).json({
            success: true,
            data: {
                user: newData,
                userPosts,
                followers,
                followings,
            },
            message: 'User details and posts fetched successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' , success: false, error});
    }
}

const getTimeline = async (req,res) => {
    try {
        const userId = req.userId;
        console.log(userId);
        const followings = await User.query().findById(userId).withGraphFetched('following').then(user => user.following.map((u) => u));
        const timeline = [];
        for (const followingId of followings) {
            const posts = await Post.query().where('user_id', followingId.user_id).orderBy('created_at', 'desc');
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
    getUserDetailsAndPosts,
    getTimeline,
    getDetailsAndPosts
}