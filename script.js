const apiKey = "dc3bdfd5a9002299ce22254d1ae1f267";
const button = document.querySelector("#button");
const input = document.querySelector("#input");
const wheatherImage = document.querySelector("#wheatherImage");
const showTemp = document.querySelector("#showTemp");
const cityName = document.querySelector("#cityName");
const humidityPercent = document.querySelector("#humidityPercent");
const windPercent = document.querySelector("#windPercent");
const showErrorMessage = document.querySelector(".showErrorMessage");
const showHide = document.querySelector(".showHide");

// Default city
const defaultCity = 'bangalore';

async function weather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);

        if (response.status === 404) {
            // Display error message and hide weather info
            showErrorMessage.style.display = "block";
            showHide.style.display = "none";
            return; // Exit early if city is not found
        } else if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log(data);

        // Update the UI with weather data
        showTemp.innerHTML = data.main.temp + "°C";
        cityName.innerHTML = data.name;
        humidityPercent.innerHTML = data.main.humidity + "%";
        windPercent.innerHTML = data.wind.speed + " km/h";

        // Update weather image based on weather conditions
        if (data.weather[0].main === "Clouds") {
            wheatherImage.src = "https://cdn-icons-png.flaticon.com/512/1850/1850730.png";
        } 
        else if (data.weather[0].main === "Clear") {
            wheatherImage.src = "https://www.freeiconspng.com/thumbs/weather-icon-png/weather-icon-png-8.png";
        } 
        else if (data.weather[0].main === "Rain") {
            wheatherImage.src = "https://png.pngtree.com/png-clipart/20201208/original/pngtree-grey-clouds-rainy-day-rain-clipart-clipart-png-image_5607262.jpg";
        } 
        else if (data.weather[0].main === "Drizzle") {
            wheatherImage.src = "https://cdn-icons-png.flaticon.com/512/6142/6142570.png";
        } 
        else if (data.weather[0].main === "Mist") {
            wheatherImage.src = "https://cdn-icons-png.flaticon.com/512/1197/1197102.png";
        }

        // Hide error message and show weather information
        showErrorMessage.style.display = "none";
        showHide.style.display = "block";

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Set up event listener for button click
button.addEventListener('click', () => {
    const city = input.value.trim();
    if (city) {
        weather(city);
    } else {
        showErrorMessage.style.display = "block";
        showHide.style.display = "none";
    }
});

// Initial call with default city (e.g., Bangalore)
weather(defaultCity);
