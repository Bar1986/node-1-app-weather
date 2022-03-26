console.log('client side hello')


const weatherEvent = document.querySelector('form')
const searchLocation = document.querySelector('input')
const forecastVal = document.querySelector('#forecastMessage')

weatherEvent.addEventListener('submit',(e)=>{
    e.preventDefault()

   const  location = searchLocation.value
   forecastVal.textContent = 'Loading...'
   forecastVal.textContent =  ''
    fetch('/weather?address='+ encodeURIComponent(searchLocation.value)).then((response)=>{
        
    response.json().then((data)=>{
        
        if(data.error){
            forecastVal.textContent = data.error 
        }else{
            forecastVal.textContent ='The forecast for ' + data[0].location  + ' is ' + data[0].forecast
        }
    })
})
}) 