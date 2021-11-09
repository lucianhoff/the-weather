const moon = document.querySelector("#moon");
const sun = document.querySelector("#sun");
const body = document.querySelector("body");
const text = document.querySelector(".text-dark");

moon.addEventListener("click", () => {
  moon.classList.toggle("hidden") && sun.classList.remove("hidden");
  body.classList.toggle("bg-gray-900");

  text.classList.remove("text-gray-900");
  text.classList.toggle("bg-white");
  text.classList.add("text-white");
});

sun.addEventListener("click", () => {
  sun.classList.toggle("hidden") && moon.classList.remove("hidden");
  body.classList.toggle("bg-gray-900");

  text.classList.add("text-gray-900");
  text.classList.toggle("bg-white");
});

const result = document.querySelector("#result");
const form = document.querySelector("#form");

window.addEventListener("load", (e) => {
  e.preventDefault();
  form.addEventListener("submit", weather);

});

function weather(e) {
  e.preventDefault();

  // Contulamos Api

  const city = document.querySelector("#city").value;
  const country = document.querySelector("#country").value;

  if (city === "" || country === "") {
    error("Select a country and a city");
  } else {
    console.log(`${city}, ${country}`);
    api(city, country);
  }
}

function error(msg) {
  console.log(msg);

  result.innerHTML = `
        <div id="error">
            <p class="p-5 bg-white rounded-full">${msg}</p>
        </div>
    `;

  setTimeout(() => {
    result.innerHTML = "";
  }, 3000);
}

function api(city, country) {
  const apiKey = "8a5d9f19c5d9e75896206ac22fc8ba93";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

  decoration()

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
    //   console.log(data);

      if (data.cod === "404") {
        error("City not found");
      } else {
        showWeather(data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function showWeather(data) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = data;

  const kelvin = 273.15;

  const actual = (temp - kelvin).toFixed(1);
  const max = (temp_max - kelvin).toFixed(1);
  const min = (temp_min - kelvin).toFixed(1);

  result.innerHTML = `
    <div class="bg-white p-5 flex items-center rounded-lg flex-col close" id="card">
        <div class="flex justify-center flex-col ">
            <p class="text-3xl text-center py-5">The weather in ${name}</span></p>
            <p class="text-3xl text-center py-5">Temperature <span id="tempActual"> ${actual} <span class="text-2xl">°C</span></span></p>
        </div>
        <div class="flex flex-col justify-between md:flex-row">
            <p class="text-2xl py-5 px-10">Max: ${max} <span class="text-2xl">°C</span></p>
            <p class="text-2xl py-5 px-10">Min: ${min} <span class="text-2xl">°C</span></p>
        </div>
        <button id="close" class="uppercase close inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium  rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        X 
        </button>
    </div>
    `;

//   setTimeout(() => {
//     result.innerHTML = "";
//   }, 8000);

  console.log(actual);
}

function decoration() {
    const div = document.createElement("div");

    div.classList.add("spinner");
    div.classList.add("flex");
    div.classList.add("fixed");
    div.classList.add("z-0");

    div.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `

    result.appendChild(div);
}


function eliminarMensaje(e) {
    // console.log(e.target);
    if (e.target.id === "close") {
        result.innerHTML = "";
    }
}

result.addEventListener("click", eliminarMensaje);