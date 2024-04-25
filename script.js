src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"

// Initialize the map with options

let mapOptions = {
    center: [19.046131663428724, 72.87089984090308],
    zoom: 16
};

let map = new L.map('map', mapOptions);

// Add a tile layer
let layer = new L.TileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

// Add marker for the first location
let marker1 = new L.Marker([19.046131663428724, 72.87089984090308]);
marker1.addTo(map);

// Add marker for the second location with additional functionality
let taxiIcon = L.icon({
    iconUrl: 'mapcar1.png',
    iconSize: [40, 40]
    
});
let marker2 = L.marker([19.046131663428724, 72.87089984090308], { icon: taxiIcon }).addTo(map);

map.on('click', function (e) {
    console.log(e);
    let newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    L.Routing.control({
        waypoints: [
            L.latLng(19.046131663428724, 72.87089984090308),
            L.latLng(e.latlng.lat, e.latlng.lng)
        ]
    }).on('routesfound', function (e) {
        let routes = e.routes;
        console.log(routes);

        e.routes[0].coordinates.forEach(function (coord, index) {
            setTimeout(function () {
                marker2.setLatLng([coord.lat, coord.lng]);
            }, 100 * index)
        });
    }).addTo(map);
});
// risky shit

//ends here

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="university icon.png" width="52" height="64">',
        className: 'custom-icon',
        iconSize: [52, 74],
    }
});

var Your_College = L.marker([19.046131663428724, 72.87089984090308], {
    icon: new CustomDivIcon()
}).addTo(map);

Your_College.bindPopup('KJ Somaiya Institute of Technology');
Your_College.on('click', function () {
    Your_College.openPopup();
});

/* Here starts the Food Hotel*/
// Food locations
var foodLocations = [
    { name: "Shree SiddhiVinayak Food Stall", displayName: "VEG Hotel", foodType: "veg", latlng: [19.04553044500317, 72.86492176579526] },
    { name: "sadguru snacks", displayName: "VEG Hotel", foodType: "veg", latlng: [19.055633188171623, 72.876257014196] },
    { name: "Agarwal Fast Food", displayName: "VEG Hotel", foodType: "veg", latlng: [19.03537403199731, 72.86513274602355] },
    { name: "Chawla Fast Food & Snacks", displayName: "VEG Hotel", foodType: "veg", latlng: [19.03738450299589, 72.86293425263196] },
    { name: "Mahalaxmi Juice & Food Corner", displayName: "VEG Hotel", foodType: "veg", latlng: [19.041385267992997, 72.86595462775105 ] },
    { name: "kulswami vadapav shop", displayName: "VEG Hotel", foodType: "veg", latlng: [19.05570895039088, 72.86987417050908 ] },
    { name: "R.K. Chana Pav Bhaji Center", displayName: "VEG Hotel", foodType: "veg", latlng: [19.04516713670521, 72.86295727445737 ] },
    { name: "GuruKrupa Sandwich", displayName: "VEG Hotel", foodType: "veg", latlng: [19.044706635263708, 72.86357547591236 ] },
    { name: "shreeji foods", displayName: "VEG Hotel", foodType: "veg", latlng: [19.053900415923707, 72.87060792698274 ] },

    //VEG ENDS

    { name: "Sardar Paya House", displayName: "NON-VEG Hotel", foodType: "non-veg", latlng: [19.035467855756455, 72.86290773374125] },
    { name: "modern lunch home", displayName: "NON-VEG Hotel", foodType: "non-veg", latlng: [19.0462072369028, 72.86424638485835] },
    { name: "Sion Home Lunch", displayName: "NON-VEG Hotel", foodType: "non-veg", latlng: [19.045884650347883, 72.8642866001831 ] },
   
    
    //NON-VEG ENDS

    { name: "hotel sagar", displayName: "VEG/NON_VEG Hotel", foodType: "both", latlng: [19.047930319781322, 72.86463941057836 ] },
    { name: "Aai Ekveera Family Restaurant", displayName: "VEG/NON_VEG Hotel", foodType: "both", latlng: [19.054059750883226, 72.87476669551565 ] },
    { name: "Koliwada Chicken & Fish Fry Corner", displayName: "VEG/NON_VEG Hotel", foodType: "both", latlng: [19.052722542737012, 72.87539168762012 ] },
    //{ name: "Food Fancy Restro Café", displayName: "VEG/NON_VEG Hotel", foodType: "both", latlng: [19.04504392999007, 72.87095652568696] },
    { name: "the food corner", displayName: "VEG/NON_VEG Hotel", foodType: "both", latlng: [ 19.046138935968575, 72.86522217321058] },
    { name: "McDonald's", displayName: "VEG/NON_VEG Hotel", foodType: "both", latlng: [19.04650426915672, 72.86339911183039] },
    { name: "the forest wales", displayName: "VEG/NON_VEG Hotel", foodType: "both", latlng: [ 19.044027673830946, 72.872297516661] },
    
    //BOTH ENDS
];

// Icon URLs for different food types
var iconUrls = {
    'veg': 'veg1.png', // URL for veg icon
    'non-veg': 'nonveg1.png', // URL for non-veg icon
    'both': 'hotel1.png' // URL for both icon
};

// Create checkboxes for distinct food types
var filtersContainer = document.getElementById('filters-container');

// Extract distinct food types
var distinctFoodTypes = [...new Set(foodLocations.map(location => location.foodType))];

distinctFoodTypes.forEach(function(foodType) {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = foodType;
    checkbox.value = foodType;
    checkbox.checked = true; // Initially checked
    var label = document.createElement('label');
    label.htmlFor = foodType;
    label.appendChild(document.createTextNode(foodType.toUpperCase()));

    filtersContainer.appendChild(checkbox);
    filtersContainer.appendChild(label);

    checkbox.addEventListener('change', function() {
        var locationsToShow = foodLocations.filter(location => location.foodType === foodType);
        if (this.checked) {
            // Show the markers for this food type
            locationsToShow.forEach(location => map.addLayer(location.marker));
        } else {
            // Hide the markers for this food type
            locationsToShow.forEach(location => map.removeLayer(location.marker));
        }
    });
});

// Create markers for each food location
foodLocations.forEach(function(location) {
    // Get the icon URL based on food type
    var iconUrl = iconUrls[location.foodType];
    // Create custom icon
    var customIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [39, 39], // Adjust the size as needed
        iconAnchor: [16, 32], // Adjust the anchor point if needed
        popupAnchor: [0, -32] // Adjust the popup anchor if needed
    });

    // Create marker with custom icon
    var marker = L.marker(location.latlng, { icon: customIcon }).addTo(map);
    location.marker = marker;
    marker.bindPopup(location.name + '<br>Food Type: ' + location.foodType);
});


/* Here Ends the Food Hotel*/



var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="green color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var panbajar = L.marker([19.04945, 72.87590], {
    icon: new CustomDivIcon()
}).addTo(map);

panbajar.bindPopup('Pan Bajar Society');

panbajar.on('click', function () {
    panbajar.openPopup();
});
 
var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="green color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Everard_Nagar = L.marker([19.050582579883027, 72.87575004602321], {
    icon: new CustomDivIcon()
}).addTo(map);

Everard_Nagar.bindPopup('Everard Nagar');

Everard_Nagar.on('click', function () {
    Everard_Nagar.openPopup();
});


 
var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="green color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Om_trimurti_Society = L.marker([19.051517568115568, 72.87467013893928], {
    icon: new CustomDivIcon()
}).addTo(map);

Om_trimurti_Society.bindPopup('Om trimurti Society');

Om_trimurti_Society.on('click', function () {
    Om_trimurti_Society.openPopup();
});



var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="green color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Lohana_Vidhyarthi_Bhavan = L.marker([19.021893762342003, 72.85719471959693], {
    icon: new CustomDivIcon()
}).addTo(map);

Lohana_Vidhyarthi_Bhavan.bindPopup('Lohana Vidhyarthi Bhavan');

Lohana_Vidhyarthi_Bhavan.on('click', function () {
    Lohana_Vidhyarthi_Bhavan.openPopup();
});


var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="green color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var KJ_Somaiya_Hostel = L.marker([19.04656720891823, 72.87353982951349], {
    icon: new CustomDivIcon()
}).addTo(map);

KJ_Somaiya_Hostel.bindPopup('KJ Somaiya Hostel');

KJ_Somaiya_Hostel.on('click', function () {
    KJ_Somaiya_Hostel.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="home-rent-.png" width="15" height="34">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="home-rent-.png" width="15" height="34">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});
var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="red color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Pajasa_Apartments = L.marker([19.12339, 72.91274], {
    icon: new CustomDivIcon()
}).addTo(map);

Pajasa_Apartments.bindPopup('Pajasa Apartments');

Pajasa_Apartments.on('click', function () {
    Pajasa_Apartments.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="red color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Scorpio_House = L.marker([19.11933, 72.91227], {
    icon: new CustomDivIcon()
}).addTo(map);

Scorpio_House.bindPopup('Scorpio House');

Scorpio_House.on('click', function () {
    Scorpio_House.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="red color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Andheri_East_Apartments = L.marker([19.11746, 72.88374], {
    icon: new CustomDivIcon()
}).addTo(map);

Andheri_East_Apartments.bindPopup('East Apartments');

Andheri_East_Apartments.on('click', function () {
    Andheri_East_Apartments.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="red color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Aghadi_Nagar_CHS = L.marker([19.16278, 72.93287], {
    icon: new CustomDivIcon()
}).addTo(map);

Aghadi_Nagar_CHS.bindPopup('Aghadi Nagar CHS');

Aghadi_Nagar_CHS.on('click', function () {
    Aghadi_Nagar_CHS.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="yellow color.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Irel_Officers_Apartment = L.marker([19.0959, 72.91356], {
    icon: new CustomDivIcon()
}).addTo(map);

Irel_Officers_Apartment.bindPopup('Irel Officers Apartment');

Irel_Officers_Apartment.on('click', function () {
    Irel_Officers_Apartment.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="yellow color.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Vic_Mon_B_Wing = L.marker([19.0959, 72.91356], {
    icon: new CustomDivIcon()
}).addTo(map);

Vic_Mon_B_Wing.bindPopup('Vic Mon B Wing');

Vic_Mon_B_Wing.on('click', function () {
    Vic_Mon_B_Wing.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="red color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Ramkrishna = L.marker([19.1665, 72.95585], {
    icon: new CustomDivIcon()
}).addTo(map);

Ramkrishna.bindPopup('Ramkrishna');

Ramkrishna.on('click', function () {
    Ramkrishna.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="green color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Skiffle_CHSr = L.marker([19.07814, 72.91175], {
    icon: new CustomDivIcon()
}).addTo(map);

Skiffle_CHSr.bindPopup('Skiffle CHS');

Skiffle_CHSr.on('click', function () {
    Skiffle_CHSr.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="red color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Ganash = L.marker([19.1718, 72.95568], {
    icon: new CustomDivIcon()
}).addTo(map);

Ganash.bindPopup('Skiffle CHS');

Ganash.on('click', function () {
    Ganash.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="red color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Royal_Palms_Properties = L.marker([19.16285, 72.85787], {
    icon: new CustomDivIcon()
}).addTo(map);

Royal_Palms_Properties.bindPopup('Royal Palms Estate & Properties');

Royal_Palms_Properties.on('click', function () {
    Royal_Palms_Properties.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="red color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Sana_Guest_House = L.marker([19.16285, 72.85787], {
    icon: new CustomDivIcon()
}).addTo(map);

Sana_Guest_House.bindPopup('Sana Guest House');

Sana_Guest_House.on('click', function () {
    Sana_Guest_House.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="red color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Twinkle_Service_Apartment = L.marker([19.1462, 72.8459], {
    icon: new CustomDivIcon()
}).addTo(map);

Twinkle_Service_Apartment.bindPopup('Twinkle Service Apartment');

Twinkle_Service_Apartment.on('click', function () {
    Twinkle_Service_Apartment.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="yellow color.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Bandys_Riversong = L.marker([19.10781, 72.84909], {
    icon: new CustomDivIcon()
}).addTo(map);

Bandys_Riversong.bindPopup("Bandy's Riversong");

Bandys_Riversong.on('click', function () {
    Bandys_Riversong.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="yellow color.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var Strawberry_Vacations = L.marker([19.09623, 72.85419], {
    icon: new CustomDivIcon()
}).addTo(map);

Strawberry_Vacations.bindPopup("Strawberry Vacations");

Strawberry_Vacations.on('click', function () {
    Strawberry_Vacations.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="red color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var BBJ_Verona_Proposed = L.marker([19.14887, 72.83901], {
    icon: new CustomDivIcon()
}).addTo(map);

BBJ_Verona_Proposed.bindPopup("BBJ Verona Proposed");

BBJ_Verona_Proposed.on('click', function () {
    BBJ_Verona_Proposed.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="yellow color.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var La_Maison_Hospitality = L.marker([19.10186, 72.84553], {
    icon: new CustomDivIcon()
}).addTo(map);

La_Maison_Hospitality.bindPopup("La Maison Hospitality");

La_Maison_Hospitality.on('click', function () {
    La_Maison_Hospitality.openPopup();
});

var CustomDivIcon = L.DivIcon.extend({
    options: {
        html: '<img src="green color house.png" width="150" height="50">',
        className: 'custom-icon',
        iconSize: [22, 44],
    }
});

var LOTUS_Colony_Aarogy_Kendra = L.marker([19.06441, 72.91849], {
    icon: new CustomDivIcon()
}).addTo(map);

LOTUS_Colony_Aarogy_Kendra.bindPopup("LOTUS Colony Aarogy Kendra");

LOTUS_Colony_Aarogy_Kendra.on('click', function () {
    LOTUS_Colony_Aarogy_Kendra.openPopup();
});