const Post = require("../models/Post");



const addPost = async (req,res) => {
    try {
        const { message } = req.body;
        if(!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required',
            })
        }
        if(!req.userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            })
        }
        const newPost = await Post.query().insert({
            user_id: req.userId,
            message
        });

        res.status(201).json(
            {
                success: true,
                message: 'Post created successfully',
                data: newPost,
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating post', success: false, error});
    }

}


module.exports = {
    addPost,
}