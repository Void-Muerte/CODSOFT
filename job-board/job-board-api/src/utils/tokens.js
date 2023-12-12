const jwt = require('jsonwebtoken');
const accessKey = process.env.ACCESS_TOKEN;
const refreshKey = process.env.REFRESHER_TOKEN;

exports.getTokens = (user)=>{
    const accessToken = jwt.sign({id:user._id, role:user.role}, accessKey, {expiresIn:'5m'});
    const refreshToken = jwt.sign({id:user._id, role:user.role}, refreshKey, {expiresIn:'7d'});
    return {accessToken, refreshToken}
}
/**
 * @returns {{accessKey:String; refreshKey:String}}
 */
exports.secretKeys =()=>{accessKey, refreshKey};