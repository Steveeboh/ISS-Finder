document.addEventListener('DOMContentLoaded', function() {
    const compass = document.getElementById('compass');
    const issCoordinatesElement = document.getElementById('iss-coordinates');
    const weatherStatusElement = document.getElementById('weather-status');
    const sunriseTimeElement = document.getElementById('sunrise-time');
    const sunsetTimeElement = document.getElementById('sunset-time');
    const closestApproachElement = document.getElementById('closest-approach-time');
    const nextApproachElement = document.getElementById('next-approach-time');

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

    // Fetch the ISS location from the API
    async function getISSPosition() {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await response.json();
        return {
            latitude: parseFloat(data.iss_position.latitude),
            longitude: parseFloat(data.iss_position.longitude)
        };
    }

    // Fetch the weather data from the Open-Meteo API
    async function getWeatherData(latitude, longitude) {
        const now = new Date();
        const currentDate = now.toISOString().split('T')[0];

        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weather_code&start_date=${currentDate}&end_date=${currentDate}&timezone=auto`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    }

    // Fetch sunrise and sunset times from the Sunrise-Sunset API
    async function getSunTimes(latitude, longitude) {
        const apiUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    }

    // Convert UTC time to local time
    function convertUTCToLocalTime(utcTime) {
        const date = new Date(utcTime);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Interpret the weather code to determine if it's cloudy
    function isItCloudy(weatherData) {
        const now = new Date();
        const currentHour = now.getHours();

        // Find the weather code for the current hour
        const hourIndex = weatherData.hourly.time.findIndex(time => {
            const date = new Date(time);
            return date.getHours() === currentHour;
        });

        const weatherCode = weatherData.hourly.weather_code[hourIndex];

        // Weather codes indicating cloudiness
        const cloudyCodes = [2, 3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82];

        return cloudyCodes.includes(weatherCode);
    }

    // Calculate the angle from the user's position to the ISS
    function calculateAngle(userPos, issPos) {
        const userLat = userPos.latitude * (Math.PI / 180);
        const userLon = userPos.longitude * (Math.PI / 180);
        const issLat = issPos.latitude * (Math.PI / 180);
        const issLon = issPos.longitude * (Math.PI / 180);

        const deltaLon = issLon - userLon;

        const y = Math.sin(deltaLon) * Math.cos(issLat);
        const x = Math.cos(userLat) * Math.sin(issLat) -
                  Math.sin(userLat) * Math.cos(issLat) * Math.cos(deltaLon);

        const angle = Math.atan2(y, x) * (180 / Math.PI);
        return (angle + 360) % 360; // Ensure it's a positive angle
    }

    // Fetch the ISS TLE data
    async function getISSTLE() {
        const response = await fetch('https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE');
        const data = await response.text();
        return data;
    }

    // Calculate ISS positions over the last 90 minutes
    async function calculateISSPositions(userPos) {
        const tleData = await getISSTLE();
        const tleLines = tleData.split('\n').filter(line => line.trim() !== '');
        const satrec = satellite.twoline2satrec(tleLines[1], tleLines[2]);

        const positions = [];
        const now = new Date();
        for (let i = 90; i >= 0; i -= 1) { // Every minute
            const time = new Date(now.getTime() - i * 60 * 1000);
            const positionAndVelocity = satellite.propagate(satrec, time);
            const gmst = satellite.gstime(time);
            const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, gmst);

            const latitude = satellite.degreesLat(positionGd.latitude);
            const longitude = satellite.degreesLong(positionGd.longitude);

            positions.push({ time, latitude, longitude });
        }

        // Find the closest position
        let closestDistance = Infinity;
        let closestTime = null;

        positions.forEach(pos => {
            const distance = getDistanceFromLatLonInKm(userPos.latitude, userPos.longitude, pos.latitude, pos.longitude);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestTime = pos.time;
            }
        });

        // Calculate the next predicted approach time
        const nextApproachTime = new Date(closestTime.getTime() + (1 * 60 + 27) * 60 * 1000);

        // Update the UI
        closestApproachElement.textContent = closestTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        nextApproachElement.textContent = nextApproachTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Helper function to calculate distance between two coordinates
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    // Update the compass direction, weather info, sun times, and ISS pass times
    async function updateCompassAndInfo() {
        try {
            const userPos = await getUserPosition();
            const issPos = await getISSPosition();
            const weatherData = await getWeatherData(userPos.latitude, userPos.longitude);
            const sunTimes = await getSunTimes(userPos.latitude, userPos.longitude);

            const angle = calculateAngle(userPos, issPos);

            // Rotate the compass
            compass.style.transform = `rotate(${angle}deg)`;

            // Update ISS coordinates on the page
            issCoordinatesElement.textContent = `Lat: ${issPos.latitude.toFixed(2)}, Lon: ${issPos.longitude.toFixed(2)}`;

            // Determine if it's cloudy and update the weather status
            const cloudy = isItCloudy(weatherData);
            weatherStatusElement.textContent = cloudy ? 'It is currently cloudy.' : 'It is currently clear.';

            // Convert and display sunrise and sunset times
            const sunriseLocal = convertUTCToLocalTime(sunTimes.sunrise);
            const sunsetLocal = convertUTCToLocalTime(sunTimes.sunset);

            sunriseTimeElement.textContent = sunriseLocal;
            sunsetTimeElement.textContent = sunsetLocal;

            // Calculate ISS pass times
            calculateISSPositions(userPos);

        } catch (error) {
            console.error('Error:', error);
            weatherStatusElement.textContent = 'Unable to retrieve data.';
            sunriseTimeElement.textContent = 'Unavailable';
            sunsetTimeElement.textContent = 'Unavailable';
            closestApproachElement.textContent = 'Unavailable';
            nextApproachElement.textContent = 'Unavailable';
        }
    }

    // Update the compass and info every 5 seconds
    setInterval(updateCompassAndInfo, 5000);
    updateCompassAndInfo(); // Initial call
});
