const request = require('request')// Goal: Create a reusable function for getting the forecast

const forecast = (latitude, longitude, callback) => {
   const url = 'https://api.darksky.net/forecast/aa3f9554d79b006a09e59a815d57804e/' + latitude + ',' + longitude

   request({ url, json:true }, (error, {body}) => {
      if(error){
        callback('Unable to connect to weather service', undefined)
      }else if(body.error){
        callback('Unable to to find the location. Try another location', undefined)
      }else{

        callback(undefined, body.daily.data[0].summary+' It is currently '
        +body.currently.temperature+' degress out. There is a '+body.currently.precipProbability+'% chance of rain')
      }
   })
}

module.exports = forecast
