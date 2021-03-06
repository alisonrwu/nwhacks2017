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
        
        // Update every timestamp every 60 seconds
        setInterval(LIST_VIEW.updateTimestamps, 1000 * 60);
        
        refreshPosts();
    }
    
    function refreshPosts() {
        CordovaInterface.getPosition(refreshPosts_getPosition);
        // also get the radius from settings
    }
    
    var lastLatitude = 0;
    var lastLongitude = 0;
    function refreshPosts_getPosition(position) {
        lastLatitude = position.coords.latitude;
        lastLongitude = position.coords.longitude;
        DATABASE.loadPosts(position.coords.latitude, position.coords.longitude, 1, refreshPosts_processPosts);
    }
    
    function refreshPosts_processPosts(json) {
        // Remove the loading spinner
        $(".main .content").empty();
        
        for(var key in json) {
            var obj = json[key];
            LIST_VIEW.addPost(obj.id, "https://www.ryanwirth.ca/misc/nwhacks2017/hotlink-ok/" + obj.content);
            DATABASE.loadComments(obj.id, refreshPosts_processComments);
        }
        
        if(json.length == 0) {
            $(".content").append("<div class='loading'>Hmm... There don't seem to be any posts here!</div>");
        }
    }
    
    function refreshPosts_processComments(json) {
        for(var i = json.length - 1; i >=0; i--) {
            var obj = json[i];
            LIST_VIEW.addComment(obj.post_id, obj.id, obj.time_stamp, LIST_VIEW.hashNameToColor(obj.username, obj.post_id), obj.username, obj.content);
        }
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

var LIST_VIEW = (function($) {
    function addPost(iPostID, sImageURL) {
        $(".main .content").append('<div class="post" id="post'+iPostID+'">\
                    <a href="details.html?post_id='+iPostID+'"><div class="image" style="background-image:url('+sImageURL+')"></div></a>\
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
                        <i class="color" style="background-color:'+hColor+'"></i>\
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
        var iPostID = $(this).data("id");
        
        if(sCommentText.length == 0) return;
        else if(sCommentText.length > 140) sCommentText = sCommentText.substr(0, 140);
        
        $(this).siblings(".text").val("");
        DATABASE.addComment(iPostID, getRandomName(), sCommentText, function(data) {
            var obj = data[data.length - 1];
            addComment(obj.post_id, obj.id, obj.time_stamp, hashNameToColor(obj.username, obj.post_id), obj.username, obj.content);
        });
    }
    
    function updateTimestamps() {
        var nCurrentSecondsSinceEpoch = Date.now() / 1000;
        $(".comment .timestamp").each(function() {
            var nTime = parseInt($(this).data("time"));
            var nDiff = nCurrentSecondsSinceEpoch - nTime;
            var sText = 0;
            var nSeconds = nDiff;
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
    
    function hashNameToColor(sName, iPostID) {
        return rainbow();
    }
    
    function hashString(sString) {
            var hash = 0;
            if (sString.length == 0) return hash;
            for (i = 0; i < sString.length; i++) {
                char = sString.charCodeAt(i);
                hash = ((hash<<5)-hash)+char;
                hash = hash & hash; // Convert to 32bit integer
            }
            return hash;
        }
    
    function rainbow() {
      // 30 random hues with step of 12 degrees
      var hue = Math.floor(Math.random() * 30) * 12;

      return $.Color({
        hue: hue,
        saturation: 0.9,
        lightness: 0.6,
        alpha: 1
      }).toHexString();
    }
    
    var randomNames = ["Alpaca", "Tiger", "Lion", "Zebra", "Monkey", "Elephant", "Cow", "Chicken", "Dog", "Duck", "Goose", "Sheep", "Snake", "Cockroach"];
    function getRandomName() {
        var randInt = Math.floor(Math.random() * randomNames.length);
        return "Random " + randomNames[randInt];
    }
    
    return {
        addPost:addPost,
        addComment:addComment,
        postComment:postComment,
        updateTimestamps:updateTimestamps,
        hashNameToColor:hashNameToColor
    }
})(jQuery);


$(document).ready(function (e) {
    UI.markjQueryReady();
});

