const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//paths for express configuration
const indexDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup to static directory to serve
app.use(express.static(indexDir))

app.get('', (req, res) => {
  res.render('index', {
    title:'Weather App', name:'Muneeb'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {title:'About me',name:'Muneeb'})
})

app.get('/help', (req, res) => {
  res.render('help', {title: 'Help', helpMessage:'This page is here to help you', name:'Muneeb'})
})

app.get('/weather', (req, res) => {

  if(!req.query.address){ return res.send({ error:'You must provide an address' }) }

   geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
     if(error){ return res.send({error}) }

     forecast(longitude, latitude, (error, forecastData) => {
       if(error){ return res.send({error}) }
       res.send({ forecast:forecastData, location, address:req.query.address})

     })
  })
})


// app.get('/lifeinshort', (req, res) => {
//   res.send('Life is shit. You are born to deal with emotions and decisions until you eventually die.')
// })

app.get('/products', (req, res) => {
  if(!req.query.search){ return res.send({ error:'You must provide a search' }) }

  res.send({ products:[] })
})


  app.get('/help/*', (req, res) => {
    res.render('404', {
    title:'404',
    name:'Muneeb',
    errorMessage:'Help article not found'
  })
})

app.get('*',(req, res) => {
    res.render('404', {
    title:'404',
    name:'Muneeb',
    errorMessage:'Page not found'
  })
})

app.listen(port, () => { console.log('Server up on port ' + port) })
