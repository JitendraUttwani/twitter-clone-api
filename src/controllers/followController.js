const Follows = require("../models/Follows");
const User = require("../models/User");
const { checkUserExists } = require("../utils/user");

const follow = async (req,res) => {
    try {
        if(!req.params.userId){
            return res.status(400).json({
                success: false,
                message: 'User id is required',
            });
        }
        const followeeId = parseInt(req.params.userId);
        const exists = await checkUserExists(followeeId);
        if(!exists){
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        const insertedRows = await Follows.query().insert({
            follower_id: req.userId,
            followee_id: followeeId
        });
        res.status(201).json({
            success: true,
            data: insertedRows,
            message: 'User followed successfully' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error following user', success: false ,error});
    }
}
const unfollow = async (req,res) => {
    try {
        if(!req.params.userId){
            return res.status(400).json({
                success: false,
                message: 'User id is required',
            });
        }
        const followeeId = parseInt(req.params.userId);
        const exists = await checkUserExists(followeeId);
        if(!exists){
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        const deletedData = await Follows.query().delete().where({
            follower_id: req.userId,
            followee_id: followeeId
        });

        res.status(200).json({ message: 'User unfollowed successfully',success: true, data: deletedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error unfollowing user', success: false, error: error });
    }
}


const getAllFollowers = (req, res) => {

}

module.exports = {
    follow,
    unfollow,
}