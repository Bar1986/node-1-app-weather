const request = require('request')
const geoCode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmFyZmVsZG1hbiIsImEiOiJjbDB1bjZyeGIwdmlyM2JubXduaDlvZ24zIn0.YsroZl_HI4giSZN_n7Q9-A&limit=1'
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('System error ' + error,undefined)
        }
        else if(body.message|| body.features.length === 0){
            if(body.message){
            callback(body.message,undefined)
            } else {
                callback('address not exist',undefined)
            }
        } else {
            callback(undefined,{
                latitude : body.features[0].center[1],
                longtitude : body.features[0].center[0],
                placeName : body.features[0].place_name
            })
        }
    })
}
module.exports = geoCode