const User = require("../models/User");


const checkUserExists = async (followeeId) => {
    const findUser = await User.query().findById(followeeId);
    if(findUser === undefined) return false;
    return true;
}

module.exports = {
    checkUserExists,
}