exports.cookieOptions = {
    "maxAge":60*60*1000*24*7,
    "secure":process.env.NODE_ENV ==='production',
    "httpOnly":true,
    "sameSite":'None'
}