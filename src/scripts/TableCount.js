$(function(){

    var TableCount = {

        init : function(){
            //开始时间
            $('#qBeginTime').datepicker({  
                todayBtn : "linked",  
                autoclose : true,  
                todayHighlight : true,
                format: "yyyy-mm-dd",
                endDate : new Date()  
            }).on('changeDate',function(e){  
                var startTime = e.date;  
                $('#qEndTime').datepicker('setStartDate',startTime);  
            });

            //结束时间
            $('#qEndTime').datepicker({  
                todayBtn : "linked",  
                autoclose : true,
                format: "yyyy-mm-dd",
                todayHighlight : true,
            }).on('changeDate',function(e){  
                var endTime = e.date;  
                $('#qBeginTime').datepicker('setEndDate',endTime);  
            });

            // 获取tab
            var $TableCount__Tab = $(".TableCountComponent__header_tab");
            
            TableCount.tabChange($TableCount__Tab);

        },
        tabChange : function(tab){
            tab.find('a').on("click",function(){
                var self = $(this);
                tab.find('a').each(function(){
                    $(this).removeClass("active");
                })
                self.addClass("active");
            })
        }

    }

    TableCount.init();


})