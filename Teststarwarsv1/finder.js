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
//database connection
//_______________________________________________________________________________________________________________________

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

// Function to calculate the distance between two coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
}

// Function to fetch ISS data and display the closest approach
async function fetchISSPositionData(userLatitude, userLongitude) {
    const url = 'https://im3steve.rigged-motion.com/etl/unload.php';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            let closestPosition = null;
            let minDistance = Infinity;

            data.forEach(item => {
                const issLatitude = parseFloat(item.latitude);
                const issLongitude = parseFloat(item.longitude);
                const distance = calculateDistance(userLatitude, userLongitude, issLatitude, issLongitude);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestPosition = item;
                }
            });

            if (closestPosition) {
                const closestTime = new Date(closestPosition.timestamp * 1000).toLocaleTimeString();
                document.getElementById("iss-closest-time").textContent = `Closest last Approach: ${closestTime}, Distance: ${minDistance.toFixed(2)} km`;
            }
        } else {
            document.getElementById("iss-closest-time").textContent = 'No data found for the last 2 hours.';
        }
    } catch (error) {
        console.error('Error fetching ISS data:', error);
        document.getElementById("iss-closest-time").textContent = 'Error fetching ISS data.';
    }
}

// Initialize the process on DOM load
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const userPosition = await getUserPosition();
        const { latitude, longitude } = userPosition;

        console.log("User Position:", latitude, longitude);
        fetchISSPositionData(latitude, longitude);
    } catch (error) {
        console.error("Error getting user position:", error);
        document.getElementById("iss-closest-time").textContent = 'Error fetching user position.';
    }
});



//_______________________________________________________________________________________________________________________
//debugging
//_______________________________________________________________________________________________________________________

let selectedHour = null; // Variable zur Speicherung der ausgewählten Stunde für Tests

// Funktion, um die aktuelle oder simulierte Zeit basierend auf der Dropdown-Auswahl zu erhalten
function getCurrentTime() {
    const now = new Date();
    if (selectedHour !== null) {
        // Verwende die ausgewählte Stunde für Tests
        now.setHours(selectedHour, 0, 0, 0);
    }
    return now.getTime();
}

// Funktion zur Anzeige des SVGs für Sonne oder Mond und zum Anpassen des Hintergrunds
function updateVisibility(elementId, percentage, isVisible, isNight = false) {

    console.log("updateVisibility_zeile300");

    const sunElement = document.getElementById("sun");
    const moonElement = document.getElementById("moon");
    const bodyElement = document.body;

    if (isNight) {

        console.log("Nachtmodus aktiviert");

        // Nachtmodus: Mond anzeigen, Sonne verstecken und Hintergrund schwarz setzen
        if (moonElement) {

            moonElement.style.display = isVisible ? 'block' : 'none';
            moonElement.style.setProperty('offset-distance', `${percentage}%`);
        }
        if (sunElement) {
            sunElement.style.display = 'none';
        }
        bodyElement.style.backgroundColor = 'black'; // Setze den Hintergrund auf schwarz für Nacht

        // change sunrise sunset time to night mode
        const sunriseTimeElement = document.getElementById("sunrise-time");
        const sunsetTimeElement = document.getElementById("sunset-time");

        if (sunriseTimeElement) {
            sunriseTimeElement.classList.add('night-mode');
        }
        if (sunsetTimeElement) {
            sunsetTimeElement.classList.add('night-mode');
        }



    } else {

        console.log("Tagmodus aktiviert");

        // Tagmodus: Sonne anzeigen, Mond verstecken und Hintergrund auf hell setzen
        if (sunElement) {
            sunElement.style.display = isVisible ? 'block' : 'none';
            sunElement.style.setProperty('offset-distance', `${percentage}%`);
        }
        if (moonElement) {
            moonElement.style.display = 'none';
        }
        bodyElement.style.backgroundColor = 'rgba(155, 219, 254, 1)'; // Setze den Hintergrund auf hell für Tag


        // change sunset  time to day mode
        const sunriseTimeElement = document.getElementById("sunrise-time");
        const sunsetTimeElement = document.getElementById("sunset-time");
        if (sunriseTimeElement) {
             sunriseTimeElement.classList.remove('night-mode');
         }
         if (sunsetTimeElement) {
            sunsetTimeElement.classList.remove('night-mode');
        }
    }
}

// Angepasste Funktion zur Aktualisierung der Positionen der Sonne und des Mondes basierend auf der aktuellen Zeit
function updatePositions(yesterdayTimes, todayTimes, tomorrowTimes) {
    const currentTime = getCurrentTime(); // Verwende die simulierte Zeit oder die tatsächliche aktuelle Zeit
    let percentage;

    if (currentTime >= todayTimes.sunrise && currentTime < todayTimes.sunset) {
        // Tag: Aktualisiere die Position der Sonne
        percentage = calculateSunPosition(todayTimes.sunrise, todayTimes.sunset);
        updateVisibility('sun', percentage, true, false);
    } else if (currentTime >= todayTimes.sunset && currentTime < tomorrowTimes.sunrise) {
        // Nacht: Aktualisiere die Position des Mondes (von Sonnenuntergang bis Sonnenaufgang)
        percentage = calculateNightPosition(todayTimes.sunset, tomorrowTimes.sunrise);
        updateVisibility('moon', percentage, true, true);
    } else if (currentTime >= yesterdayTimes.sunset && currentTime < todayTimes.sunrise) {
        // Nacht: Aktualisiere die Position des Mondes (von gestrigem Sonnenuntergang bis heutigem Sonnenaufgang)
        percentage = calculateNightPosition(yesterdayTimes.sunset, todayTimes.sunrise);
        updateVisibility('moon', percentage, true, true);
    } else {
        console.error("Konnte den Tag-/Nachtstatus nicht bestimmen.");
    }
}

// Funktion zum Verarbeiten von Änderungen in der Dropdown-Auswahl
function handleTimeChange(event) {
    const selectedValue = event.target.value;
    selectedHour = selectedValue === "0" ? null : parseInt(selectedValue, 10);
    console.log("Ausgewählte Uhrzeit für Tests:", selectedHour !== null ? `${selectedHour}:00` : "Aktuelle Uhrzeit");

    // Aktualisiere die Positionen basierend auf der neuen ausgewählten Zeit
    startPositionUpdates(userLatitude, userLongitude);
}

// Funktion zum Starten der Aktualisierung der Sonnen- und Mondpositionen
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
            console.error("Fehler: Sonnenaufgangs-/Sonnenuntergangszeiten konnten nicht abgerufen werden.");
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Sonnenzeiten für Updates:", error);
    }
}

// Initialisiere Sonnen-/Mondposition, ISS-Richtung und Wetter beim Laden des DOM-Inhalts
let userLatitude, userLongitude; // Speichere die Benutzerposition für die Wiederverwendung
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const userPosition = await getUserPosition();
        userLatitude = userPosition.latitude;
        userLongitude = userPosition.longitude;

        console.log("Benutzerposition:", userLatitude, userLongitude);

        // Starte die anfänglichen Positionsaktualisierungen
        startPositionUpdates(userLatitude, userLongitude);
        fetchWeather(userLatitude, userLongitude);

        // Rufe die ISS-Richtungsaktualisierung auf
        updateISSDirection(userPosition);
        setInterval(() => updateISSDirection(userPosition), 10000); // Aktualisierung alle 10 Sekunden

        // Füge den Event-Listener für die Auswahlbox hinzu
        document.getElementById("time-selector").addEventListener("change", handleTimeChange);

    } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerposition:", error);
    }
});



//_______________________________________________________________________________________________________________________