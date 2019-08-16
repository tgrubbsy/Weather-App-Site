const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/73b6553817601ef54129e6a9990e4c8c/' + latitude + ',' + longitude + '?units=us';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to forecast services!', undefined);
        }
        else if(body.error){
            callback('Unable to find location.', undefined);
        }
        else{
            callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.");
        }
    })
}

module.exports = forecast;