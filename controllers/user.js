require('dotenv').config()
const passport = require('passport');
const Account = require('../models/account.model');
const Helpers = require('../routers/routersHelpers')
const JWT = require('jsonwebtoken')
const {JWT_SERECT} = require('../configs')
const encodedToken = (userID) => {
    return JWT.sign({
        iss: 'Tan Dat',
        sub: userID,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate()+ 2)
    }, 'NodejsAipAuthentication')
}

const secret = async (req, res, next) => {
    return res.status(200).json({ status:200,message: 'Xác thực thành công' });
};
const signIn = async (req, res, next ) =>{
   const token = encodedToken(req.user._id)
   res.setHeader('Authorization', token)
   return res.status(200).json({status:200, message: 'success'})
}
const signUp = async (req, res, next ) =>{
    try {
        const {value} = Helpers.authSignInSchema.validate(req.body);
        const { email } = req.body;

        const existingAccount = await Account.findOne({ email });
        if (existingAccount) {
          return res.status(400).json({ error: 'Tài khoản đã tồn tại' });
        }

        const newUser = await Account.create(value);
        
        const token = encodedToken(newUser._id)

        res.setHeader('Authorization',token)

        res.status(200).json({status: 'success', message: 200,newUser});
      } catch (error) {
        // If an error occurs during sign-up, send a 500 Internal Server Error response
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
const updateUser = async (req, res, next ) =>{
    console.log("Call to updateUser")
}


module.exports = {secret, signIn, signUp, updateUser }