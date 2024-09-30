// finder.js

// Select commonly used elements
const body = document.querySelector('body');
let url = 'https://api.sunrise-sunset.org/json?lat=46.94798&lng=7.44743&date=today&tzid=Europe/Zurich&formatted=0';
let tzid = 'Europe/Zurich';
const select = document.querySelector('#city-select');

const sunArc = document.getElementById('sun-arc');
const sunElement = document.getElementById('sun');
const moonElement = document.getElementById('moon');

// Fetch data from the Sunrise-Sunset API
async function fetchData(url, tzid) {
    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.results) {
            document.querySelector('#sunrise-time').textContent = `${data.results.sunrise}`.slice(11, 16);
            document.querySelector('#sunset-time').textContent = `${data.results.sunset}`.slice(11, 16);
            document.querySelector('#current-time').textContent = moment().tz(`${tzid}`).format('HH:mm');
        }
        console.log(data);
        return data;

    } catch (error) {
        console.log(error);
    }
}
fetchData(url, tzid);

// List of cities with their coordinates and time zones
let cities = [
    {
        name: 'bern',
        displayName: 'Bern',
        lat: 46.94798,
        lng: 7.44743,
        tzid: 'Europe/Zurich'
    },
    {
        name: 'losangeles',
        displayName: 'Los Angeles',
        lat: 34.052235,
        lng: -118.243683,
        tzid: 'America/Los_Angeles'
    },
    {
        name: 'tokyo',
        displayName: 'Tokyo',
        lat: 35.652832,
        lng: 139.839478,
        tzid: 'Asia/Tokyo'
    },
    // Add other cities as needed...
];

// Populate the city selection dropdown
function populateCitySelect() {
    cities.forEach(city => {
        let option = document.createElement('option');
        option.value = city.name;
        option.textContent = city.displayName;
        select.appendChild(option);
    });
}
populateCitySelect();

// Update data when the selected city changes
select.addEventListener('change', async function () {
    let city = cities.find(city => city.name === select.value);
    let url = `https://api.sunrise-sunset.org/json?lat=${city.lat}&lng=${city.lng}&date=today&tzid=${city.tzid}&formatted=0`;
    let tzid = city.tzid;
    await fetchData(url, tzid);
    angleSunAndRadius(url, tzid);
});

updateCurrentTime(); // Display current time at the location
setInterval(updateCurrentTime, 1000); // Update the time every second

// Get the current time at the location
function updateCurrentTime() {
    const city = cities.find(city => city.name === select.value);
    document.querySelector('#current-time').textContent = moment().tz(`${city.tzid}`).format('HH:mm');
}

// Calculate the sun's angle and radius
async function angleSunAndRadius(url, tzid) {
    const radius = sunArc.getBoundingClientRect().width / 2; // Calculate the radius of the circle

    try {
        let response = await fetch(url);
        let data = await response.json();
        if (data.results) {
            const sunrise = new Date(data.results.sunrise);
            const sunset = new Date(data.results.sunset);
            const now = moment().tz(`${tzid}`);

            const dayLength = (sunset - sunrise) / (1000 * 60); // Day length in minutes
            const elapsedMinutes = (now - sunrise) / (1000 * 60); // Minutes since sunrise
            const percentage = (elapsedMinutes / dayLength) * 100; // Percentage of the day passed

            const angleSun = (percentage * 1.8) - 180; // Convert percentage to degrees
            console.log('Sun angle:', angleSun + 180);
            moveCelestialBody(angleSun, radius, sunElement);
            moveMoon(angleSun, radius);
            visualChange(angleSun);
        }
    } catch (error) {
        console.log(error);
    }
}
angleSunAndRadius(url, tzid);

// Determine shift values based on screen size
function getShiftValues() {
    if (window.matchMedia("(max-width: 768px) and (min-width: 601px)").matches) {
        return { shiftX: -30, shiftY: 60 };
    } else if (window.matchMedia("(max-width: 600px) and (min-width: 451px)").matches) {
        return { shiftX: -25, shiftY: 50 };
    } else if (window.matchMedia("(max-width: 450px)").matches) {
        return { shiftX: -25, shiftY: 50 };
    } else {
        // Default shift values
        return { shiftX: -40, shiftY: 85 };
    }
}

// Move a celestial body (sun or moon)
function moveCelestialBody(angle, radius, element) {
    const radians = angle * Math.PI / 180; // Convert degrees to radians
    const { shiftX, shiftY } = getShiftValues();
    const x = (sunArc.getBoundingClientRect().width / 2 + radius * Math.cos(radians)) + shiftX;
    const y = (sunArc.getBoundingClientRect().height / 2 + radius * Math.sin(radians)) + shiftY;

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
}

// Move the moon
function moveMoon(angleSun, radius) {
    let angleMoon = angleSun - 180;
    moveCelestialBody(angleMoon, radius, moonElement);
}

// Change visuals based on the time of day
async function visualChange(angleSun) {
    angleSun = angleSun + 180;

    // Sunrise
    if (angleSun < 10 && angleSun > -10) {
        body.style.background = 'linear-gradient(180deg, #FFEB3B 0%, #F29C6B 50%, #BF5A75 100%)';
        body.className = '';
        sunElement.style.display = 'block';
        moonElement.style.display = 'none';
    }
    // Sunset
    else if (angleSun > 170 && angleSun < 190) {
        body.style.background = 'linear-gradient(180deg, #E8E172 0%, #FFA338 50%, #E83331 100%)';
        body.className = '';
        sunElement.style.display = 'block';
        moonElement.style.display = 'none';
    }
    // Daytime
    else if (angleSun > 10 && angleSun < 170) {
        body.style.background = 'linear-gradient(180deg, #0669BF 0%, #5EBAF2 50%, #99D9F2 100%)';
        body.className = '';
        sunElement.style.display = 'block';
        moonElement.style.display = 'none';
    }
    // Nighttime
    else {
        body.style.background = 'linear-gradient(180deg, #02070D 0%, #122A40 50%, #193B59 100%)';
        body.className = 'night';
        sunElement.style.display = 'none';
        moonElement.style.display = 'block';
        // Update sunrise and sunset times for the next day
        try {
            let response = await fetch(url);
            let data = await response.json();
            if (data.results) {
                document.querySelector('#sunrise-time').textContent = `${data.results.sunrise}`.slice(11, 16);
                document.querySelector('#sunset-time').textContent = `${data.results.sunset}`.slice(11, 16);
            }
        } catch (error) {
            console.log(error);
        }
    }
}
