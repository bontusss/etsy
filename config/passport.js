const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const passport = require('passport');

module.exports = function (passport) {
    // Local Strategy for session-based authentication
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: 'Email is not registered.' });
                }
    
                if (!user.isVerified) {
                    return done(null, false, { message: 'Please verify your email before logging in.' });
                }
    
                const isMatch = await user.comparePassword(password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
    
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );
    

    // JWT Strategy for token-based authentication
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET // Replace with an environment variable in production
    };

    passport.use(
        new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
            try {
                const user = await User.findById(jwtPayload.id);
                if (!user) return done(null, false);

                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        })
    );

    // Serialize user for session-based authentication
    passport.serializeUser((user, done) => done(null, user.id));

    // Deserialize user for session-based authentication
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};

