/**
 * Created by Administrator on 2017/6/16.
 */
$(function () {
    $(".add").on("click", function () {
        $.confirm({
            title: 'Confirm!',
            content: 'Confirm! Confirm! Confirm!',
            confirmButtonClass: 'btn-info',     //按钮样式
            cancelButtonClass: 'btn-danger',    //按钮样式
            confirmButton: '确定',
            cancelButton: '取消',
            confirm: function(){
                alert('the user clicked confirm');
            },
            cancel: function(){
                // alert('the user clicked cancel')
            }
        });
    })
})