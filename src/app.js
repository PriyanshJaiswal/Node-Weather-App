const path=require('path')
const express= require('express')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const hbs=require('hbs')
// Define Paths for express Configuration
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname ,'../templates/partials')
console.log(publicDirectoryPath)

// Setup handlebars and views Location 
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup Standard Directory to Serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title :'Weather App',
        name:'Priyansh Jaiswal'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title :'About Me',
        name : 'Priyansh Jaiswal'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText :"This is some helpful text",
        title : 'Help',
        name :'Priyansh Jaiswal'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address',
        })
    }
    geocode(req.query.address ,(error ,{latitude,longitude,place}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude,longitude ,(error ,{Climate,CurrentTemp,ProbabiltyPrecipitation})=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast : Climate+". The current temp is "+CurrentTemp+" degree . The chances of precipitation is "+ProbabiltyPrecipitation,
                    location:place,
                    address :req.query.address
                })
            })
    })
    // res.send({
    //     location :'Philadelphia',
    //     forecast :'It is raining',
    //     address:req.query.address,
    // })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error :'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[],
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title :'404',
        name:"Priyansh Jaiswal",
        errorMessage :'Help Article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title :'404',
        name :'Priyansh Jaiswal',
        errorMessage :'Page not found'
    })
})
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send([{
//         name :'Andrew',
//         age :27
//     },{
//         name :'Resilie',
//         age : 35
//     }])
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

app.listen(3000,()=>{
    console.log('Server is up on Port 3000')
})