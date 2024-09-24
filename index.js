// Fetch a random photo from Unsplash API
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    // When the response is received, convert it to JSON
    .then(res => res.json())
    // Once the JSON data is available, execute this function
    .then(data => {
        // Set the background image of the body element using the regular size URL from the fetched data
        document.body.style.backgroundImage = `url(${data.urls.regular})`;
        // Update the element with id "author" to display the name of the photo's author
        document.getElementById("author").textContent = `By: ${data.user.name}`;
    })
    // If an error occurs, execute this function
    .catch(err => {
        // Set a default background image if the API call fails
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`;
        // Update the author element with a default author's name 
        document.getElementById("author").textContent = `By: Dodi Achmad`;
    });


// Fetch data from the CoinGecko API for Dogecoin
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    // When the response is received, execute this function
    .then(res => {
        // Check if the response is not OK (i.e., status is not in the range 200-299)
        if (!res.ok) {
            // If the response status indicates an error, throw an error
            throw Error("Something went wrong");
        }
        // If the response is OK, return the response as JSON
        return res.json();
    })
    // Once the JSON data is available, execute this function
    .then(data => {
        // Insert Dogecoin's image and name into the element with id "crypto-top"
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;
        // Append the current price, 24-hour high, and 24-hour low to the element with id "crypto"
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆: $${data.market_data.high_24h.usd}</p>
            <p>👇: $${data.market_data.low_24h.usd}</p>
        `;
    })
    // If an error occurs at any point in the process, catch and log the error to the console
    .catch(err => console.error(err));




function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(async position => {
    try {
        // Fetch weather data from OpenWeatherMap API using latitude and longitude from the user's location
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`);
        
        // Check if the response is not OK (status code outside of 200-299 range)
        if (!res.ok) {
            // If the response is not OK, throw an error with a custom message
            throw Error("Weather data not available");
        }
        
        // If the response is OK, return the response as JSON
        const data = await res.json();
        
        // Construct the URL for the weather icon based on the icon code from the fetched data
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        
        // Update the element with id "weather" to display the weather icon, temperature, and city name
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
        `;
    } catch (err) {
        // If an error occurs, catch and log the error to the console
        console.error(err);
    }
});
