const Location = require('./models/location');
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
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile', {
            user: req.user,
            locations: req.locations
        });
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/location', isLoggedIn, (req, res) =>{ 
        Location.find({user: req.user.local.email}, (err, locations) =>{
            if(err) return res.status(500).send(err);
            return res.status(200).send(locations);
        });
    })
    app.post('/location', (req, res) => {
        const loc = new Location();
        loc.longitude = req.body.longitude;
        loc.latitude = req.body.latitude;
        loc.user = req.user.local.email;
        loc.save((err, location) => {
            if(err) return res.status(500).send(err);
            return res.status(200).send(location);
        });
        
    })
};

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}