$(function() {
    // 登录和注册页面的切换
    $('#qzc').on('click', function() {
        $('.dl').hide();
        $('.zc').show();
    })
    $('#qdl').on('click', function() {
        $('.zc').hide();
        $('.dl').show();
    })

    var form = layui.form;
    var layer = layui.layer;
    // 给注册和登录设置验证规则
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        rePwd: function(value) {
            if (value !== $('#zc [name=password]').val()) return '两次密码不一致'
        }
    });
    // 注册发送请求
    $('#zc').on('submit', function(e) {
        // 表单内的所有事件都应该需要清除默认触发
        e.preventDefault();

        var data = {
            username: $('#zc [name=username]').val(),
            password: $('#zc [name=password]').val()
        };
        $.ajax({
            type: 'POST',
            // 因为每次发送ajax请求的时候都会执行$.ajaxPrefilter(function(options) {}这个函数 options 代表配置项
            url: '/api/reguser',
            data: data,
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                console.log(res);
                layer.msg('注册成功，请登录！');
                $('#qdl').click();
            }
        })
    })
    $('#dl').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            // serialize()直接获取表单项值
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('登录失败！');
                layer.msg('登录成功！');
                // 因为登录需要验证请求头， 所以保存在内存中， 需要的时候就取出、 来
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})