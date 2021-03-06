window.onload = function() {
    var isMobile = screen.width < 768;
    if (!isMobile) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiY3Nza2luZyIsImEiOiJjank0anpnaXowMDNiM2JwNnpnYXhlcGZ1In0.JqaN0QdsUpWPbwvS7vdN9A';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-9.427270, 38.699050],
            zoom: 18
        });

        map.scrollZoom.disable();
        map.addControl(new mapboxgl.NavigationControl(), 'top-left');
        var marker = new mapboxgl.Marker();
        marker.setLngLat([-9.427870, 38.699050]);
        marker.addTo(map);
    }
}
