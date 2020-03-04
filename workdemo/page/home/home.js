/**
 * Created by Administrator on 2020/3/2 0002.
 */
$(function () {
    $('form').bootstrapValidator({

        message: '请输入正确的值！',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: '邮箱地址不能为空'
                    }
                }
            }
        }
    });
});

$('body').on('click', '.nav-pills > li', function () {
    $(this).addClass('active').siblings('li').removeClass('active');
    $('.main-box').css({'marginLeft': '220px'});
});