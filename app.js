
// Function to fetch data for the current date and display it in the UI
function getCurrentImageOfTheDay() {
    const apiKey = "8XvkLeMYbRKwJDO7Cgqgkhkr1hAIzvdzDUJ3GOx0";
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const currentImageContainer = document.getElementById("current-image-container");
        const img = document.createElement("img");
        img.src = data.url;
        currentImageContainer.appendChild(img);
  
        const description = document.createElement("p");
        description.textContent = data.explanation;
        currentImageContainer.appendChild(description);
      })
      .catch((error) => console.log(error));
  }
  
  // Function to fetch data for a selected date and display it in the UI
  function getImageOfTheDay() {
    const apiKey = "8XvkLeMYbRKwJDO7Cgqgkhkr1hAIzvdzDUJ3GOx0";
    const searchInput = document.getElementById("search-input");
    const date = searchInput.value;
    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const currentImageContainer = document.getElementById("current-image-container");
        currentImageContainer.innerHTML = "";
        const img = document.createElement("img");
        img.src = data.url;
        currentImageContainer.appendChild(img);
  
        const description = document.createElement("p");
        description.textContent = data.explanation;
        currentImageContainer.appendChild(description);
  
        saveSearch(date);
        addSearchToHistory();
      })
      .catch((error) => console.log(error));
  }
  
// Function to save the date to local storage
function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

// Function to display the search history in the UI
function addSearchToHistory() {
  const searchHistory = document.getElementById("search-history");
  searchHistory.innerHTML = "";
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.forEach((date) => {
    const li = document.createElement("li");
    li.textContent = date;
    li.addEventListener("click", () => {
      const searchInput = document.getElementById("search-input");
      searchInput.value = date;
      getImageOfTheDay();
    });
    searchHistory.appendChild(li);
  });
}

function clearSearchHistory() {
  localStorage.removeItem("searches");
  const searchHistory = document.getElementById("search-history");
  searchHistory.innerHTML = "";
}

// Event listener for the search form submission
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getImageOfTheDay();
});

const clearSearchHistoryButton = document.getElementById(
  "clear-search-history"
);
clearSearchHistoryButton.addEventListener("click", clearSearchHistory);

// Run getCurrentImageOfTheDay function when the page loads
getCurrentImageOfTheDay();
