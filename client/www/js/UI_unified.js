
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