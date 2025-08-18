const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const { getEmpleadoByEmail, postEmpleado } = require('../modelos/empleados/empleados.modelo');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/sesion/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0].value;
        let usuario = await getEmpleadoByEmail(email);
        if (!usuario) {
          const password = await bcrypt.hash(Date.now().toString(), 10);
          usuario = await postEmpleado(profile.displayName, email, password);
        }
        return done(null, usuario);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;
