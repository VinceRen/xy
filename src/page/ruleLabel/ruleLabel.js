/**
 * Created by Administrator on 2020/3/2 0002.
 */

function drawcallback(ele, tableele) {
    layui.use('form', function(){
        var form = layui.form;
        form.render();
    });
}
function tableFun1() {
    var datatable_columns = [
        {
            data: "id",
            render: function (data, type, row) {
                return '<input data-id="' + data + '" type="checkbox" name="select" title="" lay-skin="primary">'
            },
            orderable: false
        },
        {
            data: "name",
            render: function (data, type, row) {
                return '<a  class="pointer tdn data-name">' + data + '</a>';
            },
            orderable: false
        },
        { data: "desc", orderable: false },
        { data: "createtime", orderable: false },
        { data: "edittime", orderable: false },
        {
            data: "id",
            render: function (data, type, row) {

                return `<div class="data-name" data-id=${data}>
                        <button class="btn btn-xs btn-primary table-edit"><i class="fa fa-pencil"></i> 编辑</button>
                        <button class="btn btn-xs btn-primary table-delete"><i class="fa fa-trash-o"></i> 删除</button>
                    </div>`;
            },
            orderable: false
        },
    ];
    var datatable_ele = null;
    var dataurl = ajaxdatatable1;
    var delete_ele = "undefined";
    var data_manage = {
        getQueryCondition: function (data) {
            var param = {search: null};
            //组装排序参数
            if (data.order && data.order.length && data.order[0]) {
                var sqlName = data.columns[data.order[0].column].data;
                param.orderColumn = sqlName;
                //排序方式asc或者desc
                param.orderDir = data.order[0].dir;
            }

            //组装分页参数
            param.startIndex = data.start;
            param.pageSize = data.length;
            param.draw = data.draw;
            return param;
        }
    };
    var del_url = "undefined";
    tableshow($(".table-datatable"),
        datatable_columns,
        datatable_ele,
        dataurl,
        delete_ele,
        data_manage,
        del_url,
      "POST");
}
tableFun1();

//表格添加
$('.main-box').on('click','.table-add',function () {
    layershow("标签添加",["500px","auto"],$(".layer-form1"));
    $('#table-form1 #form-save').attr('data-id', null);
});

//表格编辑-弹层
$('.main-box').on('click','.table-edit',function () {
    layershow("表格编辑",["500px","auto"],$(".layer-form1"));
    $('#table-form1 #form-save').attr('data-id', $(this).closest('div').attr('data-id'));
    $('#table-form1 #name').val($(this).closest('tr').find('td:nth-child(2)').text());
    $('#table-form1 #desc').val($(this).closest('tr').find('td:nth-child(3)').text());
});

//表格弹层表单-保存
$('.layer-form1').on('click','#form-save',function () {
    let id = $('#table-form1 #form-save').attr('data-id') ? $('#table-form1 #form-save').attr('data-id') : null,
        ajaxUrl = id ? ajaxdatatableedit : ajaxdatatableadd;

    let formdata = {
        id : id,
        name : $('#table-form1 #name').val(),
        desc : $('#table-form1 #desc').val(),
    }
    if(!$('#table-form1 #name').val()){
        layer.msg('名称不能为空！');
        $('#table-form1 #name').focus();
        return false;
    }
    $.ajax({
        url: ajaxUrl,
        data: formdata,
        type: 'POST',
        dataType: 'json',
        xhrFields: { withCredentials: true},
        success: function(rlt){
            layer.msg(rlt.msg);
            if(rlt.code == 400){ return false;}
            $('#form-save').siblings('button').trigger('click');
            tableFun1();
        },
        error: function (r) {
            if(!id){
                layer.msg('添加失败');
            }else{
                layer.msg('修改失败');
            }
        }
    });
});
//表格删除
$('.main-box').on('click','.table-delete',function () {
    let that = $(this);
    function ajaxRemove(){
        $.ajax({
            url: ajaxdatatabledelete,
            type: 'POST',
            data:{id: that.closest('div').attr('data-id')},
            dataType: 'json',
            async: false,
            success: function (rlt) {
                that.closest('tr').remove();
                layer.msg(rlt.msg);
            },
            error: function (r) {
                layer.msg('服务错误，删除失败');
            }
        });
    }
    layer.confirm(
      '确定删除吗？',
      {title: '删除提示', closeBtn: 0},
      function(index){
        ajaxRemove();
        layer.close(index);
      }
    );
});

