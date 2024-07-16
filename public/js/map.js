mapboxgl.accessToken = mapToken;
map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    style: "mapbox://styles/mapbox/standard",
    zoom: 11 // starting zoom
    /*
    mapbox://styles/mapbox/standard
    mapbox://styles/mapbox/streets-v12
    mapbox://styles/mapbox/outdoors-v12
    mapbox://styles/mapbox/light-v11
    mapbox://styles/mapbox/dark-v11
    mapbox://styles/mapbox/satellite-streets-v12
    mapbox://styles/mapbox/satellite-v9
    mapbox://styles/mapbox/navigation-day-v1
    mapbox://styles/mapbox/navigation-night-v1
    */
});
console.log(`Coordinates are : ${listing.geometry.coordinates}`)

// Create a default Marker and add it to the map.
marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h4>${listing.title}</h4><p>Exact location will be provided after booking.</p>`))
    .addTo(map);

