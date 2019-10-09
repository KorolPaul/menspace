if (!screen.width < 768) {
    var mapScript = document.createElement('script');
    mapScript.setAttribute('src','https://api.mapbox.com/mapbox-gl-js/v1.0.0/mapbox-gl.js');
    document.body.appendChild(mapScript);
}
