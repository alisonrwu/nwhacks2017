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
        for(var key in json[0]){
            json[0][key]=parseFloat(json[0][key]);
        }
        for(var obj of json){
            var longValue = obj['long'];
            delete obj['long'];
            obj.lng = longValue;
        }
        // console.log(json);

        var locations = json;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: locations[0]
        });

        var circle = new google.maps.Circle({
            strokeColor: '#00ff00',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#00ff00',
            fillOpacity: 0.35,
            map: map,
            center: locations[0],
            radius: 15
        });

        // var marker, info;
        for(var loc of locations){
            if(loc != json[0]){
                var marker = new google.maps.Marker({
                    position: loc,
                    // animation: google.maps.Animation.DROP,
                    map: map
                });
                var icontent = 'hi';
                var prop = 'content';
                // if(loc.prop){
                //     icontent = loc.content.substring(0, loc.content.length-3);
                //     // icontent = '<div class="image" style="background-image:url('+"https://www.ryanwirth.ca/misc/nwhacks2017/hotlink-ok/"+loc.content+')"></div>';
                // } else
                //     icontent = 'hello';
                // }
                var infowindow = new google.maps.InfoWindow({
                    content: icontent
                });
                marker.addListener('click', function() {
                    infowindow.open(map, this);
                });
            }
        }
    }
    
    return {
        markCordovaReady:markCordovaReady,
        markjQueryReady:markjQueryReady
    }
})(jQuery);


function initMap() {
    //do nothing
}


$(document).ready(function (e) {
    UI.markjQueryReady();
});

