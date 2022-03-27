console.log('client side hello')


const weatherEvent = document.querySelector('form')
const searchLocation = document.querySelector('input')
const forecastVal = document.querySelector('#forecastMessage')
weatherEvent.addEventListener('submit',(e)=>{
    e.preventDefault()

   forecastVal.textContent = 'Loading...'
   forecastVal.textContent =  ''
    fetch('/weather?address='+ encodeURIComponent(searchLocation.value)).then((response)=>{
        
    response.json().then((data)=>{
      
        if(data.error){
            forecastVal.textContent = data.error 
        }else{
            forecastVal.textContent ='The forecast for ' + data[0].location  + ' is ' + data[0].forecast + ' Feels like  ' + data[0].feelslike
        }
    })
})
}) 