/**
 * Created by Administrator on 2017/6/14.
 */
$(function () {
    $(".sidebar-title, .nav-item").on("click", function () {
        var $this = $(this);
        var $this_i = $(this).find("i");
        if($this_i.hasClass("icon-arrow-right")){
            $this_i.removeClass("icon-arrow-right").addClass("icon-xiajiantou");
            // $this.next().stop(true, false).animate({"height" : "auto"}, 500)
            $this.next().slideDown();
        } else {
            $this_i.removeClass("icon-xiajiantou").addClass("icon-arrow-right");
            // $this.next().stop(true, false).animate({"height" : "0"}, 500)
            $this.next().slideUp();
        }
        // $this.next().toggle(1000)
    })

    $(".fold-menu").on("click", function () {
        var $this_i = $(this).find("i");
        var $menu = $(".menu");
        if($menu.hasClass("close-menu")){
            $menu.removeClass("close-menu");
            $this_i.removeClass("icon-zhankai-caidan").addClass("icon-zhedietubiao-yizhedie");
            setSpan(true)
            $(".view-page").removeClass("view-page-left");
        } else {
            $menu.addClass("close-menu");
            $this_i.removeClass("icon-zhedietubiao-yizhedie").addClass("icon-zhankai-caidan");
            setSpan(false)
            $(".view-page").addClass("view-page-left");
        }
    })

    initMenuTip();
    function initMenuTip() {
        $('.sidebar-title, a').each(function () {
            $(this).tipsy({gravity: 'w'});
        })
    }

    function setSpan(flag) {
        var $isHide = "span-hide";
        var $span = $(".sidebar-nav").find("span");
        if(flag == false){
            $.each($span, function () {
                $(this).addClass("span-hide")
            })
        } else{
            $.each($span, function () {
                $(this).removeClass("span-hide")
            })
        }
    }
    // $('.sidebar-title').tipsy({gravity: 'w'});
})