function getWeather(woeid) {
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
    .then(result => {
        // console.log(result);
        return result.json();
    })
    .then(data => {
        // console.log(data);
        const today = data.consolidated_weather[0];
        // document.querySelector('.temperature').textContent = `${today.the_temp} °C`;
        // document.querySelector('.humidity').textContent = `${today.humidity} g.kg-1`;
        document.getElementById('temp').textContent = `${today.the_temp} °C`;
        document.getElementById('humidity').textContent = `${today.humidity} g.kg-1`;
        console.log(`Humidity today in ${data.title} is ${today.humidity} g.kg-1`);
        console.log(`Temperature today in ${data.title} is ${today.the_temp} degree Centigrade.`);
    })
    .catch(error => console.log(error));
}
// https://www.metaweather.com/api/location/search/?query=ahmedabad

async function getWoeid(city) {
    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}`);
        const data = await result.json().
        then(data => {
            for (const city of data) {
            if(city.title.toUpperCase() == userInput.toUpperCase()) {
                return (city.woeid);
            }
        }  
    }).then(woeid => {
        getWeather(woeid); 
    })
    .catch(error => console.log(error));
    } catch(error) {
        alert(error);
    }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude + 
  "Longitude: " + position.coords.longitude);
  lat = position.coords.latitude;
  long = position.coords.longitude;
}

// if(userInput){
//     getWoeid(userInput);
// }
var userInput, lat, long;
document.addEventListener('keypress',function(event){
    if(event.key === "Enter"){
        userInput = document.querySelector('.city-input').value;
        document.querySelector('.city-name').textContent = userInput;
        getWoeid(userInput);
        // getLocation();
    }
});
