const Like = require("../models/Like");

const likeAPost = async (req, res) => {
    try {
        const {postId} = req.params;
        const userId = req.userId;
        const like = await Like.query().insert({
            user_id: parseInt(userId),
            post_id: parseInt(postId),
            created_at: new Date().toISOString()
        });
        res.status(201).json({success: true, message: "Successfully liked a post", data: like});
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "Can't like the post", error: error.message });
    }
  }


const unLikeAPost = async (req, res) => {  
    try {
      const {postId} = req.params;
      const userId = req.userId;
      const unliked = await Like.query().delete().where({ user_id: parseInt(userId), post_id: parseInt(postId) });
      res.status(200).json({
        success: true,
        message: "Successfully unliked a post",
        data: unliked,
      });
    } catch (error) {
        console.error(error);
      res.status(400).json({ success: false, message: 'Cant unlike the post', error: error.message });
    }
  }


// const getAllLikedPosts = async (req, res) => {
//     const { user_id } = req.params;
  
//     try {
//       const likedPosts = await Like.query()
//         .where('user_id', user_id)
//         .withGraphFetched('post');
//       res.status(200).json(likedPosts);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   }


module.exports = {
    likeAPost,
    unLikeAPost,
}