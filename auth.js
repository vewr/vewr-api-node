const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const UserInterface = require('./interfaces/user');

const params = {
  secretOrKey: 'fsE3K4l8InmD2o',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt')
};

module.exports = function() {
  const strat = new JwtStrategy(params, (payload, done) => {
    UserInterface.findUserById(payload.id)
    .then((user) => {
      done(null, {
        id: user._id
      });
    })
    .catch((err) => {
      done(new Error(err), null);
    });
  });

  passport.use(strat);

  return {
    init: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt')
    },
    // TODO: move the secret into an environment variable 
    secret: params.secretOrKey
  }
}