const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./geocode');
const forecast =require('./forecast');

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));


// ********************* For detect automatic changes in hbs and js files ******

// nodemon src/app.js -e js,hbs 

//**** */

//Define paths for express config
const app = express();
const publeDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup static directory to serve
app.use(express.static(publeDirPath)); // setting public path for static html files
app.set('view engine','hbs'); // setting templating engine 
app.set('views',viewsPath); //customize views 
hbs.registerPartials(partialsPath);


app.get('',(req,res)=>{
    res.render('index',{
        'title':'WeatherAPP',
        'name':'Shubham'
    });

})

app.get('/about',(req,res)=>{

    // render is used to get the template file
    res.render('about',{
        'title':'About app',
        'name':'Shubham'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        'message':"Help me",
        'title':'Help title',
        'name':'Shubham'
    })
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({'error':'Please provide the address'});
    }else{
        const addr = req.query.address;

        geocode(addr,(error,{latitude,longitude}={})=>{


            if(!error){
                // const {latitude,longitude} = data;
                forecast(latitude,longitude,(err,weatherData)=>{
                    if(!err){

                        res.send({
                            'weather':weatherData.weather,
                            'address':addr
                        })
                       // console.log("Weather is:"+weatherData.weather)
                    }else{

                        res.send({'error':err})
                        //console.log(err);
                    }
                })
            }else{

                res.send({'error':error})
                //console.log(error);
            }
            
        })

        // res.send({
        //     'longitude':"22.3",
        //     'latitude':'12.4',
        //     'address':addr
        // })
    }
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            'error':'You must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        'product':{}
    })
});

app.get('/help/*',(req,res)=>{
    res.render('error',{
        'name':'Shubham',
        'message':'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        'name':'shubham',
        'message':'Page not found'
    })
})


app.listen(3000,()=>{
    console.log('Server Started on 3000')
})