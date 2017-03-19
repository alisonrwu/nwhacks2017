var DATABASE = (function($) {
    function loadPosts(nLat, nLon, nRadius, fCallback) {
        
    }
    
    function loadComments(iPostID) {
        $.ajax({
           url: 'http://localhost:8080/posts/comments',
           data: {
              format: 'json'
           },
           error: function() {
              $('#info').html('<p>An error has occurred</p>');
           },
           success: function(data) {
               alert("Data!");
           },
           type: 'GET'
        });
    }
    
    function addComment(iPostID, sUsername, sContent) {
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
                alert("Success.");
                alert(JSON.stringify(data));
            },
            type:"POST"
        });
    }
    
    
    return {
        loadPosts:loadPosts,
        loadComments:loadComments,
        addComment:addComment
    }
})(jQuery);