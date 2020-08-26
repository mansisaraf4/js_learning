//Get location ---- called onLoad event
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude + 
  "Longitude: " + position.coords.longitude);
  lat = position.coords.latitude;
  long = position.coords.longitude;
  getWeatherDetails(lat,long);
}

function showError(error){
    switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      getWeatherDetails(25.67,76.69);
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");;
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");;
      break;
  }
}

//Get Weather details from API using the coordinates from getLocation()
async function getWeatherDetails(lat,long){
    try{
        const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${appID}`);
        const data = await result.json().
        then(data => {
            // console.log(data);
            return data;
        }).
        then(data => readWeatherDetails(data)
        ).
        catch(error => console.log(error));
    }catch (error){
        alert(error);
    }
}

function readWeatherDetails(data){
    console.log(data);
    details = {
        name: data.name,
        humidity: data.main.humidity,
        temp: kelvinToCelsius(data.main.temp).toFixed(2)
    };
    document.getElementById('temp').textContent = `${details.temp} °C`;
    document.getElementById('humidity').textContent = `${details.humidity} g.kg-1`;
    document.querySelector('.city-name').textContent = `${data.name}`;     
}
function kelvinToCelsius(tempInKelvin){
    return (parseFloat(tempInKelvin) - 273.15);
}

let userInput, lat, long,details;
const appID = 'b89f3eed28c90e5170d2cfbb3337d6cd';
// http://api.openweathermap.org/data/2.5/weather?lat=25.6728&lon=76.6931&appid=b89f3eed28c90e5170d2cfbb3337d6cd



























