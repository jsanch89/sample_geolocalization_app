module.exports = {
    "dev": {
        "url": "mongodb://localhost:27017/geolocalization_db" 
    },
    "test": {
        "url": "mongodb://mongo-server/geolocalization_db"
    },
    "prod" : {
        "url": "mongodb://test:test123@ds213705.mlab.com:13705/geolocalization_db"
    }
}