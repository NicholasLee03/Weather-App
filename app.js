window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=PYY3W5TNGB27EP9R5Y2K47VPM`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temp, conditions, icon } = data.currentConditions;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = conditions;
                    locationTimezone.textContent = data.timezone;
                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));
                });
        });
    } else {
        h1.textContent = "Please allow location services";
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});