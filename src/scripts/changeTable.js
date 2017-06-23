$(function(){
    
    // changeTable 
    var changeTable = {
        init:function(){
            // 获取页面dom元素
            var $change_btn = $(".ChangeTableComponent__changeBtn");
            // icon
            var $icon_table = $('.ChangeTableComponent__changeBtn__icontable');
            var $icon_div = $('.ChangeTableComponent__changeBtn__icondiv');
            // panle
            var $panel_table = $(".ChangeTableComponent__content_list");
            var $panel_div = $(".ChangeTableComponent__content_div");

            changeTable.change($panel_table,$panel_div,$change_btn,$icon_table,$icon_div);

        },
        change:function(panel1,panel2,btn,itable,idiv){
            btn.on("click",function(){
                if(panel1.css('display')=='none'){
                    panel1.show();
                    panel2.hide();
                    itable.show();
                    idiv.hide();
                }else{
                    panel1.hide();
                    panel2.show();
                    itable.hide();
                    idiv.show();
                }
                
            })
        }
    }

    changeTable.init();

})