const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const keys = require('../configs/index');
const Account = require('../models/account.model');
const {JWT_SERECT} = require('../configs')
const LocalStrategy = require('passport-local').Strategy;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('Authorization');
opts.secretOrKey = 'NodejsAipAuthentication';

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts,async (jwt_payload, done) => {
        try {
            const user = await Account.findById(jwt_payload.sub)
            console.log('jwt_payload',jwt_payload)
            if (!Account) return  done(null, false)
            done(null,user)
        } catch (error) {
            return done(error, false)
        }
    })
  );
  passport.use(new LocalStrategy({
    usernameField: 'email'
  },async (email, password, done) => {
    try {
      const user = await Account.findOne({ email})
      if(!user) return done(null,false)
      const isCorresctPassord = await user.isValidPassword(password)
      if(!isCorresctPassord) return done(null,false)
      done(null,user)
    } catch (error) {
      done(error,false)
    }
  }))
};
