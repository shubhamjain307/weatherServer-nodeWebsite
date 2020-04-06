const request = require('request');

const forecast = (lat,long,cb) =>{

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=b6011bef8c01c1a6d9ba2ba12c82de24';

    request({'url':url,'json':true},(error,response)=>{
        if(!error){
           // console.log(response.body.weather[0].description);
            const {body} = response
            cb(undefined,{
                "weather":body.weather[0].description
            });
        }else{
            cb("No data found",undefined)
        }
    })
}

module.exports = forecast;