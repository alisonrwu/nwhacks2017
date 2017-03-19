var UI = (function($) {
   
    function setupUI() {
        $(".menu-button").click(SIDEBAR.open);
        $(".sidebar .fade").click(SIDEBAR.close);
        
        LIST_VIEW.addPost(1, "img/post1.jpeg");
        LIST_VIEW.addComment(1, 1, 1000,  "FF6600", "Original Poster", "This is a dynamically added comment!");
        LIST_VIEW.addComment(1, 2, 1000, "00FF00", "Terb", "Wow, jQuery is so cool!");
        LIST_VIEW.addComment(1, 3, 1000, "0000FF", "Random Alpaca", "Why am I here?");
    }
    
    return {
        setupUI:setupUI
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
                            <input type="text" placeholder="Add a comment..." />\
                            <div class="submit">\
                                    <i class="material-icons">send</i>\
                            </div>\
                        </div>\
                    </div>\
                </div>');
    }
    
    function addComment(iPostID, iCommentID, nTimestamp, hColor, sName, sText) {
        $('<div class="comment" id="comment'+iCommentID+'">\
                <div class="details">\
                    <div class="username">\
                        <i class="color" style="background-color:#'+hColor+'"></i>\
                        <span>'+sName+'</span>\
                    </div>\
                    <div class="timestamp" data-time="'+nTimestamp+'">\
                        <i class="material-icons">access_time</i>\
                        <span>3 min ago</span>\
                    </div>\
                </div>\
                <div class="text">\
                    '+sText+'\
                </div>\
            </div>\
            <div class="divider"></div>').insertBefore("#post" + iPostID + " .comment-input");
    }
    
    function updateTimestamps() {
        $(".comment").each(function() {
            alert($(this).children(".timestamp").data("time"));
        })
    }
    
    
    return {
        addPost:addPost,
        addComment:addComment
    }
})(jQuery);


$(document).ready(function (e) {
    UI.setupUI();
});

