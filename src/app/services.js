const Location = require('./models/location');
const LocationControler = require('./controllers/location-controller');
module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        res.render('index');
    });
    app.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });
    //app.post('/login', passport.authenticate('local-login'));
    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/location',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/location', isLoggedIn, (req, res) => {
        LocationControler.findLocation(req.user.local.email, (err, locs) => {
            if(err){
                res.render('location', {
                    user: req.user
                });
            }else {
                res.render('location', {
                    user: req.user,
                    locations: JSON.stringify(locs)
                });
            }
        });
    });
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    app.post('/location', isLoggedIn, (req, res) => {
        LocationControler.saveLocation(req, (err, loc) => {
            if(err){
                res.render('location', {
                    user: req.user
                });
            }else{
                res.render('location', {
                    user: req.user,
                    message: "Guardada correctamente"
                });
            }
        });
    });
};

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}