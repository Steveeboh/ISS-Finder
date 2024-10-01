// Get the user's position
function getUserPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                error => reject(error)
            );
        } else {
            reject('Geolocation is not supported by this browser.');
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch sunrise and sunset times from the API
    function fetchSunTimes(latitude, longitude) {
        const apiUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;

        return fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Fetch sunrise and sunset times in UTC
                const sunriseUTC = new Date(data.results.sunrise).getTime();
                const sunsetUTC = new Date(data.results.sunset).getTime();

                // Get timezone offset in milliseconds
                const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

                // Subtract 2 hours (in milliseconds) to adjust the time
                const twoHours = 2 * 60 * 60 * 1000;

                // Convert UTC to local time and subtract 2 hours
                const sunriseLocal = new Date(sunriseUTC - timezoneOffset - twoHours);
                const sunsetLocal = new Date(sunsetUTC - timezoneOffset - twoHours);

                // Log times for debugging
                console.log("Sunrise Local:", sunriseLocal, "Sunset Local:", sunsetLocal);

                // Update the sunrise and sunset times on the page
                document.getElementById("sunrise-time").textContent = `Sunrise: ${sunriseLocal.toLocaleTimeString()}`;
                document.getElementById("sunset-time").textContent = `Sunset: ${sunsetLocal.toLocaleTimeString()}`;

                return { sunrise: sunriseLocal.getTime(), sunset: sunsetLocal.getTime() };
            })
            .catch((error) => {
                console.error("Error fetching sun times:", error);
            });
    }

    // Function to calculate the percentage of the day that has passed between sunrise and sunset
    function calculateSunPosition(sunrise, sunset) {
        const currentTime = new Date().getTime(); // Local time

        console.log("Current Time (Local):", new Date(currentTime)); // Debugging log

        if (currentTime < sunrise) return 0; // Before sunrise
        if (currentTime > sunset) return 100; // After sunset

        const totalDayDuration = sunset - sunrise;
        const currentDayDuration = currentTime - sunrise;

        const percentage = (currentDayDuration / totalDayDuration) * 100;
        console.log("Calculated Percentage:", percentage); // Debugging log
        return percentage;
    }

    // Function to update the offset-distance of the sun based on the percentage
    function updateSunPosition(percentage) {
        const sunElement = document.getElementById("sun");
        const percentageDisplay = document.getElementById("percentage-display"); // Get the percentage display element

        if (sunElement) {
            // Apply offset-distance using setProperty
            sunElement.style.setProperty('offset-distance', `${percentage}%`);
            console.log("Updated offset-distance style:", sunElement.style.offsetDistance); // Debugging log

            // Update the percentage on the page
            if (percentageDisplay) {
                percentageDisplay.textContent = `Sun Position: ${percentage.toFixed(2)}%`;
            }
        } else {
            console.error("Sun element not found!");
        }
    }

    // Function to repeatedly update the sun's position
    function startSunPositionUpdate(latitude, longitude) {
        fetchSunTimes(latitude, longitude).then((times) => {
            if (times) {
                const sunPositionPercentage = calculateSunPosition(times.sunrise, times.sunset);
                updateSunPosition(sunPositionPercentage);
            } else {
                console.error("Error: Sunrise/sunset times not available");
            }
        });

        // Update the position every minute (60000 milliseconds)
        setInterval(() => {
            fetchSunTimes(latitude, longitude).then((times) => {
                if (times) {
                    const sunPositionPercentage = calculateSunPosition(times.sunrise, times.sunset);
                    updateSunPosition(sunPositionPercentage);
                }
            });
        }, 60000);
    }

    // Get the user's location and start updating sun position
    getUserPosition()
        .then(position => {
            const { latitude, longitude } = position;
            console.log("User Position:", latitude, longitude);
            startSunPositionUpdate(latitude, longitude);
        })
        .catch(error => {
            console.error("Error getting user position:", error);
        });
});

// Get the ISS current position
function fetchISSPosition() {
    const issApiUrl = "http://api.open-notify.org/iss-now.json";
    return fetch(issApiUrl)
        .then(response => response.json())
        .then(data => ({
            latitude: parseFloat(data.iss_position.latitude),
            longitude: parseFloat(data.iss_position.longitude),
        }))
        .catch(error => {
            console.error("Error fetching ISS position:", error);
        });
}

// Calculate the direction between two points (user and ISS) using their latitudes and longitudes
function calculateDirection(userLat, userLon, issLat, issLon) {
    const latDifference = issLat - userLat;
    const lonDifference = issLon - userLon;
    const angle = Math.atan2(lonDifference, latDifference) * (180 / Math.PI);

    if (angle >= -22.5 && angle < 22.5) {
        return "North";
    } else if (angle >= 22.5 && angle < 67.5) {
        return "Northeast";
    } else if (angle >= 67.5 && angle < 112.5) {
        return "East";
    } else if (angle >= 112.5 && angle < 157.5) {
        return "Southeast";
    } else if (angle >= 157.5 || angle < -157.5) {
        return "South";
    } else if (angle >= -157.5 && angle < -112.5) {
        return "Southwest";
    } else if (angle >= -112.5 && angle < -67.5) {
        return "West";
    } else if (angle >= -67.5 && angle < -22.5) {
        return "Northwest";
    }
}

// Update the ISS direction on the page
function updateISSDirection(userPosition) {
    fetchISSPosition().then(issPosition => {
        if (issPosition) {
            const direction = calculateDirection(userPosition.latitude, userPosition.longitude, issPosition.latitude, issPosition.longitude);
            document.getElementById("iss-direction").textContent = `${direction}`;
        }
    });
}

// Get the user's location and start updating ISS direction
getUserPosition()
    .then(userPosition => {
        // Update ISS direction initially and every 10 seconds
        updateISSDirection(userPosition);
        setInterval(() => updateISSDirection(userPosition), 10000); // Update every 10 seconds
    })
    .catch(error => {
        console.error("Error getting user position:", error);
    });

// Fetch weather data and update the appearance
function fetchWeather(latitude, longitude) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Get the current weather code from the API response
            const weatherCode = data.current_weather.weathercode;

            console.log("Weather Code:", weatherCode); // For debugging

            // Call the function to update the appearance based on the weather code
            updateWeatherAppearance(weatherCode);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
}

// Update the website's appearance based on the weather code
function updateWeatherAppearance(weatherCode) {
    const bodyElement = document.body;
    const weatherSvgContainer = document.getElementById('svg-container2');

    // Clear previous weather classes
    bodyElement.classList.remove('sunny-weather', 'cloudy-weather', 'rainy-weather');
    weatherSvgContainer.innerHTML = ''; // Clear the previous weather SVG

    console.log(weatherCode);

    // Determine the weather state based on the weather code
    if (weatherCode >= 0 && weatherCode <= 3) {
        // Good weather (sunny)
        bodyElement.classList.add('sunny-weather');
        bodyElement.style.backgroundColor = 'rgba(155, 219, 254, 1)';
        weatherSvgContainer.innerHTML = '<img src="SVG/Wolken sonnig.svg" alt="Sunny">';

        disableRainOverlay(); // Disable rain overlay if it was enabled
    } else if (weatherCode >= 45 && weatherCode <= 48) {
        // Cloudy weather
        bodyElement.classList.add('cloudy-weather');
        bodyElement.style.backgroundColor = 'rgba(170, 210, 231, 1)';
        weatherSvgContainer.innerHTML = '<img src="SVG/Wolken bewölkt.svg" alt="Cloudy">';

        disableRainOverlay(); // Disable rain overlay if it was enabled
    } else if (weatherCode >= 61 && weatherCode <= 67 || weatherCode >= 80 && weatherCode <= 82) {
        // Rainy weather
        bodyElement.classList.add('rainy-weather');
        bodyElement.style.backgroundColor = 'rgba(180, 204, 217, 1)';
        weatherSvgContainer.innerHTML = '<img src="SVG/Wolken bewölkt.svg" alt="Rainy">';
        
        // Apply the rain effect overlay
        enableRainOverlay();
    } else {
        // Default to cloudy weather if unrecognized code
        bodyElement.classList.add('cloudy-weather');
        bodyElement.style.backgroundColor = 'rgba(170, 210, 231, 1)';
        weatherSvgContainer.innerHTML = '<img src="SVG/Wolken bewölkt.svg" alt="Cloudy">';

        disableRainOverlay(); // Disable rain overlay if it was enabled
    }
}

// Enable rain overlay when it’s rainy
function enableRainOverlay() {
    const rainOverlay = `
        <div class="rain front-row"></div>
        <div class="rain back-row"></div>
        <div class="toggles">
            <div class="splat-toggle toggle active"></div>
            <div class="back-row-toggle toggle active"><br></div>
            <div class="single-toggle toggle"></div>
        </div>`;
    
    document.body.innerHTML += rainOverlay;
    makeItRain();
}

function disableRainOverlay() {
    document.querySelectorAll('.rain').forEach(el => el.innerHTML = '');
}

// Get the user's location and fetch weather data
getUserPosition()
    .then(position => {
        const { latitude, longitude } = position;
        fetchWeather(latitude, longitude); // Fetch weather based on user's position
    })
    .catch(error => {
        console.error("Error getting user position:", error);
    });

// Rain animation function (Make it Rain)
var makeItRain = function () {
    // clear out everything
    document.querySelectorAll('.rain').forEach(el => el.innerHTML = '');

    var increment = 0;
    var drops = "";
    var backDrops = "";

    while (increment < 100) {
        // couple random numbers to use for various randomizations
        var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
        var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));

        increment += randoFiver;

        drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
        backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }

    document.querySelector('.rain.front-row').innerHTML = drops;
    document.querySelector('.rain.back-row').innerHTML = backDrops;
};


