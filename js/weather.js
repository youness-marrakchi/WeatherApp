
window.addEventListener("load", () => {
        let long;
        let lat;
        let locationName = document.querySelector('.location-name');
        let deg_section = document.querySelector('.deg_section');
        let deg_span = document.querySelector('.deg_section span');
        let degree = document.querySelector('.degree');
        let description = document.querySelector('.description');
    
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;
    
                const Key = '0fc46917a79daaf6692c4e7fd6ecacea'; // create a darksky account to get your KEY
                const proxy = 'https://cors-anywhere.herokuapp.com/';
                // This proxy is being used to bypass the blockage of the api | (since access to the darksky api is restricted through an APP)
                const api = `${proxy}https://api.darksky.net/forecast/${Key}/${lat},${long}`;
    
                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        // console.log(data);
                        const {temperature, summary, icon} = data.currently;
                        
                        setter(temperature, summary, data.timezone);
                        setIcon(icon, document.querySelector(".icon"));
                        // changing the Units
                        deg_section.addEventListener('click', () => {
                            
                            if (deg_span.textContent === "°F") {
                                deg_span.textContent = "°C";
                                let cDeg = (temperature - 32) * (5 / 9);
                                degree.innerText = Math.floor(cDeg);
                            } else {
                                deg_span.textContent = "°F";
                                degree.innerText = temperature;
                            }
                        });
                    });
            });
        } else {
            alert('Error, please give chrome access to your position.')
        }

        function setter(temp, summ, tz) {
            degree.innerText = temp;
            description.innerText = summ;
            locationName.innerText = tz;
        }
        // check SKYCONS' documentation
        function setIcon(icon, iconId) {
            const skycons = new Skycons({color: "white"}); // Initiating the class
            const theIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            skycons.add(iconId, Skycons.something);
            return skycons.set(iconId, Skycons[theIcon]);
        }
});