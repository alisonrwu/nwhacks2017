var CordovaInterface = (function() {
    function initialize() {
        if(window.cordova) {
            document.addEventListener("deviceready", onDeviceReady, false);
        } else {
            onDeviceReady();
        }
    }
    
    function onDeviceReady() {
        UI.markCordovaReady();
    }
    
    function getPosition(fCallback) {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                fCallback(position);
            }, function() {alert("Error!");}, { enableHighAccuracy: true, maximumAge:0 });
        } else {
            var position = {};
            position.coords.longitude = -123;
            position.coords.latitude = 49;
            position.coords.accuracy = 40;
            fCallback(position);
        }
    }
    
    return {
        initialize:initialize,
        getPosition:getPosition
    }
})();

CordovaInterface.initialize();