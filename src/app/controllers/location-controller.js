const Location = require('../models/location');

exports.findLocation = function(user, next) {
    Location.find({user: user}, (err, locs) => {
        if(err){
            next(err, null);
        }else{
            next(null, locs);
        }
    });
}

exports.saveLocation = (req, next) => {
    var location = new Location();
    location.longitude = req.body.longitude;
    location.latitude = req.body.latitude;
    location.user = req.user.local.email;
    location.save((err, loc) => {
        if(err) next(err, null);
        else next(null, loc);
    });
}