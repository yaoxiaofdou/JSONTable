/*************************************
*    create by xiaofeng.yao
*    time 2017.06.28
*    component qs-transfer
*    path file-system-web/src/scripts/qs-transfer.js
*************************************/
$(function(){

    var transfer = {
        init:function(){

            $("#ued-transfer-1").transferItem();
            
            // 复选框执行监听,设置选中状态
            var $checkbox = $(".tyue-checkbox-input");
            transfer.checkboxChange($checkbox);

            // 检索功能
            var $search = $('input[name=listSearch]');
            transfer.inputSearch($search);
        },
        listArr : [],// 保存搜索原数据
        checkboxChange: function(ckbox){
            // 监听列表中checkbox变化，设置选中状态
            ckbox.on("change",function(){
                var that = $(this);
                var $panel_li = that.parents(".ty-tree-div");
                // console.log(that[0].checked)
                if(that[0].checked){
                    $panel_li.addClass("li-active");
                }else{
                    $panel_li.removeClass("li-active");
                }
            })
        },
        inputSearch: function(search){
            var $searchlist = $(".ty-search-list");

            // 保存下原数组。
            $searchlist.find("li").each(function(index,item){
                var obj = {
                    id: '102400' + index,
                    name: $(item).find('h4').text(),
                    title: $(item).find('p').text(),
                    window: $(item).find('.tyue-checkbox-txt__label').html()
                }
                transfer.listArr.push(obj);
            })

            // 监听搜索输入框变化
            search.on("input",function(){
                var stxt = $(this).val();
                // 搜索相似度
                transfer.listSort(transfer.listArr,stxt)
                // transfer.liSort();
            })

        },
        listSort: function(arr,txt){
            // console.log(arr)
            var assrr = [];
            // 把值一个个传进去遍历相似度。
            for(var i = 0;i<arr.length;i++){
                // 清除相似度为0的数据
                if(transfer.liSort(arr[i],txt).xs !== 0){
                    assrr.push(transfer.liSort(arr[i],txt));
                }
            }
            
            // 对得到的数组进行降序排列
            assrr.sort(transfer.compare('xs'))

            // 最后保值，如果输入为空则还原原数据
            if(txt == ''){
                assrr = transfer.listArr
            }

            // 清空页面列表数据
            $('.ty-search-list').html();
            // html数据回写入页面
            $('.ty-search-list').html(transfer.setHTML(assrr));
        },
        liSort: function(li,txt){
            // 保存当前的相识度
            var xs = 0;
            var z = 0;
            var b = 0;
            // 字符串转成数组
            var name = [];
            for(var i=0;i<li.name.length;i++){
                name.push(li.name[i])
            }
            // 字符串转成数组
            var title = [];
            for(var i=0;i<li.title.length;i++){
                title.push(li.title[i])
            }
            // 字符串转成数组
            var text = [];
            for(var i=0;i<txt.length;i++){
                text.push(txt[i])
            }
            // 长度取最长的，定完后开始遍历相似度
            for(var i = 0 ; i<name.length;i++){
                for(var j=0;j<text.length;j++){
                    if(name[i]===text[j]){
                        z++;
                    }
                }
            };
            for(var i = 0 ; i<title.length;i++){
                for(var j=0;j<text.length;j++){
                    if(title[i]===text[j]){
                        b++;
                    }
                }
            };
            z>b ? xs=z : xs=b ;
            // 设置当前里的相似度
            li.xs = xs;
            // console.log(li)
            return li
        },  
        compare: function(prop) {
            // 对数组对象进行降序排列
            return function (obj1, obj2) {
                var val1 = obj1[prop];
                var val2 = obj2[prop];
                if (val1 < val2) {
                    return 1;
                } else if (val1 > val2) {
                    return -1;
                } else {
                    return 0;
                }
            }
        },
        setHTML: function(arr){
            // 把数组回写进页面
            var htmlstr = '';
            
            for(var i in arr){
                htmlstr += '<li><div class="ty-tree-div"><label class="tyue-checkbox-wrapper">'+
                    '<span class="tyue-checkbox"><input type="checkbox" class="tyue-checkbox-input" id="tyue-checkbox-blue">'+
                        '<span class="tyue-checkbox-circle"></span></span>'+
                        '<span class="tyue-checkbox-txt"><h4>'+
                            arr[i].name +
                        '</h4><p>'+
                            arr[i].title +
                        '</p><div class="tyue-checkbox-txt__label">'+
                            arr[i].window +
                        '</div></span></label></div></li>';
            }
            // console.log(htmlstr)
            return htmlstr
        }
    }

    transfer.init();

})