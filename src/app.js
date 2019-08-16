const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require(path.join(__dirname, 'utils/geocode.js'));
const forecast = require(path.join(__dirname, 'utils/forecast.js'))

const app = express();

//Define paths for express
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicPath));

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Taylor'
    });
});

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Us',
        name: 'Taylor'
    });
});

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help Page',
        helpText: 'JUST FIGURE IT OUT YOU DUMMY',
        name: 'Taylor'
    });
});

//Weather endpoint
app.get('/weather', (req, res) =>{
    //make sure address is supplied in query string
    if(!req.query.address){
        return res.send({error: 'You must provide an address'});
    }

    const address = req.query.address;
    //get geocode data
    geocode(address, (error, {location, latitude, longitude} = {}) =>{
        //make sure theres no error
        if(error){
            return res.send({error});
        }
        //get forecast and send json
        forecast(latitude, longitude, (error, forecastData) =>{
            //make sure theres no error
            if(error){
                return res.send({error});
            }
            
            res.send({
                forecast: forecastData,
                location
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        errorMessage: 'Help page not found.',
        name: 'Taylor'
    });
});

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404 Error',
        errorMessage: 'Page not found.',
        name: 'Taylor'
    });
});

app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
});