const path = require('path')
const express = require('express');
const hbs = require('hbs')

const app = express()

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(path.join(publicPath)))


app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Bar Feldman'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About me',
        name: 'Bar Feldman'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'I need help',
        name:'Bar Feldman'
    })
})
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:  'Search query must be provide'
        })
    }
    geoCode(req.query.address,(error,{latitude,longtitude,placeName}={})=>{
        if(error){
            return res.send({
                error 
            })
        }
        forecast(latitude,longtitude,(error,data)=>{
            if(error){
                return res.send({
                    error 
                })
            }
            res.send([{
                forecast: data.weatherDescription,
                location: placeName
            }])
        })

    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
          error:  'Search query must be provide'
        })
    }
    res.send([{
        products: []
    }])
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Bar Feldman',
        errorMessage:' Help article Not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Bar Feldman',
        errorMessage:' Page Not Found'

    })
})


app.listen(3000,()=>{
    console.log('Server is up')
})