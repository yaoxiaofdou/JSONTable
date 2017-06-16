/**
 * Created by Administrator on 2017/6/16.
 */
$(function () {
    $('#defaultForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            confirmPassword: {
                validators: {
                    notEmpty: {
                        message: 'The first name is required and cannot be empty'
                    }
                }
            },
            username: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
        e.preventDefault();

        // Get the form instance
        var $form = $(e.target);

        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');

        // Use Ajax to submit form data
        $.post($form.attr('action'), $form.serialize(), function(result) {
            console.log(result);
        }, 'json');
    });

   /* $(".confirm").on("click", function () {
        $('#defaultForm').bootstrapValidator('validate')
    })*/
    $(".cancel").on("click", function () {
        $('#defaultForm').data('bootstrapValidator').resetForm(true);
    })
})