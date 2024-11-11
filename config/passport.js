const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const passport = require('passport');

module.exports = function (passport) {
    // Local Strategy
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
          console.log("JWT strategy triggered"); // Check if this line is logged
            try {
                const user = await User.findOne({ email });
                if (!user) return done(null, false, { message: 'User not found' });

                const isMatch = await user.comparePassword(password);
                if (!isMatch) return done(null, false, { message: 'Incorrect password' });

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );

    // JWT Strategy
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET // Replace this with an environment variable in production
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

    // Serialize and deserialize users for session handling
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};

