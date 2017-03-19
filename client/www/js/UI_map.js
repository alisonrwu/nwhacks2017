var locations;

var UI = (function($) {
    var cordovaReady = false;
    var jQueryReady = false;
    function markCordovaReady() {
        cordovaReady = true;
        if(jQueryReady) setupUI();
    }
    
    function markjQueryReady() {
        jQueryReady = true;
        if(cordovaReady) setupUI();
    }
    
    function setupUI() {
        $(".menu-button").click(SIDEBAR.open);
        $(".sidebar .fade").click(SIDEBAR.close);

        refreshMap();
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                  'Error: The Geolocation service failed.' :
                  'Error: Your browser doesn\'t support geolocation.');
    }

    function refreshMap() {
        CordovaInterface.getPosition(refreshMap_getPosition);
    }
    
    function refreshMap_getPosition(position) {
        DATABASE.loadMap(position.coords.latitude, position.coords.longitude, refreshMap_processLocations);
    }
    
    function refreshMap_processLocations(json) {
        console.log(json);
        locations = json;
        // for(var key in json) {
            // var obj = json[key];
            // LIST_VIEW.addPost(obj.id, obj.content);
            // DATABASE.loadComments(obj.id, refreshPosts_processComments);
        // }
    }
    
    return {
        markCordovaReady:markCordovaReady,
        markjQueryReady:markjQueryReady
    }
})(jQuery);


function initMap() {
    var locations = [{lat: -25.363, lng: 131.044}, {lat: -24.363, lng: 130.044}];
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: locations[0]
    });

    for(var loc of locations){
        var marker = new google.maps.Marker({
            position: loc,
            map: map
        });
    }
}


$(document).ready(function (e) {
    UI.markjQueryReady();
});

