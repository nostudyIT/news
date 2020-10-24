$(function() {
    getInfoUser()
        // 退出提示框
    $('#out').click(function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });

    })
})

var layer = layui.layer;
// 获取用户信息
function getInfoUser() {
    var token = localStorage.getItem('token')
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) return layer.msg('获取用户失败！')
            userImage(res.data)
        }
    })
}
// 用户更换头像
function userImage(info) {
    var name = info.nickname || info.username;
    $('#welcome').html(`欢迎 &nbsp; ${name} `);
    if (info.user_pic !== null) {
        $('.txt').hide();
        $('.layui-nav-img').prop('src', info.user_pic).show();
    } else {
        $('.txt').html(name[0].toUpperCase()).show();
        $('.layui-nav-img').hide()
    }

}