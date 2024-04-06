console.log(`Hello World!`)

//! Map Section.
// Initialize the map.
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);

//! Select Business Finder Section.

//? Get Each option in Console.
// let collectList = document.getElementById('business-finder')

// for (let i = 0; i < collectList.options.length; i++) {
//     let optionText = collectList.options[i].textContent;
//     console.log(optionText)
// }


// function businessSelection() {
    
// }
