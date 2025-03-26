import {API_KEY} from './config.js';
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

async function getWeather(city = "Paris") {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Sélectionne les éléments HTML
        const temperatureDiv = document.getElementById("temperature");
        const messageDiv = document.querySelector(".message");
        const animMeteoDiv = document.querySelector(".anim-meteo");

        // udpate API 
        temperatureDiv.textContent = `${Math.floor(data.main.temp)}°C`;
        messageDiv.textContent = `Le temps est : ${data.weather[0].description}`;

        // icon from weatherapp
        const icon = data.weather[0].icon; 
        animMeteoDiv.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="Météo">`;
       // get description  
       const description = data.weather[0].description.toLowerCase();
       // condition if to display background image 
       switch (true) { 
        case description.includes("ciel dégagé"):
            document.body.style.backgroundImage = "url('images/clear-sky.jpg')";
            break;
        case description.includes("nuageux"):
            document.body.style.backgroundImage = "url('images/couvert.jpg')";
            break;
        case description.includes("pluie"):
            document.body.style.backgroundImage = "url('images/rainy.jpg')";
            break;
        case description.includes("neige"):
            document.body.style.backgroundImage = "url('images/snowy.jpg')";
            break;
        case description.includes("orage"):
            document.body.style.backgroundImage = "url('images/stormy.jpg')";
            break;
        default:
            // If none of them
            document.body.style.backgroundImage = "url('images/universe.jpg')";
            break;
    }

    } catch (error) {
        console.error("Erreur:", error);
    }
}

getWeather(); 






