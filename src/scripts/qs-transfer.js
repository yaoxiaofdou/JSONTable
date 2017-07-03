/*************************************
*    create by xiaofeng.yao
*    time 2017.06.28
*    component qs-transfer
*    path file-system-web/src/scripts/qs-transfer.js
*************************************/
$(function(){

    var transfer = {
        init:function(){

            // 插件 transfer 启动方法
            $("#ued-transfer-1").transferItem();

            // 可授权Dom列表
            this.$searchlist = $(".ty-search-list");
            // 已授权Dom列表
            this.$warrantList = $('.ty-warrant-list');
            // 保存过滤后的原数据
            this.listOutArr = [];

            /**
             *  默认数据
             *  warrantArr 可授权的策略
             *  noWarrantArr 已授权的策略
             **/
            this.warrantArr = [
                {
                    id: '1024001',
                    name: 'AdministratorAccess',
                    title: '管理所有启尚文件系统资源的权限',
                    window: '系统'
                },{
                    id: '1024002',
                    name: 'QiShonOSSFullAccess',
                    title: '管理开放存储服务(OSS)权限',
                    window: '系统'
                },{
                    id: '1024003',
                    name: 'QiShonOSSReadOnlyAccess',
                    title: '只读访问开放存储服务(OSS)的权限',
                    window: '系统'
                },{
                    id: '1024004',
                    name: 'QiShonECSFullAccess',
                    title: '管理云服务器(ECS)的权限',
                    window: '系统'
                }
            ]
            this.noWarrantArr = [
                {
                    id: '1024005',
                    name: 'QiShonDTSAccess',
                    title: '管理访问的(DTS)权限',
                    window: '系统'
                },{
                    id: '1024006',
                    name: 'QiShonBBSAccess',
                    title: '管理BBS的权限',
                    window: '系统'
                }
            ]
            /*****
            *    方法说明
            *    @method : DefaultListData (方法名)
            *    @param  : data (参数)
            *    @return : str 拼接好的列表字符串 (返回值说明)
            *****/
            function DefaultListData(data){
                var str = '';
                for(var i = 0;i <data.length;i++){
                    str += '<li data-id="'+
                            data[i].id + '"><div class="ty-tree-div"><label class="tyue-checkbox-wrapper">'+
                            '<span class="tyue-checkbox"><input type="checkbox" class="tyue-checkbox-input">'+
                            '<span class="tyue-checkbox-circle"></span></span><span class="tyue-checkbox-txt"><h4>'+
                            data[i].name + '</h4><p>'+
                            data[i].title + '</p><div class="tyue-checkbox-txt__label">'+
                            data[i].window + '</div></span></label></div></li>';
                }
                return str
            }
            // 可授权列表
            this.$searchlist.html(DefaultListData(this.warrantArr));
            // 已授权列表
            this.$warrantList.html(DefaultListData(this.noWarrantArr));

            // 复选框执行监听,设置选中状态
            var $checkbox = $(".tyue-checkbox-input");
            transfer.checkboxChange($checkbox);

            // 检索功能
            var $search = $('input[name=listSearch]');
            transfer.inputSearch($search);

            // 更新默认数组
            this.resetDefaultArr(this.$searchlist);

            // 绑定事件，点击过移动后，要更新一次可授权的数组.
            $('.to-switch').on('click',function(){
                transfer.resetDefaultArr(this.$searchlist);
                // 点击后，清空右边的搜索选中状态
                transfer.clearRightChecked();
            });
        },
        checkboxChange: function(ckbox){
            // 监听列表中checkbox变化，设置选中状态
            $(".ty-tree-select").on("change","input[type=checkbox]",function(){
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

            // 保存下原数组。
            this.listOutArr = this.warrantArr;

            // 监听搜索输入框变化
            search.on("input",function(){
                var stxt = $(this).val();
                // 搜索相似度
                transfer.listSort(stxt)
                // transfer.liSort();
            })

        },
        resetDefaultArr : function(Domlist){

            // 想法是：要确定可授权的数据，就用全部的数据减去已受权的数据,声明个变量保存

            // 默认的全部数据
            var defaultArr = this.warrantArr.concat(this.noWarrantArr);
            // 保存已授权的数组，这个需要重新获取一次
            var noWarArr = [];
            // 保存当前可以授权的项
            var WarArr = [];

            // 获取当前页面已授权的项目
            this.$warrantList.find('li').each(function(index,item){
                noWarArr.push({
                    id: $(item).attr('data-id'),
                    name: $(item).find('h4').text(),
                    title: $(item).find('p').text(),
                    window: $(item).find('.tyue-checkbox-txt__label').html()
                })
            })
            // 根据当前页面已授权的项目过滤出可授权的项目
            for(var i = 0;i<defaultArr.length;i++){
                var flag = true;
                for(var j = 0;j<noWarArr.length;j++){
                    if(defaultArr[i].id == noWarArr[j].id){
                        flag = false;
                    }
                }
                if(flag){
                    WarArr.push(defaultArr[i])
                }
            }

            // 更新可授权项目
            this.listOutArr = WarArr;
            // console.log(this.listOutArr)
        },
        listSort: function(txt){
            // console.log(arr)
            var assrr = [];
            // 把值一个个传进去遍历相似度。
            for(var i = 0;i<transfer.listOutArr.length;i++){
                // console.log(transfer.listOutArr)
                // 相似度 2. 利用字符段来获取相似，最低标准要想通3个字符以上，则优先级排在数组相似之前。
                // transfer.li_Strdiff(transfer.listOutArr[i],txt);
                // 相似度 1. 用数组一个一个的对比来算相似度
                if(transfer.liSort(transfer.listOutArr[i],txt).xs !== 0){
                    assrr.push(transfer.liSort(transfer.listOutArr[i],txt));
                }
            }
            
            // 对得到的数组进行降序排列
            assrr.sort(transfer.compare('xs'))

            // 最后保值，如果输入为空则还原原数据
            if(txt == ''){
                assrr = this.listOutArr
            }

            // 清空页面列表数据
            $('.ty-search-list').html();
            // html数据回写入页面
            $('.ty-search-list').html(transfer.setHTML(assrr));
        },
        li_Strdiff: function(li,txt) {
            /*
            *   用字符串对比来算相似度
            */
            // if(txt.length > 2){

            // }
            // var name = li.name;
            // var title = li.title;

            // name.indexOf(txt);
            
            // title.indexOf(txt);

        },
        liSort: function(li,txt){
            /*
            *   相似度 1. 用数组一个一个的对比来算相似度
            *   原理：每次都拿取当前输入的长度，按当前输入的长度去对比已有的列表，寻找相同的。
            */ 

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
            
            // 声明两个数组，用来保存当前遍历的对象
            var nameObjArr = [];
            var titleObjArr = [];
            // 两个数组对象新增默认值
            for(var i = 0 ; i<name.length;i++){
                nameObjArr.push({
                    name:name[i],
                    isActive:false
                })
            }
            for(var i = 0 ; i<title.length;i++){
                titleObjArr.push({
                    title:title[i],
                    isActive:false
                })
            }
            
            // 长度取最长的，定完后开始遍历相似度
            for(var i = 0 ; i<name.length;i++){
                for(var j=0;j<text.length;j++){
                    if(name[i]===text[j]){
                        z++;
                        nameObjArr[i].isActive = true;
                    }
                }
            };
            for(var i = 0 ; i<title.length;i++){
                for(var j=0;j<text.length;j++){
                    if(title[i]===text[j]){
                        b++;
                        titleObjArr[i].isActive = true;
                    }
                }
            };

            // 设置当前里的相似度
            z>b ? xs=z : xs=b;
            li.xs = xs;
            // 设置当前要显示的名字
            li.nameObj = nameObjArr;
            li.titleObj = titleObjArr;

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
            // console.log(arr)
            // 把数组回写进页面
            var htmlstr = '';
            
            function setnametitle(obj){
                var objName = '';
                var objTitle = '';
                
                // 设置名字
                for(var i = 0;i<arr.length;i++){
                    for(var j = 0;j<arr[i].nameObj.length;j++){
                        if(arr[i].nameObj[j].isActive){
                            objName += '<span class="nameActive">'+arr[i].nameObj[j].name+'</span>';
                        }else{
                            objName += '<span>'+arr[i].nameObj[j].name+'</span>';
                        }
                    }
                }
                // 设置title
                for(var i = 0;i<arr.length;i++){
                    for(var j = 0;j<arr[i].titleObj.length;j++){
                        if(arr[i].titleObj[j].isActive){
                            objTitle += '<span class="nameActive">'+arr[i].titleObj[j].title+'</span>';
                        }else{
                            objTitle += '<span>'+arr[i].titleObj[j].title+'</span>';
                        }
                    }
                }

                return {
                    name:objName,
                    title:objTitle
                }

            }

            for(var i = 0;i<arr.length;i++){
                
                // 保存名字和标题
                var objName = '';
                var objTitle = '';
                // 拿出名字
                for(var j = 0;j<arr[i].nameObj.length;j++){
                    if(arr[i].nameObj[j].isActive){
                        objName += '<span class="nameActive">'+arr[i].nameObj[j].name+'</span>';
                    }else{
                        objName += '<span>'+arr[i].nameObj[j].name+'</span>';
                    }
                }
                // 拿出标题
                for(var j = 0;j<arr[i].titleObj.length;j++){
                    if(arr[i].titleObj[j].isActive){
                        objTitle += '<span class="nameActive">'+arr[i].titleObj[j].title+'</span>';
                    }else{
                        objTitle += '<span>'+arr[i].titleObj[j].title+'</span>';
                    }
                }

                // 设置最终显示的列表
                htmlstr += '<li data-id="'+
                            arr[i].id + '"><div class="ty-tree-div"><label class="tyue-checkbox-wrapper">'+
                            '<span class="tyue-checkbox"><input type="checkbox" class="tyue-checkbox-input">'+
                            '<span class="tyue-checkbox-circle"></span></span>'+
                            '<span class="tyue-checkbox-txt"><h4>'+
                            objName +
                            '</h4><p>'+
                            objTitle +
                            '</p><div class="tyue-checkbox-txt__label">'+
                            arr[i].window +
                            '</div></span></label></div></li>';
            }
            // console.log(htmlstr)
            return htmlstr
        },
        clearRightChecked: function(){
            // 清空右边的选中状态
            this.$warrantList.find('span').removeClass('nameActive');
        }
    }

    transfer.init();

})