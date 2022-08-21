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
                    console.log(data);
                    const { temp, conditions } = data.currentConditions;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = conditions;
                });
        });
    } else {
        h1.textContent = "Please allow location services";
    }
});