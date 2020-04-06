const request = require('request');

const geocode = (addr,cb)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(addr)+'.json?access_token=pk.eyJ1Ijoic2h1YmhhbWphaW4zMDciLCJhIjoiY2s4bGpmbHJmMDB6NjNmcGN0azRqcHprbCJ9.3-FJM_U3B_2rdmHQUJmUUQ&limit=1'

    request({'url':url,json:true},(error,{body}={})=>{
        // const {body} = response;
        
        if(error){
            cb('Unable to send data',undefined);
        }else if(body.features.length == 0){
            cb('Unable to find location',undefined)
        }else{
            cb(undefined,{
                'latitude':body.features[0].center[1],
                'longitude':body.features[0].center[0],
                'location':body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode