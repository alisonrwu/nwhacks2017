var UI = (function($) {
	var MAX_RADIUS = 1000; // this is the default
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
        $(document).ready(function(){
    console.log("document is ready");
    $("#submitButton").on("click", (function(){
        console.log("click worked");
        MAX_RADIUS = document.getElementsByName('maxradius').value();
        console.log(MAX_RADIUS);
        }))
    })
}}

    function getMaxRadius() {
	return MAX_RADIUS;
	}
    
    return {
        markCordovaReady:markCordovaReady,
        markjQueryReady:markjQueryReady
    }
})(jQuery);


$(document).ready(function (e) {
    UI.markjQueryReady();
});

