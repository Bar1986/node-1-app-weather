const request = require('request')


const forecast = (latitude,longtitude,callBack) => {
    const url = 'http://api.weatherstack.com/current?access_key=6f734e593f5fa423380b58ae4c3fc38e&query=' + encodeURIComponent(longtitude)+ ',' +encodeURIComponent(latitude)
    request({url , json: true},(error,{body})=>{
             
        if(error){
            callBack('system error ' + error,undefined)
        } else if(body.error){
            callBack('Server error code ' + body.error.code + ' Server error info ' + body.error.info,undefined)
        }else{
            callBack(undefined,{
                observationTime : body.current.observation_time,
                weatherDescription: body.current.weather_descriptions[0],
                feelslike : body.current.feelslike
                
            })
        }
        
    })
} 
module.exports = forecast