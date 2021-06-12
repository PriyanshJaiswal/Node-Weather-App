const request=require('request')

const forecast = (latitude,longitude,callback)=>{
    const url='http://api.weatherapi.com/v1/forecast.json?key=41a2eacc66a749c2b1c54526213105&q='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&days=2&aqi=no&alerts=yes'
    request({url,json :true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Weather Service',undefined)
        }
        else if(body.error){
                    callback('Unable to find Location',undefined)
        }
        else{
            const curren=body.current
            
            // console.log('Tomorrow max temperatature will be '+response.body.forecast.forecastday[1].day.maxtemp_f+'  '+response.body.forecast.forecastday[1].day.condition.text)  
            callback(undefined,{
                Climate : curren.condition.text,
                CurrentTemp :curren.temp_f,
                ProbabiltyPrecipitation : curren.precip_in
            })
        }
    })
}
module.exports=forecast
