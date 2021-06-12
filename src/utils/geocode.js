const request=require('request')
const geocode =(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJpeWFuc2hqYWlzd2FsIiwiYSI6ImNrcGM5cmZmMjE1ZmIycGxsNzd6MnVleHIifQ.pq-X8FM7p_7i2-lsX88Tkw&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Location Services',undefined)
        }
        else if(body.features.length===0){
                    callback('Unable to find Location . Try another search',undefined)
        }
        else{
        callback(undefined,{
            place :body.features[0].place_name,
            latitude :body.features[0].center[1],
            longitude : body.features[0].center[0]
        })
        }
    })
}
module.exports = geocode