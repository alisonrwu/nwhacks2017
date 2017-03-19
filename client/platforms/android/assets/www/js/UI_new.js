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
    
    var photoSelected = false;
    var uploading = false;
    var comment = "";
    function setupUI() {
        $(".menu-button").click(SIDEBAR.open);
        $(".sidebar .fade").click(SIDEBAR.close);
        
        //alert("ready.");
        $("#take-photo").click(takePhoto);
        $("#choose-photo").click(choosePhoto);
        
        $(".submit").click(submitPost);
    }
    
    function submitPost() {
        if(uploading) return;
        
        var sText = $(".comment-input input").val().trim();
        sText = sText.length > 140 ? sText.substr(0, 140) : sText;
        comment = sText;
        
        if(!photoSelected) {
            displayNotification("warning", "Please select an image.");
            return;
        }
        
        if(sText.length == 0) {
            displayNotification("warning", "Please enter a description.");
            return;
        }
        
        var fileURL = $(".background").attr("src");
        var fileData = fileURL.split(".");
        var fileExt = fileData[fileData.length - 1].toLowerCase();
        var mimeType = "";
        switch(fileExt)
        {
            case "bmp":
                mimeType = "image/bmp";
                break;
            case "gif":
                mimeType = "image/gif";
                break;
            case "jpeg":
            case "jpg":
            case "jpe":
                mimeType = "image/jpeg";
                break;
            case "tiff":
            case "tif":
                mimeType = "image/tiff";
                break;
            case "png":
                mimeType = "image/png";
                break;
        }
        
        $(".comment-input input").prop("disabled", "true");
        displayNotification("access_time", "Uploading, please wait...");
        uploading = true;
        
        DATABASE.uploadImage($(".background").attr("src"), mimeType, submitPost_success);
    }
    
    function submitPost_success(data) {
        // Get the image name
        var obj = JSON.parse(data.response);
        var imageName = obj.url;
        
        submitPost_cockroach(imageName);
    }
    
    function submitPost_cockroach(imageName) {
        CordovaInterface.getPosition(function(position) {
            DATABASE.addPost(position.coords.latitude, position.coords.longitude, imageName, 5, function(data) {
               // Added, now add top level comment
                var obj = data[0];
                var id = obj.id;
                DATABASE.addComment(id, "TestUsername", comment, function(final) {
                    displayNotification("check", "Success!");
                });
            });
        });
    }
    
    function displayNotification(notificationType, text) {
        $(".upload-notification").remove();
        $(".image-details").append('<div class="upload-notification '+notificationType+'">\
                        <i class="material-icons">'+notificationType+'</i>\
                        <span>'+text+'</span>\
                    </div>');
    }
    
    function takePhoto() {
        if(uploading) return;
        
        navigator.camera.getPicture(selectImage_success, selectImage_failure, { quality: 50, destinationType: Camera.DestinationType.FILE_URI, sourceType:Camera.PictureSourceType.CAMERA});
    }
    
    function choosePhoto() {
        if(uploading) return;
        
        navigator.camera.getPicture(selectImage_success, selectImage_failure, {quality:75, destinationType:Camera.DestinationType.FILE_URI, sourceType:Camera.PictureSourceType.PHOTOLIBRARY});
    }
    
    function selectImage_success(imageURI) {
        photoSelected = true;
        $(".background").attr("src", imageURI);
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

