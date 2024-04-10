
// Crete map object to display.
const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},

    // build leaflet map.
    buildMap() {
        this.map = L.map('map', {
            center: this.coordinates,
            zoom: 11,
        });
        // add open street map tiles.
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            minZoom: '15',
        }).addTo(this.map)
        // create and add geolocation marker.
        const marker = L.marker(this.coordinates)
        marker
            .addTo(this.map)
            .bindPopup('<p1><b>You are here</b><br></p1>')
            .openPopup()
    },

    // todo: integrate the business markers.
    addMarkers() {
        for (let i = 0; i < this.businesses.length; i++) {
            this.markers = L.marker([
                this.businesses[i].lat,
                this.businesses[i].long,
            ])
                .bindPopup(`<p1>${this.businesses[i].name}</p1>`)
                .addTo(this.map)
        }
    },
}

// get coordinates by geolocation API.
async function getCoords() {
    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    return [position.coords.latitude, position.coords.longitude]
}

// todo get foursquare businesses
async function getFoursquare(business) {
	const options = {
		method: 'GET',
		headers: {
		Accept: 'application/json',
        // Foursquare authorization API key!
		Authorization: 'fsq38prU02q5lmc3fmmr41Rv6Pp2RWCOdUlRxm5piiqOppI='
		}
	}
    fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=coffee&limit=5&ll=41.8781%2C-87.6298`, options)
	let limit = 11
	let lat = myMap.coordinates[0]
	let lon = myMap.coordinates[1]
	let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=
    ${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses
}

// todo process 'foursquare' array
function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}

// event handlers.
// window load.
window.onload = async () => {
    const coords = await getCoords()
    myMap.coordinates = coords
    myMap.buildMap()
}

// Select the 'business' submit button and 'select' element.
document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault()
    // Get the select element 
    let business = document.getElementById('business').value
    console.log(business)
    let data = await getFoursquare(business)
	myMap.businesses = processBusinesses(data)
	myMap.addMarkers()
})

