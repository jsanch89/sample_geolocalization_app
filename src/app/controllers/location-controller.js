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

exports.findSpecLocation = function(loc, next){
    Location.findOne({user: loc.user, latitude: loc.latitude, longitude: loc.longitude}, (err, loc) => {
        if(err){
            next(err, null);
        }else{
            next(null, loc);
        }
    });
}

exports.saveLocation = (formData, next) => {
    var location = new Location();
    location.longitude = formData.longitude;
    location.latitude = formData.latitude;
    location.user = formData.user;
    location.save((err, loc) => {
        if(err) next(err, null);
        else next(null, loc);
    });
}