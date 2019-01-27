const LocalStrategy = require('passport-local').Strategy;

const User = require('./../app/models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    })

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user) {
            done(err, user);
        })
    })
    // Regsitro
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({
            'local.email': email
        }, function(err, user) {
            if(err) {return done(err);}
            if(user){
                return done(null, false, req.flash('signupMessage', 'El correo ya existe.'));
            }else{
                var newUser = new User();
                newUser.local.email = email;
                if(!(password == req.param('confirmation'))){
                    return done(null, false, req.flash('signupMessage', 'Las claves no coinciden.'));
                }
                newUser.local.password = newUser.generateHash(password);
                newUser.local.fullName = req.param('fullname');
                newUser.save(function(err) {
                    if(err){
                        throw err;
                    }
                    return done(null, newUser);
                })

            }
        })
    }
    ));
    // Inicio
    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({
            'local.email': email
        }, function(err, user) {
            if(err) {return done(err);}
            if(!user){
                return done(null, false, req.flash('loginMessage', 'El usuario no se encuentra en la base de datos.'));
            }
            if(!user.validatePassword(password)){
                return done(null, false, req.flash('loginMessage', 'La clave o usuario son incorrectos.'));
            }
            return done(null, user);
        });
    }));
}