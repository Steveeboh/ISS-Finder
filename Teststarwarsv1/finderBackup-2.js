// Function to get the user's position using geolocation
async function getUserPosition() {
    if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser.');
    }

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }),
            error => reject(error)
        );
    });
}

// Function to fetch sunrise and sunset times from the API for a specific date
async function fetchSunTimes(latitude, longitude, date) {
    const dateString = date.toISOString().split('T')[0];
    const apiUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${dateString}&formatted=0`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const sunrise = new Date(data.results.sunrise).getTime();
        const sunset = new Date(data.results.sunset).getTime();

        document.getElementById("sunrise-time").textContent = `Sunrise: ${new Date(sunrise).toLocaleTimeString()}`;
        document.getElementById("sunset-time").textContent = `Sunset: ${new Date(sunset).toLocaleTimeString()}`;

        return { sunrise, sunset };
    } catch (error) {
        console.error("Error fetching sun times:", error);
        return null;
    }
}

// Function to calculate sun position percentage during the day
function calculateSunPosition(sunrise, sunset) {
    const currentTime = new Date().getTime();
    if (currentTime < sunrise) return 0;
    if (currentTime > sunset) return 100;

    const totalDuration = sunset - sunrise;
    const elapsed = currentTime - sunrise;
    return (elapsed / totalDuration) * 100;
}

// Function to calculate moon position percentage during the night
function calculateNightPosition(sunset, nextSunrise) {
    const currentTime = new Date().getTime();
    const totalDuration = nextSunrise - sunset;
    const elapsed = currentTime - sunset;
    return (elapsed / totalDuration) * 100;
}

// Function to update the sun or moon position and visibility
function updateVisibility(elementId, percentage, isVisible) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = isVisible ? 'block' : 'none';
        if (isVisible) {
            element.style.setProperty('offset-distance', `${percentage}%`);
        }
    }
}

// Function to update the sun and moon positions based on current time
function updatePositions(yesterdayTimes, todayTimes, tomorrowTimes) {
    const currentTime = new Date().getTime();
    let percentage;

    if (currentTime >= todayTimes.sunrise && currentTime < todayTimes.sunset) {
        // Daytime: Update sun position
        percentage = calculateSunPosition(todayTimes.sunrise, todayTimes.sunset);
        updateVisibility('sun', percentage, true);
        updateVisibility('moon', 0, false);
    } else if (currentTime >= todayTimes.sunset && currentTime < tomorrowTimes.sunrise) {
        // Nighttime: Update moon position (today's sunset to tomorrow's sunrise)
        percentage = calculateNightPosition(todayTimes.sunset, tomorrowTimes.sunrise);
        updateVisibility('moon', percentage, true);
        updateVisibility('sun', 0, false);
    } else if (currentTime >= yesterdayTimes.sunset && currentTime < todayTimes.sunrise) {
        // Nighttime: Update moon position (yesterday's sunset to today's sunrise)
        percentage = calculateNightPosition(yesterdayTimes.sunset, todayTimes.sunrise);
        updateVisibility('moon', percentage, true);
        updateVisibility('sun', 0, false);
    } else {
        console.error("Unable to determine day/night status.");
    }
}

// Function to start updating sun and moon positions
async function startPositionUpdates(latitude, longitude) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    try {
        const [yesterdayTimes, todayTimes, tomorrowTimes] = await Promise.all([
            fetchSunTimes(latitude, longitude, yesterday),
            fetchSunTimes(latitude, longitude, today),
            fetchSunTimes(latitude, longitude, tomorrow)
        ]);

        if (yesterdayTimes && todayTimes && tomorrowTimes) {
            updatePositions(yesterdayTimes, todayTimes, tomorrowTimes);
            setInterval(() => updatePositions(yesterdayTimes, todayTimes, tomorrowTimes), 60000);
        } else {
            console.error("Error: Unable to retrieve sunrise/sunset times.");
        }
    } catch (error) {
        console.error("Error fetching sun times for updates:", error);
    }
}

// Function to fetch the ISS position
async function fetchISSPosition() {
    const issApiUrl = "http://api.open-notify.org/iss-now.json";

    try {
        const response = await fetch(issApiUrl);
        const data = await response.json();
        return {
            latitude: parseFloat(data.iss_position.latitude),
            longitude: parseFloat(data.iss_position.longitude)
        };
    } catch (error) {
        console.error("Error fetching ISS position:", error);
        return null;
    }
}

// Function to calculate the direction between two points (user and ISS)
function calculateDirection(userLat, userLon, issLat, issLon) {
    const latDifference = issLat - userLat;
    const lonDifference = issLon - userLon;
    const angle = Math.atan2(lonDifference, latDifference) * (180 / Math.PI);

    if (angle >= -22.5 && angle < 22.5) return "North";
    if (angle >= 22.5 && angle < 67.5) return "Northeast";
    if (angle >= 67.5 && angle < 112.5) return "East";
    if (angle >= 112.5 && angle < 157.5) return "Southeast";
    if (angle >= 157.5 || angle < -157.5) return "South";
    if (angle >= -157.5 && angle < -112.5) return "Southwest";
    if (angle >= -112.5 && angle < -67.5) return "West";
    if (angle >= -67.5 && angle < -22.5) return "Northwest";
}

// Function to update the ISS direction on the page
async function updateISSDirection(userPosition) {
    const issPosition = await fetchISSPosition();
    if (issPosition) {
        const direction = calculateDirection(
            userPosition.latitude,
            userPosition.longitude,
            issPosition.latitude,
            issPosition.longitude
        );
        document.getElementById("iss-direction").textContent = `${direction}`;
    }
}

// Function to fetch weather data
async function fetchWeather(latitude, longitude) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const weatherCode = data.current_weather.weathercode;
        console.log("Weather Code:", weatherCode);
        updateWeatherAppearance(weatherCode);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to update the website's appearance based on the weather code
function updateWeatherAppearance(weatherCode) {
    const bodyElement = document.body;
    const weatherSvgContainer = document.getElementById('svg-container2');

    bodyElement.className = ''; // Clear any existing weather classes
    weatherSvgContainer.innerHTML = '';

    if (weatherCode >= 0 && weatherCode <= 3) {
        bodyElement.classList.add('sunny-weather');
        weatherSvgContainer.innerHTML = '<img src="SVG/Wolken sonnig.svg" alt="Sunny">';
        disableRainOverlay();
    } else if (weatherCode >= 45 && weatherCode <= 48) {
        bodyElement.classList.add('cloudy-weather');
        weatherSvgContainer.innerHTML = '<img src="SVG/Wolken bewölkt.svg" alt="Cloudy">';
        disableRainOverlay();
    } else if ((weatherCode >= 61 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) {
        bodyElement.classList.add('rainy-weather');
        weatherSvgContainer.innerHTML = '<img src="SVG/Wolken bewölkt.svg" alt="Rainy">';
        enableRainOverlay();
    } else {
        bodyElement.classList.add('cloudy-weather');
        weatherSvgContainer.innerHTML = '<img src="SVG/Wolken bewölkt.svg" alt="Cloudy">';
        disableRainOverlay();
    }
}

// Function to enable rain overlay
function enableRainOverlay() {
    const rainOverlay = `
        <div class="rain front-row"></div>
        <div class="rain back-row"></div>`;
    document.body.insertAdjacentHTML('beforeend', rainOverlay);
    makeItRain();
}

// Function to disable rain overlay
function disableRainOverlay() {
    document.querySelectorAll('.rain').forEach(el => el.innerHTML = '');
}

// Rain animation function
function makeItRain() {
    document.querySelectorAll('.rain').forEach(el => el.innerHTML = '');
    // Add drops logic here, as in the original code.
}

// Initialize sun/moon position, ISS direction, and weather on DOM content loaded
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const userPosition = await getUserPosition();
        const { latitude, longitude } = userPosition;

        console.log("User Position:", latitude, longitude);

        startPositionUpdates(latitude, longitude);
        fetchWeather(latitude, longitude);

        updateISSDirection(userPosition);
        setInterval(() => updateISSDirection(userPosition), 10000); // Update every 10 seconds

    } catch (error) {
        console.error("Error getting user position:", error);
    }
});




//_______________________________________________________________________________________________________________________
//debugging
//_______________________________________________________________________________________________________________________

let selectedHour = null; // Variable to hold the selected hour for testing

// Function to get the current or selected time based on the dropdown value
function getCurrentTime() {
    const now = new Date();
    if (selectedHour !== null) {
        // Use the selected hour for testing
        now.setHours(selectedHour, 0, 0, 0);
    }
    return now.getTime();
}

// Update the calculation functions to use getCurrentTime()
function calculateSunPosition(sunrise, sunset) {
    const currentTime = getCurrentTime();
    if (currentTime < sunrise) return 0;
    if (currentTime > sunset) return 100;

    const totalDuration = sunset - sunrise;
    const elapsed = currentTime - sunrise;
    return (elapsed / totalDuration) * 100;
}

function calculateNightPosition(sunset, nextSunrise) {
    const currentTime = getCurrentTime();
    const totalDuration = nextSunrise - sunset;
    const elapsed = currentTime - sunset;
    return (elapsed / totalDuration) * 100;
}

// Function to handle changes in the dropdown
function handleTimeChange(event) {
    const selectedValue = event.target.value;
    selectedHour = selectedValue === "0" ? null : parseInt(selectedValue, 10);
    console.log("Selected time for testing:", selectedHour !== null ? `${selectedHour}:00` : "Current Time");

    // Refresh positions based on the new selected time
    startPositionUpdates(userLatitude, userLongitude);
}

// Function to start updating sun and moon positions
async function startPositionUpdates(latitude, longitude) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    try {
        const [yesterdayTimes, todayTimes, tomorrowTimes] = await Promise.all([
            fetchSunTimes(latitude, longitude, yesterday),
            fetchSunTimes(latitude, longitude, today),
            fetchSunTimes(latitude, longitude, tomorrow)
        ]);

        if (yesterdayTimes && todayTimes && tomorrowTimes) {
            updatePositions(yesterdayTimes, todayTimes, tomorrowTimes);
        } else {
            console.error("Error: Unable to retrieve sunrise/sunset times.");
        }
    } catch (error) {
        console.error("Error fetching sun times for updates:", error);
    }
}

// Initialize sun/moon position, ISS direction, and weather on DOM content loaded
let userLatitude, userLongitude; // Store user's latitude and longitude for reuse
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const userPosition = await getUserPosition();
        userLatitude = userPosition.latitude;
        userLongitude = userPosition.longitude;

        console.log("User Position:", userLatitude, userLongitude);

        // Start initial position updates
        startPositionUpdates(userLatitude, userLongitude);
        fetchWeather(userLatitude, userLongitude);

        // Set up the ISS direction update
        updateISSDirection(userPosition);
        setInterval(() => updateISSDirection(userPosition), 10000); // Update every 10 seconds

        // Attach event listener to the time selector dropdown
        document.getElementById("time-selector").addEventListener("change", handleTimeChange);

    } catch (error) {
        console.error("Error getting user position:", error);
    }
});


//_______________________________________________________________________________________________________________________