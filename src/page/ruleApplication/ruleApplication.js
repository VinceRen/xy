/**
 * Created by Administrator on 2020/3/2 0002.
 */

treeShow(ajaxdataztree,$("#treeDemo"), true);


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
    {
        data: "description",
        render: function (data, type, row) {
            return '<a  class="pointer tdn data-name">' + data + '</a>';
        },
        orderable: false
    },
    {
        data: "conversationName",
        render: function (data, type, row) {
            return '<a  class="pointer tdn data-name">' + data + '</a>';
        },
        orderable: false
    },
    {
        data: "groupId",
        render: function (data, type, row) {
            return '<a  class="pointer tdn data-name">' + data + '</a>';
        },
        orderable: false
    },
    {
        data: "artifactId",
        render: function (data, type, row) {
            return '<a  class="pointer tdn data-name">' + data + '</a>';
        },
        orderable: false
    },
    {
        data: "version",
        render: function (data, type, row) {
            return '<a  class="pointer tdn data-name">' + data + '</a>';
        },
        orderable: false
    },
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
var dataurl = ajaxdatatable;
var delete_ele = "undefined";
var data_manage = {
    getQueryCondition: function (data) {
        var param = {};
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
// tableshow($(".table-datatable"),
//     datatable_columns,
//     datatable_ele,
//     dataurl,
//     delete_ele,
//     data_manage,
//     del_url);
function singaltree_click(id, treeId, treeNode) {
    if(!treeNode.isParent){
        dataurl = dataurl + '?name=' + treeNode.name;
        tableshow($(".table-datatable"),
            datatable_columns,
            datatable_ele,
            dataurl,
            delete_ele,
            data_manage,
            del_url);
        $('.tab-content').removeClass('d-hidden');
    }
}
function drawcallback(ele, tableele) {
    layui.use('form', function(){
        var form = layui.form;
        form.render();
    });
}
//表格添加
$('.main-box').on('click','.table-add',function () {
    layershow("表格添加",["500px","300px"],$(".layer-form1"));
    $('#table-form1 #form-save').attr('data-id', null);
});

//表格编辑-弹层
$('.main-box').on('click','.table-edit',function () {
    layershow("表格编辑",["500px","300px"],$(".layer-form1"));
    $('#table-form1 #form-save').attr('data-id', $(this).closest('div').attr('data-id'));
    $('#table-form1 #name').val($(this).closest('tr').find('td:nth-child(2)').text());
    $('#table-form1 #founder').val($(this).closest('tr').find('td:nth-child(3)').text());
    $('#table-form1 #time').val($(this).closest('tr').find('td:nth-child(4)').text());
    $('#table-form1 #groupId').val($(this).closest('tr').find('td:nth-child(5)').text());
    $('#table-form1 #artifactId').val($(this).closest('tr').find('td:nth-child(6)').text());
    $('#table-form1 #version').val($(this).closest('tr').find('td:nth-child(7)').text());
});

//表格弹层表单-保存
$('.layer-form1').on('click','#form-save',function () {
    let id = $('#table-form1 #form-save').attr('data-id') ? $('#table-form1 #form-save').attr('data-id') : null;
    let formdata = {
        id : id,
        name : $('#table-form1 #name').val(),
        founder : $('#table-form1 #founder').val(),
        time : $('#table-form1 #time').val(),
        groupId : $('#table-form1 #groupId').val(),
        artifactId : $('#table-form1 #artifactId').val(),
        version : $('#table-form1 #version').val()
    }

    $.ajax({
        url: ajaxdatatableupdate,
        data: formdata,
        dataType: 'json',
        success: function(rlt){
            if(!id){
                layer.msg('添加成功');
            }else{
                layer.msg('修改完成');
            }
            $('#form-save').siblings('button').trigger('click');
            $('#example').DataTable().draw();;
        },
        error: function (r) {
            if(!id){
                layer.msg('添加失败');
            }else{
                layer.msg('修改失败');
            }
        }
    });
    tableshow($(".table-datatable"),datatable_columns,datatable_ele,dataurl,delete_ele,data_manage,del_url);
});
//表格删除
$('.main-box').on('click','.table-delete',function () {
    let that = $(this);
    $.ajax({
        url: ajaxdatatabledelete,
        data:{},
        dataType: 'json',
        success: function (rlt) {
            that.closest('tr').remove();
            layer.msg('删除成功');
        },
        error: function (r) {
            layer.msg('服务错误，删除失败');
        }
    });
});

