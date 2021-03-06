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
    var fileSelector;
    function setupUI() {
        fileSelector = $('<input type="file">');
        fileSelector.on("change", choosePhoto_fallback);
        
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
        
        if(navigator.camera) DATABASE.uploadImage($(".background").attr("src"), mimeType, submitPost_success);
        else DATABASE.uploadImage_fallback(fileSelector, submitPost_success);
    }
    
    function submitPost_success(data) {
        // Get the image name
        var obj = !data.hasOwnProperty("response") ? data : JSON.parse(data.response);
        var imageName = obj.url;
        
        submitPost_cockroach(imageName);
    }
    
    function submitPost_cockroach(imageName) {
        CordovaInterface.getPosition(function(position) {
            DATABASE.addPost(position.coords.latitude, position.coords.longitude, imageName, 60 * 60, function(data) {
               // Added, now add top level comment
                var obj = data[0];
                var id = obj.id;
                DATABASE.addComment(id, "Original Poster", comment, function(final) {
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
        
        if(!navigator.camera) {
            alert("Taking photos is currently not supported on this platform!");
            return;
        }
        
        navigator.camera.getPicture(selectImage_success, selectImage_failure, { quality: 50, destinationType: Camera.DestinationType.FILE_URI, sourceType:Camera.PictureSourceType.CAMERA});
    }
    
    function choosePhoto() {
        if(uploading) return;
        
        if(!navigator.camera) {
            // Open the fileSelector
            fileSelector.click();
            return;
        }
        
        navigator.camera.getPicture(selectImage_success, selectImage_failure, {quality:75, destinationType:Camera.DestinationType.FILE_URI, sourceType:Camera.PictureSourceType.PHOTOLIBRARY});
    }
    
    function choosePhoto_fallback(data) {
        if(!data) return;
        
        var files = data.target.files;
        $.each(files, function(i, file){
           var reader = new FileReader();

           reader.onload = function(e) {
                selectImage_success(e.target.result);
            };

            reader.readAsDataURL(file);
        });
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

