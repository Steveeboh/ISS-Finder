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
