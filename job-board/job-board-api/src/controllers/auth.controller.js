const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
const { findUserByEmail, createNewUser, findUserById } = require("../services/user.service");
const { createEmployer, findEmployerByEmail, findEmployerById } = require('../services/employer.service');
const { getTokens, secretKeys } = require('../utils/tokens');
const { cookieOptions } = require('../../config/cookieOptions');

exports.registerUser = async(req, res)=>{
    try {
        const {fullname, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createNewUser(fullname, email, hashedPassword);
        if(!user) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Problem encountered!"});
        return res.status(StatusCodes.CREATED).json({created:true});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
    }
}
exports.loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await findUserByEmail(email);
        if(!user) return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Email or password incorrect!"});
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Email or password incorrect!"});
        const {accessToken, refreshToken} = getTokens(user);
        res.cookie('jpc', refreshToken, cookieOptions);
        return res.status(StatusCodes.OK).json({loggedIn:true, accessToken});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
    }
}
exports.refreshUserToken = async(req, res)=>{
    try {
        const jpc = req.cookies.jpc;
        const {refreshKey} = secretKeys();
        const userToken = jwt.verify(jpc, refreshKey)
        if(!userToken) return res.status(StatusCodes.FORBIDDEN).json({msg:"invalid token"});
        const user = await findUserById(userToken.id);
        if(!user) return res.status(StatusCodes.FORBIDDEN).json({msg:"User not found!"});
        const {accessToken}= getTokens(user);
        return res.status(StatusCodes.OK).json({accessToken, refreshed:true});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
    }
}
exports.registerEmployer = async(req, res)=>{
    try {
        const {name, email, location, password, website} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const employer = await createEmployer(name, location, email, hashedPassword, website);
        if(!employer) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Problem encountered!"});
        return res.status(StatusCodes.CREATED).json({created:true});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
    }
}

exports.loginEmployer = async(req, res)=>{
    try {
        const {email, password} = req.body;
        const employer = await findEmployerByEmail(email);
        if(!employer) return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Email or password incorrect!"});
        const match = await bcrypt.compare(password, employer.password);
        if(!match) return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Email or password incorrect!"});
        const {accessToken, refreshToken} = getTokens(employer);
        res.cookie('jpc', refreshToken, cookieOptions );
        return res.status(StatusCodes.OK).json({loggedIn:true, accessToken});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
    }
}

exports.refreshEmployerToken = async(req, res)=>{
    try {
        const jpc = req.cookies.jpc;
        const {refreshKey} = secretKeys();
        const userToken = jwt.verify(jpc, refreshKey)
        if(!userToken) return res.status(StatusCodes.FORBIDDEN).json({msg:"invalid token"});
        const user = await findEmployerById(userToken.id);
        if(!user) return res.status(StatusCodes.FORBIDDEN).json({msg:"User not found!"});
        const {accessToken}= getTokens(user);
        return res.status(StatusCodes.OK).json({accessToken, refreshed:true});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:error.message});
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jpc', cookieOptions);
    res.status(StatusCodes.OK).json({logout:true});
}