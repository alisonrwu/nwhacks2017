var DATABASE = (function($) {
    function loadMap(nLat, nLon, fCallback) {
        $.ajax({
            url:"http://localhost:8080/map",
            data: {
                lat:nLat,
                lon:nLon
                // radius:nRadius
            },
            success:function(data) {
                fCallback(data);
            },
            type:"GET"
        });
    }

    function loadPosts(nLat, nLon, nRadius, fCallback) {
        $.ajax({
            url:"http://localhost:8080/posts",
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
           url: 'http://localhost:8080/posts/comments',
           data: {
              post_id:iPostID
           },
           success: function(data) {
               fCallback(data);
           },
           type: 'GET'
        });
    }
    
    function addComment(iPostID, sUsername, sContent, fCallback) {
        $.ajax({
            url:'http://localhost:8080/posts/comments',
            data: {
                post_id:iPostID,
                username:sUsername,
                content:sContent
            },
            dataType:"JSON",
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
    
    
    return {
        loadMap:loadMap,
        loadPosts:loadPosts,
        loadComments:loadComments,
        addComment:addComment
    }
})(jQuery);