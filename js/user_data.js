var form = layui.form;
// 密码验证、规则
form.verify({
    nickname: function(value) {
        if (value.length > 6) return '昵称必须在1~6个字符之间！';
    }
});

var layer = layui.layer
getInfo();
// 获取用户填入信息
function getInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'GET',
        success: function(res) {
            if (res.status !== 0) return layer.msg('获取用户信息失败')
                //    快速填写表单
            form.val('formName', res.data)
        }
    })
}
// 点击重置，从新填入默认表单信息
$('#btnReset').on('click', function(e) {
        e.preventDefault();
        getInfo();
    })
    // 更新用户数据
$('.layui-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) return layer.msg('修改用户失败！');
            layer.msg('修改用户信息成功！');
            window.parent.getInfoUser();
        }
    })
})