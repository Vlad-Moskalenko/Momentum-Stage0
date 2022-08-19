const weather = document.querySelector('.weather')
const cityInput = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

function setCity() {
    localStorage.setItem('city', cityInput.value)
    getWeather(cityInput)
}

export function getCity(lang) {
    if(localStorage.getItem('city')) cityInput.value = localStorage.getItem('city')
    else{
        lang==='uk'? cityInput.value = 'Київ': cityInput.value = 'Kyiv';
    }

    getWeather(cityInput, lang)
}

function getWeather(cityInput, lang) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=${lang}&appid=a156dbc0f3b188b0b307ac212f141924&units=metric`)
    .then(resp => resp.json())
    .then(weatherData => {
        weatherError.textContent = ''
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${weatherData.weather[0].id}`);
        temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
        weatherDescription.textContent = weatherData.weather[0].description;
        
        if(lang==='uk') {
            wind.textContent = `Швидкість вітру: ${Math.ceil(weatherData.wind.speed)} м/c`;
            humidity.textContent = `Вологість повітря: ${Math.round(weatherData.main.humidity)}%`;
        }
        else {
            wind.textContent = `Wind speed: ${Math.ceil(weatherData.wind.speed)} m/c`;
            humidity.textContent = `Humidity: ${Math.round(weatherData.main.humidity)}%`;
        }
    })
    .catch(() => {
        localStorage.removeItem('city');
        removeTextContent(weather, lang);
    })
}

function removeTextContent(parentElement, lang){
    if(parentElement.children.length){
        Array.from(parentElement.children).forEach(element => {
        if(element.children.length) removeTextContent(element)
        else {
            if(lang==='uk') element == weatherError? weatherError.textContent = 'Місто не знайдено' : element.textContent = ''
            else{element == weatherError? weatherError.textContent = 'City not found' : element.textContent = ''}
        }
    })
    } 
}

cityInput.addEventListener('change', setCity);