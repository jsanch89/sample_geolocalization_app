var location = require('./../models/location');
module.exports = () => {
    function findLocations(user){
        Location.find({user: user.email}, (err, locations) =>{
            if(err) return res.status(500).send(err);
            return res.status(200).send(locations);
        });
    }
    function addLocation(user, location){
        const loc = new Location(req.body);
        loc.save(err => {
            if(err) return res.status(500).send(err);
            return res.status(200).send(loc);
        });
    }
}

