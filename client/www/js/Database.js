var DATABASE = (function($) {
    var host = "http://ancient-savannah-98407.herokuapp.com/";
    function loadMap(nLat, nLon, fCallback) {
        $.ajax({
            url:host + "map",
            data: {
                lat:nLat,
                lon:nLon
            },
            success:function(data) {
                fCallback(data);
            },
            type:"GET"
        });
    }
    
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
    
    function loadPost(iPostID, fCallback) {
        $.ajax({
            url:host + "posts/details",
            data: {
                post_id:iPostID
            },
            success:function(data) {
                fCallback(data);
            },
            type:"GET"
        });
    }
    
    var loadingComments = false;
    var loadCommentsQueue = new Array();
    function loadComments(iPostID, fCallback) {
        loadCommentsQueue.push([iPostID, fCallback]);
        loadComments_next();
    }
    
    function loadComments_next() {
        if(loadingComments) return;
        if(loadCommentsQueue.length == 0) return;
        
        var nextComments = loadCommentsQueue[0];
        loadCommentsQueue.splice(0, 1);
        loadingComments = true;
        
        $.ajax({
           url: host + 'posts/comments',
           data: {
              post_id:nextComments[0]
           },
           success: function(data) {
               loadingComments = false;
               nextComments[1](data); // call callback
               loadComments_next();
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
    
    function uploadImage_fallback(fileSelector, fCallback) {
        var data = new FormData();
        data.append('image', fileSelector.prop('files')[0]);
        
        $.ajax({
            url:"https://www.ryanwirth.ca/misc/nwhacks2017/upload.php",
            processData: false, // important
            contentType: false, // important
            data: data,
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
        
        // We have Cordova enabled!
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
        loadMap:loadMap,
        loadPosts:loadPosts,
        loadPost:loadPost,
        loadComments:loadComments,
        addComment:addComment,
        addPost:addPost,
        uploadImage:uploadImage,
        uploadImage_fallback:uploadImage_fallback
    }
})(jQuery);