const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');


module.exports = (() => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({
                where: { email }
            });
            if (!user) {
                return done(null, false, { reason: 'The email is not in the system.' })
            }
            const comparePassword = await bcrypt.compare(password, user.password);
            if (comparePassword) {
                return done(null, user);
            }
            return done(null, false, { reason: `The password doesn't match.`})
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
})