console.log("javascript connected!");
const city = "Tulsa";
const apiKey = process.env.OPEN_WEATHER_API_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

const carousel = new bootstrap.Carousel("#homeCarousel", {
  interval: 2000,
  pause: false,
});

const carouselButton = document.getElementById("carouselButton");
const faIcon = document.getElementById("faButton");

carouselButton.addEventListener("click", function () {
  if (faIcon.classList.contains("fa-pause")) {
    faIcon.classList.remove("fa-pause");
    faIcon.classList.add("fa-play");
    carousel.pause();
  } else {
    faIcon.classList.remove("fa-play");
    faIcon.classList.add("fa-pause");
    carousel.cycle();
  }
});

async function fetchWeather() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayWeather(data);
  } catch (error) {
    console.error("There has been an error", error);
  }
}

fetchWeather();

function displayWeather(data) {
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  console.log(temperature, icon, description);

  const iconURL = `https://openweathermap.org/img/w/${icon}.png`;
  const iconImg = document.createElement("img");
  iconImg.src = iconURL;
  document.querySelector("#weather-icon").appendChild(iconImg);

  document.querySelector("#weather-temp").textContent = `${temperature} \u00B0`;

  document.querySelector("#weather-description").textContent = description;
}
