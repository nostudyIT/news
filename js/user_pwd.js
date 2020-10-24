$(function() {
    var form = layui.form;
    var layer = layui.layer;
    // 密码验证规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 新旧密码验证
        newPwd: function(value) {
            if (value === $('[name=oldPwd]').val()) return '新旧密码不能相同！';
        },
        // 确认密码验证
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) return '两次密码不一致！'
        }
    });
    // 修改密码
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('密码修改不成功！');
                return layer.msg("密码修改成功！");
            }
        })
    })

})