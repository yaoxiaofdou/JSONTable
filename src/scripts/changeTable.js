$(function(){
    
    // changeTable 
    var changeTable = {
        init:function(){
            // 获取页面dom元素
            var $change_btn = $(".ChangeTableComponent__changeBtn");
            // icon
            var $icon_table = $('.icontable');
            var $icon_div = $('.icondiv');
            // panle
            var $panel_table = $(".ChangeTableComponent__content_list");
            var $panel_div = $(".ChangeTableComponent__content_div");

            changeTable.change($panel_table,$panel_div,$change_btn);

        },
        change:function(panel1,panel2,btn){
            btn.on("click",function(){
                if(panel1.css('display')=='none'){
                    panel1.show();
                    panel2.hide();
                    $icon_table.show();
                    $icon_div.hide();

                }else{
                    panel1.hide();
                    panel2.show();
                    $icon_table.hide();
                    $icon_div.show();
                }
                
            })
        }
    }

    changeTable.init();

})