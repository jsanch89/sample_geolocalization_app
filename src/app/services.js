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
        successRedirect: '/location',
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
                    user: req.user,
                    locations: []
                });
            }else {
                console.log(locs);
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

    app.post('/location/register', isLoggedIn, (req, res) => {
        var data = {};
        data.latitude = req.body.latitude;
        data.longitude = req.body.longitude;
        data.user = req.body.user;
        LocationControler.findSpecLocation(data, (err, loc) => {
            if(!err){
                if(loc == null){
                    LocationControler.saveLocation(data, (er, lc) => {
                        if(!er){
                            console.log("Loc saved");
                        }
                    });
                }
            }
        });
    });

    app.get('/location/register', isLoggedIn, (req, res) => {
        res.redirect("/location");
    });
};

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}