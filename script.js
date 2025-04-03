const API_KEY = "37dd63457458aadc495e9c34c002cef3";
const WEATHER_URL =
  "https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric";

const btn = document.getElementById("submit");
const input = document.getElementById("inp");
const loading = document.querySelector('.loading');
const weatherInfo = document.querySelector(".card");

btn.addEventListener("click", fetchWeather);


function capitalise(input){
  let descWords = input.split(" ");
      for(let i = 0 ; i < descWords.length ; i++){
        descWords[i] = descWords[i].charAt(0).toUpperCase()+descWords[i].slice(1).toLowerCase();
      }
      return descWords.join(' ');
}

async function fetchWeather() {
 
  let cityName = capitalise(input.value);
  if (!cityName) {
    alert("plz enter city name");
    return;
  }

  weatherInfo.innerHTML = "";

  loading.style.display = 'block';

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
  );

  const data = await response.json();
  
  loading.style.display = 'none';

  if(data.cod == 404){
    alert("City name is invalid");
    return;
  } 
  const cityTemp = data.main.temp;
  const humidity = data.main.humidity;
  const speed = data.wind.speed;
  const feels = data.main.feels_like;
  const desc = data.weather[0].description;
  const weatherDesc = capitalise(desc);
   
  weatherInfo.innerHTML = `
    <h2>${cityName}</h2>
    <h3><span>${cityTemp}</span>&degC</h3>
    <p>${weatherDesc}</p>
    <hr />
    <div class="weather-info">
      <div class="humidity">
        <p>Humidity:<br /><span>${humidity}</span>%</p>
      </div>
      <div class="windspeed">
        <p>Wind Speed:<br /><span>${speed}</span> m/s</p>
      </div>
      <div class="feels-like">
        <p>Feels Like:<br /><span>${feels}</span>&degC</p>
      </div>
      </div>
  `;
}