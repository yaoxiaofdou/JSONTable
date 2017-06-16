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

    // 一级目录
    function changeLevelOne(){
        var $this_i = $(this).find("i");
        var $menu = $(".menu");
        var $levTwo = $(".menu-ul");
        var $content = $(".content");
        $(".fold-menu").on("click", function () {
            if($menu.hasClass("close-menu")){

                $menu.removeClass("close-menu");
                $this_i.removeClass("icon-zhankai-caidan").addClass("icon-zhedietubiao-yizhedie");
                setSpan(true)
                if($levTwo.hasClass("hids-menu-ul")){
                    $content.addClass("view-page-leftTwo");
                    $content.removeClass('view-page-left')
                }else{
                    $content.removeClass('view-page-leftThree')
                }

            } else {

                $menu.addClass("close-menu");
                $this_i.removeClass("icon-zhedietubiao-yizhedie").addClass("icon-zhankai-caidan");
                setSpan(false)
                if($levTwo.hasClass("hids-menu-ul")){
                    $content.removeClass("view-page-leftTwo");
                    $content.addClass('view-page-left')
                }else{
                    $content.addClass('view-page-leftThree')
                }

            }
        })
    }
    changeLevelOne();

    /**
     *  收缩目录
     **/
    function hideTwoLevelMenu(){
        // 收缩二级目录
        var $menu = $(".menu");
        var $panel = $(".menu-ul");
        var $erBtn = $(".menu-ul-min");
        var $erBtn_icon = $(".menu-ul-min > i");
        var $content = $('.content');
        $erBtn.on("click",function(){

            if($panel.hasClass("hids-menu-ul")){
                $panel.removeClass("hids-menu-ul");
                $erBtn_icon.attr("class","iconfont icon-shousuo");
                if($menu.hasClass("close-menu")){
                    $content.addClass("view-page-leftThree");
                    $content.removeClass("view-page-left");
                }else{
                    $content.removeClass("view-page-leftTwo");
                }
                
            }else{
                $panel.addClass("hids-menu-ul");
                $erBtn_icon.attr("class","iconfont icon-shousuo1");
                if($menu.hasClass("close-menu")){
                    $content.removeClass("view-page-leftThree");
                    $content.addClass("view-page-left");
                }else{
                    $content.addClass("view-page-leftTwo");
                }
            }
        })
    }
    hideTwoLevelMenu();

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