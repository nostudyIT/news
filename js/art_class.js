$(function() {
    // 定义渲染文章类别
    function getArt() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmS = template('htm', res)
                $('tbody').empty().html(htmS)
            }
        })
    }
    getArt()
    var layer = layui.layer;
    var form = layui.form;
    // 因为要关闭弹出层， 所以声明一个变、
    var indexD = null;
    $('#btnClass').on('click', function() {
            indexD = layer.open({
                type: 1,
                area: ['500px', '300px'],
                title: '添加文章分类',
                content: $('#add_c').html(),
            });
        })
        // 因为页面一开始没有这个表单， 只有当点击添加按钮时才会出现， 所以我们要给他用
        // 事件委托
    $('body').on('submit', '#form_ad', function(e) {
            e.preventDefault();
            $.ajax({
                type: 'POST',
                url: '/my/article/addcates',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) return layer.msg('添加类别失败！');
                    // 添加后要重新渲染
                    getArt()
                    layer.msg('添加类别成功！');
                    // 添加成功要关闭弹出层
                    layer.close(indexD)
                }
            })
        })
        // 通过事件委托方式给编辑按钮添加点击事件
    var indexX = null;
    $('tbody').on('click', '.btnBj', function(e) {
            e.preventDefault();
            indexX = layer.open({
                type: 1,
                area: ['500px', '300px'],
                title: '添加文章分类',
                content: $('#ma_x').html(),
            });
            // 点击后获取当前数据id值
            var id = $(this).attr('data-id');
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    form.val('formClass', res.data)
                }
            })
        })
        // 通过事件委托方式给提交数据发送请求，更新数据

    $('body').on('submit', '#form_ad', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('更新分类信息失败');
                layer.msg('更新分类信息成功！');
                layer.close(indexX);
                // 更新完数据渲染页面
                getArt();
            }
        })
    });
    // 通过事件委托方式给提交数据发送请求，删除数据

    $('tbody').on('click', '.btnDele', function(e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        layer.confirm('确定要删除吗?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg('删除失败！');
                    layer.msg('删除成功');
                    // 删除完数据渲染页面
                    getArt();
                }
            })
            layer.close(index);
        });

    })

})