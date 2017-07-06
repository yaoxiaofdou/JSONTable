/**
 *  create by xiaofeng.yao
 *  component tableList
 *  time 2017.06.16
 * 
 *  2017.07.06 更新 新增表格选中效果 ， 可设置表格内容选中状态分“单选”，“多选”。
 * 
 **/   
$(function(){
 
    // 表格对象
    var tableList = {
        init:function(){
            
            // 表格全选方法
            var $tableCom = $('.TableListComponent');  // 表格组件
            var $selbtn = $("#table__all");            // 全选按钮
            var $panel = $(".table__tbody");           // 表格tbody

            // 点击改变    全选与取消
            tableList.allSeleted($selbtn,$panel);

            // 判断当前这个表格是单选表格还是多选表格 true 单选 , false 多选
            var $radio = $tableCom.attr('radio');
            if($radio == 'true'){
                tableList.listRadio($panel);
            }else{
                tableList.changeCheckbox($panel);
            }
        },
        changeCheckbox:function(panel){
            // 多选情况
            panel.find('tr').on('click',function(){
                if($(this).hasClass('tr-active')){
                    $(this).removeClass('tr-active');
                    $(this).find('.TableListComponent-checkbox').prop("checked","");
                }else{
                    $(this).addClass('tr-active');
                    $(this).find('.TableListComponent-checkbox').prop("checked","checked");
                }
                // 关闭全选
                tableList.closeAllCheckbox(panel);
            })
        },
        listRadio : function(panel){
            // 单选情况
            panel.find('tr').on('click',function(){
                if($(this).hasClass('tr-active')){
                    // 清空当前选中
                    $(this).removeClass('tr-active');
                    $(this).find('.TableListComponent-checkbox').prop("checked","");
                }else{
                    // 清空所有选中
                    tableList.clearChecked(panel)
                    // 设置当前选中
                    $(this).addClass('tr-active');
                    $(this).find('.TableListComponent-checkbox').prop("checked","checked");
                }
                // 关闭全选
                tableList.closeAllCheckbox(panel);
            })
        },
        closeAllCheckbox:function(pane){
            // 关闭全选
            var checkboxSwitch = true;
            pane.find('tr').find('.TableListComponent-checkbox').each(function(index,item){
                if($(item).prop("checked")){
                    checkboxSwitch = false;
                }
            })
            if(!checkboxSwitch){
                $("#table__all").prop("checked","");
            }
        },
        clearChecked:function(pane){
            pane.find('tr').each(function(index,item){
                $(this).removeClass('tr-active');
                $(this).find('.TableListComponent-checkbox').prop("checked","");
            })
        },
        allSeleted:function(btn,panel){
            /*
            *   { btn }    点击的checkbox
            *   { panel }  查找所有子input 的容器
            **/
        
            btn.on("click",function() {
                var self = $(this);
                if(self.prop("checked")){
                    panel.find('tr').each(function() {
                        $(this).find(".TableListComponent-checkbox").prop("checked", true);
                        $(this).addClass('tr-active');
                    })
                } else {
                    panel.find('tr').each(function() {
                        $(this).find(".TableListComponent-checkbox").prop("checked", false);
                        $(this).removeClass('tr-active');
                    })
                }  
            })
        }

    }

    tableList.init()

})