$(function () {
    //ie detection
    if (!!window.MSInputMethodContext && !!document.documentMode) {
        $("html").addClass("ie11");
    }
    if ($.browser.msie && $.browser.version == 10) {
        $("html").addClass("ie10");
    }
    if ($.browser.msie && $.browser.version == 9) {
        $("html").addClass("ie9");
    }
    if ($.browser.msie && $.browser.version == 8) {
        $("html").addClass("ie8");
    }
});