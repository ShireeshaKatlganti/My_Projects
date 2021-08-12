let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");
let spinnerEl = document.getElementById("spinner");

let searchInputVal = "";
let countriesList = [];

function createAndAppendCountry(result) {

    let countriesContainer = document.createElement("div")
    countriesContainer.classList.add("d-flex", "flex-row", "col-11", "mr-auto", "ml-auto", "col-md-5", "country-card");
    resultCountriesEl.appendChild(countriesContainer);

    let flagImage = document.createElement("img");
    flagImage.classList.add("country-flag", "mt-auto", "mb-auto");
    flagImage.src = result.flag;
    countriesContainer.appendChild(flagImage);

    let countriesMiniContainer = document.createElement("div")
    countriesMiniContainer.classList.add("d-flex", "flex-column", "ml-4");
    countriesContainer.appendChild(countriesMiniContainer);

    let countryName = document.createElement("h1");
    countryName.classList.add("country-name");
    countryName.textContent = result.name;
    countriesMiniContainer.appendChild(countryName);

    let countryPopulation = document.createElement("p");
    countryPopulation.classList.add("country-population");
    countryPopulation.textContent = result.population;
    countriesMiniContainer.appendChild(countryPopulation);



}

function search_results() {

    for (let result of countriesList) {
        let countryName = result.name.toLowerCase();
        if (countryName.includes(searchInputVal)) {
            createAndAppendCountry(result);
        }
    }
}


function getCountries() {
    resultCountriesEl.textContent = "";

    spinnerEl.classList.remove("d-none");
    resultCountriesEl.classList.add("d-none");
    let options = {
        method: "GET"
    };

    fetch("https://restcountries.eu/rest/v2/all?fields=name;population;flag", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            resultCountriesEl.classList.remove("d-none");
            spinnerEl.classList.add("d-none");
            countriesList = jsonData;
            search_results();
        });

}

function checkInput(event) {
    searchInputVal = event.target.value.toLowerCase();
    getCountries();
}
getCountries();
searchInputEl.addEventListener("keyup", checkInput);