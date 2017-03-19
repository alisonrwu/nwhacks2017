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
        
        // Add a dummy post
        LIST_VIEW.addPost(1, "img/post1.jpeg");
        LIST_VIEW.addComment(1, 1, 1489906437381,  "FF6600", "Original Poster", "This is a dynamically added comment!");
        LIST_VIEW.addComment(1, 2, 1489906439381, "00FF00", "Terb", "Wow, jQuery is so cool!");
        LIST_VIEW.addComment(1, 3, 1489906438381, "0000FF", "Random Alpaca", "Why am I here?");
        
        // Update every timestamp every 60 seconds
        setInterval(LIST_VIEW.updateTimestamps, 1000 * 60);
        
        CordovaInterface.getPosition(getPos);
    }
    
    function getPos(pos) {
        alert(pos.coords.longitude + ", " + pos.coords.latitude + ", " + pos.coords.accuracy);
    }
    
    function setupCommentButton(iPostID) {
        $("#post" + iPostID + " .submit").click(LIST_VIEW.postComment);
    }
    
    return {
        markCordovaReady:markCordovaReady,
        markjQueryReady:markjQueryReady,
        setupCommentButton:setupCommentButton
    }
})(jQuery);

var SIDEBAR = (function($) {
    function open() {
        $(".sidebar").css("display", "block");
        $(".sidebar .content").animate({"margin-left":"0px"}, 100, "linear");
        $(".sidebar .fade").animate({"opacity":"0.5"}, 100, "linear");
    }
    
    function close() {
        $(".sidebar .content").animate({"margin-left":"-256px"}, 100, "linear");
        $(".sidebar .fade").animate({"opacity":"0"}, 100, "linear", function() {
            $(".sidebar").css("display", "none");
        })
    }
    
    return {
        open:open,
        close:close
    }
})(jQuery);

var LIST_VIEW = (function($) {
    function addPost(iPostID, sImageURL) {
        $(".main .content").append('<div class="post" id="post'+iPostID+'">\
                    <div class="image" style="background-image:url('+sImageURL+')"></div>\
                    <div class="comments">\
                        <div class="comment-input">\
                            <input class="text" type="text" placeholder="Add a comment..." maxlength="140" />\
                            <div class="submit" data-id="'+iPostID+'">\
                                    <i class="material-icons">send</i>\
                            </div>\
                        </div>\
                    </div>\
                </div>');
        
        UI.setupCommentButton(iPostID);
    }
    
    function addComment(iPostID, iCommentID, nMillisecondsSinceEpoch, hColor, sName, sText) {
        $('<div class="comment" data-id="'+iCommentID+'" id="comment'+iCommentID+'">\
                <div class="details">\
                    <div class="username">\
                        <i class="color" style="background-color:#'+hColor+'"></i>\
                        <span>'+sName+'</span>\
                    </div>\
                    <div class="timestamp" data-time="'+nMillisecondsSinceEpoch+'">\
                        <i class="material-icons">access_time</i>\
                        <span>0 sec ago</span>\
                    </div>\
                </div>\
                <div class="text">\
                    '+sText+'\
                </div>\
            </div>\
            <div class="divider"></div>').insertBefore("#post" + iPostID + " .comment-input");
        
        updateTimestamps();
    }
    
    function postComment() {
        var sCommentText = $(this).siblings(".text").val().trim()
        var iPostID = parseInt($(this).data("id"));
        if(sCommentText.length == 0) return;
        else if(sCommentText.length > 140) sCommentText = sCommentText.substr(0, 140);
        
        $(this).siblings(".text").val("");
        addComment(iPostID, 100, Date.now(), "FF0000", "Rye", sCommentText);
        
        DATABASE.addComment(iPostID, "Rye", sCommentText);
    }
    
    function updateTimestamps() {
        var nCurrentMillisecondsSinceEpoch = Date.now();
        $(".comment .timestamp").each(function() {
            var nTime = parseInt($(this).data("time"));
            var nDiff = nCurrentMillisecondsSinceEpoch - nTime;
            var sText = 0;
            var nSeconds = nDiff / 1000;
            if(nSeconds < 60) {
                if(nSeconds < 30) sText = "just now";
                else sText = Math.floor(nSeconds) + " sec ago";
            } else {
                var nMinutes = nSeconds / 60;
                if(nMinutes < 60) sText = Math.floor(nMinutes) + " min ago";
                else {
                    var nHours = nMinutes / 60;
                    if(nHours < 24) sText = Math.floor(nHours) + " hour" + (Math.floor(nHours) != 1 ? "s" : "") + " ago";
                    else {
                        var nDays = nHours / 24;
                        sText = Math.floor(nDays) + " day" + (Math.floor(nDays) != 1 ? "s" : "") + " ago";
                    }
                }
            }
            
            $(this).children("span").html(sText);
        })
    }
    
    
    return {
        addPost:addPost,
        addComment:addComment,
        postComment:postComment,
        updateTimestamps:updateTimestamps
    }
})(jQuery);


$(document).ready(function (e) {
    UI.markjQueryReady();
});

