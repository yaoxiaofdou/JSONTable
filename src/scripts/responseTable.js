/*************************************
*    create by xiaofeng.yao
*    email 871213171@qq.com
*    time 2017.07.21
*    component response-table
*    path /Users/apple/qishon/file-web/response-table/src/scripts/index.js
*************************************/

(function($){

    $.fn.responseTable = function(options){
        
        var retab = this;

        // 保存当前模式
        var thisPattern;

        // 保存下当前的模式;
        if(!options){
            options = {
                data:[],
                pattern:'browse',
                menu:['name','yesno','default','type','describe']
            }
        }else{
            thisPattern = options.pattern;
        }

        // 保存当前默认对象格式
        var objSetting = {};

        retab.init = function(){
            // 表格列表数组 , 最终导入json数据的时候把json转化成对象赋值给这个数组，render一下。
            this.tableArray = [];
            // 类型数组
            this.typeArray = ['string','number','boolean','object','array','array[string]',
                        'array[number]','array[boolean]','array[object]','array[array]'];
            // 表格容器
            this.tablePanel = $(this).find('.div-table-section');
            // 添加参数按钮
            this.btnJoinLi = $(this).find('.btn__joinli');
            // 导入json按钮
            this.btnExportJSON = $(this).find('.btn__exportJSON');
            // 保存按钮
            this.btn__savedata = $(this).find('.btn__savedata');
            // 清空数据按钮
            this.btn__cleardata = $(this).find('.btn__cleardata');

            // 加载生产页面初始化主结构
            this.createDefaultHtml(options);
            // 改变模式
            this.clickChangePattern();
            
            // 添加参数方法
            this.joinLi();
            // 单条数据 item 的增删改查,类型的监听,操作。
            // this.itemOperation();
            // 单条数据 item 新增一个子集
            // this.itemNewItem();
            // 根据 => 表格列表数组 => 渲染页面   初始渲染
            // this.tableRendering().renderAll();
            // 表格绑定监听，如果是显示则关闭监听，编辑开启监听。
            // this.itemChangeValue();
            // 最后保存的表格数据
            this.saveTable();
            // 导入json数据
            this.exportJson();
            // 清空数据方法
            this.clearTable().clearFun();

        }

        // 改变模式
        retab.clickChangePattern = function(){
            var that = this;
            $(this).find(".response-table--edit").on('click',function(){
                thisPattern = 'edit';
                // 改变页面主结构 edit
                that.createDefaultHtml({
                    pattern : 'edit',
                    menu : options.menu
                });
                $(this).find('.response-table__panel--button').show();
            })
            $(this).find(".response-table--browse").on('click',function(){
                thisPattern = 'browse';
                // 改变页面主结构 browse
                that.createDefaultHtml({
                    pattern : 'browse',
                    menu : options.menu
                });
                $(this).find('.response-table__panel--button').hide();
            })
        }

        // 加载生产页面主结构
        retab.createDefaultHtml = function(pattern){
            if(!pattern){
                pattern = {
                    pattern:'browse',
                    menu:['name','yesno','default','type','describe']
                };
            }
            var editHtml = '';
            if(pattern.pattern == 'edit'){
                thisPattern = 'edit';
                // 显示按钮
                $(this).find('.response-table__panel--button').show();
                editHtml = '<!-- 编辑模式 -->'+
                '<div class="response-table--editPanel">'+
                    '<!-- 表头 -->'+
                    '<div class="div-table col-sm-12">'+
                        '<ul class="div-table-header div-table-line cb">'+
                            '<li class="col-sm-1">操作</li>'+
                            '<li class="col-sm-2">参数名称</li>'+
                            '<li class="col-sm-1">是否必须</li>'+
                            '<li class="col-sm-2">类型</li>'+
                            '<li class="col-sm-2 div-table-header--default">默认值</li>'+
                            '<li class="col-sm-4">描述</li>'+
                        '</ul>'+
                    '</div>'+
                    '<!-- 内容区域 -->'+
                    '<div class="div-table div-table-section editing div-editing-table col-sm-12" data-sortable-id="32" aria-dropeffect="move">'+
                    '</div>'+
                '</div>';
            }else if(pattern.pattern == 'browse'){
                thisPattern = 'browse';
                // 隐藏按钮
                $(this).find('.response-table__panel--button').hide();
                editHtml = '<!-- 浏览模式 --><div class="response-table--browsePanel">'+
                    '<!-- 表头 -->'+
                        '<div class="div-table col-sm-12">'+
                            '<ul class="div-table-header div-table-line cb">'+
                                '<li class="col-sm-3 div-table-header--name">参数名称</li>'+
                                '<li class="col-sm-1 div-table-header--yesno">是否必须</li>'+
                                '<li class="col-sm-2 div-table-header--type">类型</li>'+
                                '<li class="col-sm-2 div-table-header--default">默认值</li>'+
                                '<li class="col-sm-4 div-table-header--describe">描述</li>'+
                            '</ul>'+
                        '</div>'+
                    '<!-- 内容区域 -->'+
                    '<div class="div-table div-table-section editing div-editing-table col-sm-12" data-sortable-id="32" aria-dropeffect="move">'+
                    '</div></div>';
            }
            // 渲染页面结构
            $(this).find('.response-table__panel').html(editHtml);
            
            // 每次重新渲染页面结构后需要重新获取一次页面容器节点。
            // 表格容器
            this.tablePanel = $(this).find('.div-table-section');
            // 添加参数按钮
            this.btnJoinLi = $(this).find('.btn__joinli');
            // 导入json按钮
            this.btnExportJSON = $(this).find('.btn__exportJSON');
            // 保存按钮
            this.btn__savedata = $(this).find('.btn__savedata');
            // 清空数据按钮
            this.btn__cleardata = $(this).find('.btn__cleardata');
            // 单条数据操作
            this.itemOperation();
            // 单条数据对象新增数据
            this.itemNewItem();
            // 根据 => 表格列表数组 => 渲染页面   初始渲染
            // console.log('渲染前',this.tablePanel)
            this.tableRendering().renderAll();
            // console.log('渲染后',this.tablePanel)
            // 表格绑定监听，如果是显示则关闭监听，编辑开启监听。
            this.itemChangeValue();

            // 根据目录对表格进行组装界面    
            // 更改源数据格式
            // 首先要判断当前对象是不是空的。          
            var objSettingArr = [];
            for(i in objSetting){
                objSettingArr.push(i);
            }
            // console.log(objSettingArr.join('').length)
            // 等于0 代表这个数据并没有被创建，所以要创建一次。之后都不必再创建.
            if(objSettingArr.join('').length == 0){
                for(var i=0;i<pattern.menu.length;i++){
                    objSetting[pattern.menu[i]] = "";
                }
            }

            var menustr = pattern.menu.join('');
            // 没有参数名称
            if(menustr.indexOf('name') < 0){
                // console.log('没有参数名称')
                $(this).find('.div-table-header--name').attr("style","display:none");
            }
            // 没有必须
            if(menustr.indexOf('yesno') < 0){
                // console.log('没有必须')
                $(this).find('.div-table-header--yesno').attr("style","display:none");
            }
            // 没有类型
            if(menustr.indexOf('type') < 0){
                // console.log('没有类型')
                $(this).find('.div-table-header--type').attr("style","display:none");
            }
            // 没有默认值
            if(menustr.indexOf('default') < 0){
                // console.log('没有默认值')
                $(this).find('.div-table-header--default').attr("style","display:none");
            }
            // 没有描述
            if(menustr.indexOf('describe') < 0){
                // console.log('没有描述')
                $(this).find('.div-table-header--describe').attr("style","display:none");
            }

        }

        // 插入一条数据
        retab.joinLi = function(){

            var that = this;

            this.btnJoinLi.on('click',function(){
                // 新创建的会自动生成一个随机id
                // 根据源数据 生成对象
                // console.log(objSetting)
                var newItemObj = {
                    id:'N'+Math.floor(Math.random()*10000000),     // 单数据 id
                    name:'',                                       // 单数据 参数名称
                    yesno:'false',                                 // 单数据 是否必须
                    default:'',                                    // 单数据 默认值
                    type:'string',                                 // 单数据 类型
                    describe:''                                    // 单数据 子列表
                };
                
                objSetting.id = 'N'+Math.floor(Math.random()*10000000);     // 单数据 id
                objSetting.yesno = 'false';                                 // 单数据 是否必须
                objSetting.type = 'string';                                 // 单数据 类型

                that.tableArray.push(newItemObj)
                // console.log(that.tableArray)
                // 操作完之后要重新render一下页面 根据 => 表格列表数组 => 渲染页面   单独渲染
                that.tableRendering().render(newItemObj);
            });
        },
        // 单条数据操作
        retab.itemOperation = function(){
            
            var that = this;

            // 监听单条item的类型，如果为对象，活着对象数组，则让当前的操作中显示+号
            that.tablePanel.on('change','.select-type',function(){
                // console.log($(this).val())
                if($(this).val() == 'object' || $(this).val() == 'array[object]' ){
                    $(this).parent().parent().find('.item-plus').show()
                }else{
                    $(this).parent().parent().find('.item-plus').hide()
                }
            });

            // 删除单条item
            that.tablePanel.on('click','.item-remove',function(){
                // 页面删除节点
                $(this).parent().parent().parent().remove();
                // 数组删除对象
                var $item_id = $(this).parent().parent().parent().attr('data-table-item-id');
                // console.log($item_id)
                for(var i=0;i<that.tableArray.length;i++){
                    if(that.tableArray[i].id==$item_id){
                        that.tableArray.splice(i,1)
                    }
                }
                // console.log(that.tableArray)
            });
        },
        // 单条数据对象新增数据,子集状态管理（收缩，展开）
        retab.itemNewItem = function(){
            var that = this;
            // 单条数据 item 新增一个子集,逻辑是获取当前修改的那个临时id
            that.tablePanel.delegate('.item-plus','click',function(){
                // console.log($(this).parents('.div-table-line').length)
                // 获取当前位第几层
                var $table__layer = $(this).parents('.div-table-line').length;

                var $panel = $(this).parent().parent().next('.sub');
                // 获取父级的 item-id
                var $plus_id = $(this).parent().parent().parent().attr('data-table-item-id');
                // console.log($plus_id)
                // 新创建的会自动生成一个随机id
                var newChildrenItemObj = {
                    id:'NC'+Math.floor(Math.random()*10000000),     // 单数据 id
                    pid:$plus_id,                                   // 单数据 父级id
                    name:'',                                        // 单数据 参数名称
                    yesno:'false',                                  // 单数据 是否必须
                    default:'',                                     // 单数据 默认值
                    type:'string',                                  // 单数据 类型
                    describe:'',                                    // 单数据 描述
                };

                // 数据更新到数组
                that.tableArray.push(newChildrenItemObj);
                // console.log(that.tableArray)
                // 操作完之后要重新render一下页面 根据 => 表格列表数组 => 渲染页面   单独渲染
                that.tableRendering().renderChildren(newChildrenItemObj,$table__layer,$panel);
            });
            
            // 单条数据 item 子集状态管理，收缩，展开
            that.tablePanel.delegate('.toggleItemChild','click',function(){
                // 改变按钮
                if($(this).find('i').hasClass('glyphicon-chevron-down')){
                    $(this).find('i').attr("class","glyphicon glyphicon-chevron-right")
                }else{
                    $(this).find('i').attr("class","glyphicon glyphicon-chevron-down")
                }
                $(this).parent().parent().next('.sub').toggle();
            });
        },
        // 表格绑定监听，如果是显示则关闭监听，编辑开启监听。
        retab.itemChangeValue = function(){

            var that = this;

            // 获取表格中所有的 input ,绑定监听数据变化
            var $input_list = $('.div-table input');
            that.tablePanel.on('change',$input_list,valueChange);
            
            // 获取表格中所有的 select ,绑定监听数据变化
            var $select_list = $('.div-table select');
            that.tablePanel.on('change',$select_list,valueChange);
            
            /*****
            *  监听执行事件
            *  @param  : item (当前对象) index (当前对象在页面树中所在层级)
            *  @return : str (新增的节点)
            *****/
            function valueChange(event){

                // 获取id,去数组中修改数据
                var $eid = $(event.target).parent().parent().parent().attr('data-table-item-id');

                if($(event.target).hasClass('table-line__name')){
                    for(var i=0;i<that.tableArray.length;i++){
                        if(that.tableArray[i].id==$eid){
                            that.tableArray[i].name = $(event.target).val();
                        }
                    }
                }else if($(event.target).hasClass('table-line__default')){
                    for(var i=0;i<that.tableArray.length;i++){
                        if(that.tableArray[i].id==$eid){
                            that.tableArray[i].default = $(event.target).val();
                        }
                    }
                }else if($(event.target).hasClass('table-line__describe')){
                    for(var i=0;i<that.tableArray.length;i++){
                        if(that.tableArray[i].id==$eid){
                            that.tableArray[i].describe = $(event.target).val();
                        }
                    }
                }else if($(event.target).hasClass('select-type')){
                    for(var i=0;i<that.tableArray.length;i++){
                        if(that.tableArray[i].id==$eid){
                            that.tableArray[i].type = $(event.target).val();
                        }
                    }
                }else if($(event.target).hasClass('select-yesno')){
                    for(var i=0;i<that.tableArray.length;i++){
                        if(that.tableArray[i].id==$eid){
                            that.tableArray[i].yesno = $(event.target).val();
                        }
                    }
                }

            }

        },
        // 数据渲染，初始化渲染，单数据渲染，子集渲染
        retab.tableRendering = function(){

            var that = this;

            /*****
            *  节点结构 (编辑模式)
            *  @param  : item (当前对象) index (当前对象在页面树中所在层级)
            *  @return : str (新增的节点)
            *****/
            var itemStr = function(item,index){
                // console.log(index)
                var str = '';
                var strOne_one = '<div class="col-sm-12 div-table-line placeholder-response-args div-editing-line" role="option" aria-grabbed="false" data-table-item-id='+item.id+' data-table-item-index='+index+' style="padding: 0;">'+
                '<!-- 单条数据：主干 -->'+
                '<ul class="cb">'+
                    '<li class="col-sm-1">'+
                        '<i class="glyphicon glyphicon-remove item-remove"></i>';
                // 如果是最大的父亲节点，加入可收缩的按钮
                var strOne_one_one = "";
                if(index == 0){
                    // <i class="glyphicon glyphicon-chevron-down" aria-hidden="true"></i>
                    // <i class="glyphicon glyphicon-chevron-right" aria-hidden="true"></i>
                    // 默认向下，不收缩
                    strOne_one_one = '<span class="toggleItemChild"><i class="glyphicon glyphicon-chevron-down" aria-hidden="true"></i></span>';
                }
                // 判断如果是object类型的话就直接显示加号
                var strOne_two = "";
                if(item.type == 'object' || item.type == 'array[object]'){
                    strOne_two = '<i class="glyphicon glyphicon-plus item-plus"></i>';
                }else{
                    strOne_two = '<i class="glyphicon glyphicon-plus item-plus" style="display:none;"></i>';
                }

                var strOne_three = '<!--<i class="iconfont icon-drag-copy" draggable="true"></i> --></li>';

                // 参数名称
                var strTwo = "";
                if(typeof objSetting.name !== 'undefined'){
                    strTwo = '<li class="col-sm-2 input"><input type="text" style="padding-left:'+ index * 15 +'px;" class="text name table-line__name" value="' + item.name + '"></li>';
                }
                // 是否必须
                var strThree = "";
                if(typeof objSetting.yesno !== 'undefined'){
                    strThree = '<li class="col-sm-1"><select class="select-yesno">' + selectOption(item.yesno) + '</select></li>';
                }
                // 类型
                var strFive = "";
                if(typeof objSetting.type !== 'undefined'){
                    strFive = '<li class="col-sm-2"><select class="select-type">' + selectTyle(item.type) + '</select></li>';
                }
                // 默认值
                var strSix = "";
                if(typeof objSetting.default !== 'undefined'){
                    strSix = '<li class="col-sm-2"><input type="text" class="text table-line__default" value=' + item.default + '></li>';
                }
                // 描述
                var strSeven = "";
                if(typeof objSetting.describe !== 'undefined'){
                    strSeven = '<li class="col-sm-4 input full-height"> <input type="text" class="text table-line__describe" value=' + item.describe + '></li>';
                }
                // 最后尾巴
                var strNine = '</ul><!-- 单条数据：分支 --><div class="sub div-editing-table" data-sortable-id="65" aria-dropeffect="move"></div></div>';

                // 最后返回拼接好的字符串
                str = strOne_one + strOne_one_one + strOne_two + strOne_three + strTwo + strThree + strFive + strSix + strSeven + strNine;
                return str
            }

            /*****
            *  节点结构 (浏览模式)
            *  @param  : item (当前对象) index (当前对象在页面树中所在层级)
            *  @return : str (新增的节点)
            *****/
            var browseStr = function(item,index){
                // console.log(item)
                var str = '';
                var strOne_one = '<div class="col-sm-12 div-table-line placeholder-response-args div-editing-line" role="option" aria-grabbed="false" data-table-item-id='+item.id+' data-table-item-index='+index+' style="padding: 0;">'+
                '<!-- 单条数据：主干 --><ul class="cb">';
                // 判断如果是object类型的话就直接显示加号
                // name
                var strOne_three = "";
                if(typeof objSetting.name !== 'undefined'){
                    strOne_three = '<li class="col-sm-3 input"><div style="padding-left:'+ index * 15 +'px;" class="text name" >' + item.name + '</div></li>';
                }
                // yesno
                var strTwo = "";
                if(typeof objSetting.yesno !== 'undefined'){
                    strTwo = '<li class="col-sm-1">' + item.yesno + '</li>';
                }
                // type
                var strFour = "";
                if(typeof objSetting.type !== 'undefined'){
                    strFour = '<li class="col-sm-2">' + item.type + '</li>';
                }
                // default
                var five = "";
                if(typeof objSetting.default !== 'undefined'){
                    five = '<li class="col-sm-2"><div class="text table-line__default">'+ item.default+'</div></li>';
                }
                // describe
                var strSix = "";
                if(typeof objSetting.describe !== 'undefined'){
                    strSix = '<li class="col-sm-4 input full-height"><div class="text table-line__describe">' + item.describe + '</div></li>';
                }
                // 尾巴
                var strSeven = '</ul><!-- 单条数据：分支 --><div class="sub div-editing-table" data-sortable-id="65" aria-dropeffect="move"></div></div>';
                
                // 最后返回拼接好的字符串
                str = strOne_one + strOne_three + strTwo + strFour + five + strSix + strSeven;
                return str
            }

            /*****
            *  初始化渲染表格数据   页面加载数据
            *  @param  : arr (数据源)
            *  @return : 无 (返回值说明)
            *****/
            function defaultRender(arr){
                // console.log(arr)
                // 这里要区分 现在显示的 编辑模式还是预览模式
                
                if(thisPattern == 'edit'){
                    for(var i=0;i<arr.length;i++){
                        (function(index){
                            if(arr[index].pid){
                                // 这里要去寻找他的父级所在地，然后往sub中推入自己
                                that.tablePanel.find('.div-table-line').each(function(ind,item){
                                    // 获取上一级的坐标层，传入渲染
                                    var ii = Number($(item).attr('data-table-item-index')) + 1;
                                    // 获取页面的所有子集，找出父级所在,往父级所在推入自己, 这边要注意，一定要拿第一个的sub位置，不然默认会获取整个item里的所有sub,包括子集
                                    if($(item).attr('data-table-item-id') == arr[index].pid){
                                        $(item).find('.sub').eq(0).append(itemStr(arr[index],ii))
                                    }
                                })
                            }else{
                                // 这里代表都是父级，直接推入页面。
                                that.tablePanel.append(itemStr(arr[index],0))
                            }
                        })(i)
                    }
                }else if(thisPattern == 'browse'){
                    for(var i=0;i<arr.length;i++){
                        (function(index){
                            if(arr[index].pid){
                                // 这里要去寻找他的父级所在地，然后往sub中推入自己
                                that.tablePanel.find('.div-table-line').each(function(ind,item){
                                    // 获取上一级的坐标层，传入渲染
                                    var ii = Number($(item).attr('data-table-item-index')) + 1;
                                    // 获取页面的所有子集，找出父级所在,往父级所在推入自己
                                    if($(item).attr('data-table-item-id') == arr[index].pid){
                                        // 获取页面的所有子集，找出父级所在,往父级所在推入自己, 这边要注意，一定要拿第一个的sub位置，不然默认会获取整个item里的所有sub,包括子集
                                        $(item).find('.sub').eq(0).append(browseStr(arr[index],ii))
                                    }
                                })
                            }else{
                                // 这里代表都是父级，直接推入页面。
                                that.tablePanel.append(browseStr(arr[index],0))
                            }
                        })(i)
                    }
                }
                
            }

            /*****
            *  对下拉列表进行loop新增option
            *  @param  : arr (需要拼接的select数组)
            *  @return : arrsttss (拼接后的节点字符串)
            *****/
            function itemLoop(arr){
                var arrsttss = '';
                for(var i = 0;i<arr.length;i++){
                    arrsttss += '<option value='+arr[i]+'>'+arr[i]+'</option>';
                }
                return arrsttss
            }

            /*****
            *  设置 类型 
            *  @param  : type (类型)
            *  @return : wu (返回值说明)
            *****/
            function selectTyle(type){
                var selted = '<option selected = "selected" value='+type+'>'+type+'</option>'
                var typeSelect = '';
                for(var i=0;i<that.typeArray.length;i++){
                    if(that.typeArray[i] !== type){
                        typeSelect += '<option value='+that.typeArray[i]+'>'+that.typeArray[i]+'</option>';
                    }
                }
                return selted+typeSelect
            }

            /*****
            *  设置“是否必须的选中” 
            *  @param  : bul (是否选中)
            *  @return : str (option字符串)
            *****/      
            function selectOption(bul){
                var str = '';
                if(bul == 'true'){
                    str = '<option value="true" selected = "selected">true</option><option value="false">false</option>';
                }else{
                    str = '<option value="true">true</option><option value="false" selected = "selected">false</option>';
                }
                return str
            }     

            /*****
            *  渲染整个表格
            *  @param  : 无 (参数)
            *  @return : 无 (返回值说明)
            *****/
            var renderAll = function(){
                // console.log(that.tableArray)
                defaultRender(that.tableArray)
            }

            /*****
            *  新增数据,渲染单条数据
            *  @param  : obj (当前新增的数据对象)
            *  @return : 无 (返回值说明)
            *****/
            var render = function(obj){
                if(thisPattern == 'edit'){
                    that.tablePanel.append(itemStr(obj,0));
                }else if(thisPattern == 'browse'){
                    that.tablePanel.append(browseStr(obj));
                }
            }

            /*****
            *  渲染单条数据 => 子集
            *  @param  : obj (当前新增的数据对象) index (当前对象所在的层级) panel (当前新增对象的目的地容器)
            *  @return : 无 (返回值说明)
            *****/
            var renderChildren = function(obj,index,panel){              
                if(thisPattern == 'edit'){
                    panel.append(itemStr(obj,index))
                }else if(thisPattern == 'browse'){
                    panel.append(browseStr(obj,index))
                }
            }

            return {
                renderAll : renderAll,
                render : render,
                renderChildren : renderChildren
            }
        },
        // 提交数据方法
        retab.saveTable = function(){
            /*****
            *  打印最后保存的表格数据 
            *  @param  :  (参数)
            *  @return :  (返回值说明)
            *****/
            var that = this;
            that.btn__savedata.on('click',function(){

                console.log(that.tableArray)

            })
        },
        // 导入json数据方法
        retab.exportJson = function(){
            
            var that = this;

            // 阻止没有传入数据
            if(!options.data){
                return false
            }

            // 导入按钮点击事件
            that.btnExportJSON.on('click',function(){
                // 清空表格数据
                that.clearTable().clear();
                // 重新赋值
                that.tableArray = deepcopy(options.data);
                // 渲染页面结构
                that.tableRendering().renderAll();
            })

            /*****
            *  深度复制数组
            *  @param  : obj (需要复制的数组)
            *  @return : out (返回新的数组)
            *****/
            function deepcopy(obj) {
                var out = [],i = 0,len = obj.length;
                for (; i < len; i++) {
                    if (obj[i] instanceof Array){
                        out[i] = deepcopy(obj[i]);
                    }
                    else out[i] = obj[i];
                }
                return out;
            }

        },
        // 清空表格数据
        retab.clearTable = function(){
            var that = this;

            function clear(){
                // 清空原有数据
                that.tableArray = [];
                // 清除页面结构
                that.tablePanel.html('');
            }
            
            function clearFun(){
                that.btn__cleardata.on('click',function(){
                    clear();
                })
            }
            
            return {
                clear:clear,
                clearFun:clearFun
            }
        }

        // 初始化
        retab.init();

        return this;

    };
    
})(jQuery);