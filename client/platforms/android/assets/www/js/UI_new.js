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
        
        //alert("ready.");
        $(".image-selector").click(selectImage);
    }
    
    function selectImage() {
        alert("Selecting");
        window.imagePicker.getPictures(
            function(results) {
                for (var i = 0; i < results.length; i++) {
                    alert('Image URI: ' + results[i]);
                }
            }, function (error) {
                alert('Error: ' + error);
            }
        );
    }
    
    return {
        markCordovaReady:markCordovaReady,
        markjQueryReady:markjQueryReady
    }
})(jQuery);


$(document).ready(function (e) {
    UI.markjQueryReady();
});

