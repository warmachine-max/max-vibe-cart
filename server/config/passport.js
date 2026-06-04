import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

const configurePassport = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // 1. Check if a user with this googleId already exists in our DB
                    let user = await User.findOne({ googleId: profile.id });

                    if (user) {
                        // User exists, pass the user forward to our controller
                        return done(null, user);
                    }

                    // 2. If user does not exist, check if an account exists with the same email
                    user = await User.findOne({ email: profile.emails[0].value });

                    if (user) {
                        // Link the Google ID to this existing email account
                        user.googleId = profile.id;
                        if (!user.avatar) user.avatar = profile.photos[0]?.value;
                        await user.save();
                        return done(null, user);
                    }

                    // 3. If it's a completely new user, create a brand new account
                    user = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        avatar: profile.photos[0]?.value,
                        // role defaults to 'admin' right now because of our Schema setup!
                    });

                    return done(null, user);
                } catch (error) {
                    // Pass any database errors along
                    return done(error, null);
                }
            }
        )
    );
};

export default configurePassport;