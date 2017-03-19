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
        // console.log(json);
        var locations = [];

        for(var key in json[0]){ //current location string to float
            json[0][key]=parseFloat(json[0][key]);
        }
        // locations.push(json[0]);

        for(var obj of json){
            // if(obj != json[0]){
                var longValue = obj['long'];
                delete obj['long'];
                obj.lng = longValue;
                locations.push({'lat': obj['lat'], 'lng': obj['lng']});
            // }
        }

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
// console.log(json);
// console.log(locations);
        // for(var loc of locations){
        for(var i=0; i<locations.length; i++){
            // console.log(json[i]);
            // console.log(locations[i]);
            if(i > 0){
                var marker = new google.maps.Marker({
                    position: locations[i],
                    // animation: google.maps.Animation.DROP,
                    map: map
                });
                // console.log(json[i].id);
                var icontent = '<a href="details.html?post_id='+json[i].id+'">hi</a>'; //<a href="details.html?post_id='+iPostID+'"><div class="image" style="background-image:url('+sImageURL+')"></div></a>
                // console.log(icontent);
                // if(loc.prop){
                //     // icontent = '<div class="image" style="background-image:url('+"https://www.ryanwirth.ca/misc/nwhacks2017/hotlink-ok/"+loc.content+')"></div>';
                // } else
                //     icontent = 'hello';
                // }
                var infowindow = new google.maps.InfoWindow(
                {
                    content: icontent
                });
                marker.addListener('click', function() {
                    console.log(icontent);
                    // infowindow.setContent(icontent);
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

