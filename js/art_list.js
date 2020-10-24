$(function() {
    // 定义美化时间的过滤器
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    template.defaults.imports.timer = function(date) {
            const dt = new Date(date)
            var y = dt.getFullYear()
            var m = padZero(dt.getMonth() + 1)
            var d = padZero(dt.getDate())
            var hh = padZero(dt.getHours())
            var mm = padZero(dt.getMinutes())
            var ss = padZero(dt.getSeconds())
            return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
        }
        // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var obj = {
        pagenum: 1, //	int	页码值
        pagesize: 2, //	int	每页显示多少条数据
        cate_id: '', //string	文章分类的 Id
        state: '', //	文章的状态，可选值有：已发布、草稿
    };
    // 渲染表格数据

    function getList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: obj,
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取数据失败！')
                var htmS = template('htm', res);
                $('tbody').empty().html(htmS);
                // 获取文章个数
                getData(res.total)
            }
        })
    }
    getList();
    // 渲染分类区域
    function getClass() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            data: obj,
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取类别失败！')
                var htmS = template('htm_class', res);
                $('[name=cate_name]').empty().html(htmS);
                form.render();
            }
        })
    }
    getClass()
        // 提交表单筛选渲染
    $('#formS').on('submit', function(e) {
        e.preventDefault();
        var cate_id = $('[name=cate_name]').val();
        var state = $('[name=state]').val();
        obj.cate_id = cate_id;
        obj.state = state;
        getList()
    })

    function getData(total) {
        laypage.render({
            elem: 'pages', //注意，这里的 test1 是 ID，不用加 # 号
            limit: obj.pagesize,
            count: total, //数据总数，从服务端得到
            curr: obj.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 7, 10],
            //分页发生切换和渲染第一次时就会调用这个函数，然后就会触发
            // 得到页码值，然后给obj.pagenum
            jump: function(num, first) {
                obj.pagenum = num.curr
                obj.pagesize = num.limit
                if (!first) {
                    // obj中的数据更新，所以我们要从新渲染页面，要再次调用getList（）
                    getList();
                }
            },
        });
    }
    $('tbody').on('click', '.btnDele', function(e) {
        e.preventDefault();
        var len = $('.btnDele').length;
        var id = $(this).attr('data-id');
        //eg1
        layer.confirm('确定要删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: 'GET',
                url: "/my/article/delete/" + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg('删除失败');
                    if (len === 1) {
                        obj.pagenum = obj.pagenum === 1 ? 1 : obj.pagenum - 1;
                    }
                    getList();
                }
            })
            layer.close(index);
        });

    })

})