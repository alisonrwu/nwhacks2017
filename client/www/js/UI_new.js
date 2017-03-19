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
        $("#take-photo").click(takePhoto);
        $("#choose-photo").click(choosePhoto);
    }
    
    function takePhoto() {
        navigator.camera.getPicture(selectImage_success, selectImage_failure, { quality: 100, destinationType: Camera.DestinationType.FILE_URI, sourceType:Camera.PictureSourceType.CAMERA});
    }
    
    function choosePhoto() {
        navigator.camera.getPicture(selectImage_success, selectImage_failure, {quality:100, destinationType:Camera.DestinationType.FILE_URI, sourceType:Camera.PictureSourceType.PHOTOLIBRARY});
    }
    
    function selectImage_success(imageURI) {
        alert(imageURI);
        $(".image-selector").css("background-image", "url('"+imageURI+"')");
        $("#test").attr("src", imageURI);
    }
    
    function selectImage_failure(message) {
        alert(message);
    }
    
    return {
        markCordovaReady:markCordovaReady,
        markjQueryReady:markjQueryReady
    }
})(jQuery);


$(document).ready(function (e) {
    UI.markjQueryReady();
});

