const revokedTokens = [];



const blacklistToken = (token) => {
    // console.log(token);
    revokedTokens.push(token);
    // console.log(revokedTokens);
}


const checkTokenValidity = (token) => {
    return revokedTokens.indexOf(token) > -1;
}


// console.log(revokedTokens);

module.exports = {
    blacklistToken,
    checkTokenValidity,
}