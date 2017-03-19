var DATABASE = (function($) {
    var host = "http://ancient-savannah-98407.herokuapp.com/";
    function loadPosts(nLat, nLon, nRadius, fCallback) {
        $.ajax({
            url:host + "posts",
            data: {
                lat:nLat,
                lon:nLon,
                radius:nRadius
            },
            success:function(data) {
                fCallback(data);
            },
            type:"GET"
        });
    }
    
    function loadComments(iPostID, fCallback) {
        $.ajax({
           url: host + 'posts/comments',
           data: {
              post_id:iPostID
           },
           success: function(data) {
               fCallback(data);
           },
           type: 'GET'
        });
    }
    
    function addPost(nLat, nLon, sImageURL, nMaxLife, fCallback) {
        $.ajax({
            url:host + 'posts',
            data: {
                lat:nLat,
                long:nLon,
                max_life:nMaxLife,
                content:sImageURL
            },
            success:function(data) {
                fCallback(data);
            },
            type:'POST'
        });
    }
    
    function addComment(iPostID, sUsername, sContent, fCallback) {
        $.ajax({
            url:host + 'posts/comments',
            data: {
                post_id:iPostID,
                username:sUsername,
                content:sContent
            },
            error:function(e) {
                alert("Error!");
                alert(JSON.stringify(e));
            },
            success:function(data) {
                fCallback(data);
            },
            type:"POST"
        });
    }
    
    function uploadImage(fileURL, fileMimeType, fCallback) {
        var options = new FileUploadOptions();
        options.fileKey = "image";
        options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        options.mimeType = fileMimeType;

        var ft = new FileTransfer();
        ft.upload(fileURL, encodeURI("https://www.ryanwirth.ca/misc/nwhacks2017/upload.php"), function(data) {
            fCallback(data);
        }, function(err) {
            alert(err);
        }, options);
    }
    
    
    return {
        loadPosts:loadPosts,
        loadComments:loadComments,
        addComment:addComment,
        addPost:addPost,
        uploadImage:uploadImage
    }
})(jQuery);