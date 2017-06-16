/**
 *  create by xiaofeng.yao
 *  component tableList
 *  time 2017.06.16
 * 
 * 
 **/   
$(function(){
 
    // 表格对象
    var tableList = {
        init:function(){
            
            // 表格全选方法
            var $selbtn = $("#table__all");
            var $panel = $(".table__tbody");

            // 点击改变    全选与取消
            tableList.allSeleted($selbtn,$panel);

        },
        allSeleted:function(btn,panel){
            /*
            *   { btn }    点击的checkbox
            *   { panel }  查找所有子input 的容器
            **/
            btn.on("click",function() {
                var self = $(this);
                if(self.prop("checked")){
                    panel.find("input").each(function() {  
                        $(this).prop("checked", "checked");  
                    })
                } else {
                    panel.find("input").each(function() {  
                        $(this).prop("checked", "");  
                    })
                }  
            })
        }

    }

    tableList.init()

})