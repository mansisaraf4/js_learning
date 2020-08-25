function getWeather(woeid) {
            fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
            .then(result => {
                console.log(result);
                return result.json();
            })
            .then(data => {
                console.log(data);
                const today = data.consolidated_weather[0];
                console.log(`Temperatures today in ${data.title} stay between ${today.min_temp} and ${today.max_temp}.`);
            })
            .catch(error => console.log(error));
        }
        // getWeather(44418);
// https://www.metaweather.com/api/location/search/?query=ahmedabad

        async function getWoeid(city) {
            try {
                const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${city}`);
                const data = await result.json().
                then(data => {
                    for (const city of data) {
                    if(city.title.toUpperCase() == userInput.toUpperCase()) {
                        console.log(city.woeid);
                        console.log(city.title);
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
        const userInput = 'Ahmedabad';
        // const ahmedabadWoeid = getWoeid(userInput).then(data => {
        //     for (const city of data) {
        //         if(city.title.toUpperCase() == userInput.toUpperCase()) {
        //             console.log(city.woeid);
        //             console.log(city.title);
        //             return (city.woeid);
        //         }
        //     }
            
        // });
        const ahmedabadWoeid = getWoeid(userInput);
        // getWeather(parseInt(ahmedabadWoeid));
        // let dataLondon;
        // getWeatherAW(44418).then(data => {
        //     dataLondon = data
        //     console.log(dataLondon);
        // });