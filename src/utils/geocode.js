const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibW9ub21hbGFuIiwiYSI6ImNqc3d5aTBrNDAweWk0M3A3c3g1dzVwN3EifQ.IQZh8DwIJokbrfbfK5clsw&limit=1'

    request({ url, json: true }, (error, response) => {
      const bodyFeatures = response.body.features
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if (bodyFeatures.length === 0) {
            callback('Unable to find the location. Try another search.', undefined)
        } else {
          const data = {
              latitude: bodyFeatures[0].center[0],
              longitude: bodyFeatures[0].center[1],
              location: bodyFeatures[0].place_name
          }
            callback(undefined, data)
        }
    })
}

module.exports = geocode
