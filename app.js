window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

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

                    let celsius = (temp - 32) * (5 / 9);
                    //Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () =>{
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temp;
                        }
                    })

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