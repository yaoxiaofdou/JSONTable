# JSONTable
针对 json 数据的特殊情况制作的包含显示层级的 JQ表格插件。界面用的是bootstarp,所以调用的时候请引用一下样式。

![1](http://220.160.111.78:59459/file/download/downloadFile.do?filePath=/sumer/iss_sumer/JSONTable.png)

### DEMO

[点击查看-demo](http://www.inamorato.cn/jsontable/static/)

## 是否还在为在表格中显示JSON数据不友好而烦恼？ ##

==》那就来试试我的JSONTable吧！



#### 基本配置

/*****

​      \*  默认全部都有

​      \*  @param  : data ( 传入默认数据，数组 )

​      \*  @param  : pattern: [ edit (编辑模式) , browse(浏览模式) ]

​      \*  @param  : menu:[operation (操作),name (参数),yesno (必须),default (默认),type (类型),describe (描述)] *****/

`$('#response-table').responseTable({`

​            `data : data,`

​            `pattern:'edit',`

​            `menu:['name','yesno','default','type','describe']`

  `});`



#### 下载

git clone https://github.com/yaoxiaofdou/JSONTable.git

