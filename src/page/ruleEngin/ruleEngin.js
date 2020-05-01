/**
 * Created by Administrator on 2020/3/2 0002.
 */

function tableFun(search) {
    var ajaxSearch = search ? search : null;
    var param = {param: ajaxSearch};
    var datatable_columns = [
        {
            data: "id",
            render: function (data, type, row) {
                return '<input data-id="'+ data +'" type="checkbox" name="select" title="" lay-skin="primary">'
            },
            orderable: false
        },
        {
            data: "name",
            render: function (data, type, row) {
                // return '<a  class="pointer tdn data-name">'+ data +'</a>';
                return '<a  class="pointer tdn data-name" href="../createRule/index.html?id='+ row.id +'">' + data + '</a>';
            },
            orderable: false
        },
        {   data: "founder" , orderable: false  },
        {   data: "time" , orderable: false },
        {   data: "groupId" , orderable: false },
        {   data: "artifactId" , orderable: false },
        {   data: "version" , orderable: false },
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
            // var param = {};
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
    tableshow(
      $(".table-datatable"),
      datatable_columns,
      datatable_ele,
      dataurl,
      delete_ele,
      data_manage,
      del_url,
      "POST");
}
tableFun();

function drawcallback(ele, tableele) {
    layui.use('form', function(){
        var form = layui.form;
        form.render();
    });
}

function callbackBtn(ele, tableele){
    if($(ele).hasClass('table-edit')){
        //表格编辑-弹层
        layershow("表格编辑",["500px","300px"],$(".layer-form1"));
        $('#table-form1 #form-save').attr('data-id', $(ele).closest('div').attr('data-id'));
        $('#table-form1 #name').val($(ele).closest('tr').find('td:nth-child(2)').text());
        $('#table-form1 #founder').val($(ele).closest('tr').find('td:nth-child(3)').text());
        $('#table-form1 #time').val($(ele).closest('tr').find('td:nth-child(4)').text().slice(0, 10));
        $('#table-form1 #groupId').val($(ele).closest('tr').find('td:nth-child(5)').text());
        $('#table-form1 #artifactId').val($(ele).closest('tr').find('td:nth-child(6)').text());
        $('#table-form1 #version').val($(ele).closest('tr').find('td:nth-child(7)').text());

    }else if($(ele).hasClass('table-delete')){//表格删除
        //删除确认回调
        function ajaxRemove(){
            $.ajax({
                url: ajaxdatatabledelete,
                type: 'POST',
                data:{id: $(ele).closest('div').attr("data-id")},
                dataType: 'json',
                async: false,
                success: function (rlt) {
                    if(rlt.code == 200){
                        $(ele).closest('tr').remove();
                    }
                    if(rlt.msg){
                        layer.msg(rlt.msg);
                    }else{
                        layer.msg('删除成功');
                    }
                },
                error: function (r) {
                    layer.msg('服务错误，删除失败');
                }
            });
        }
        layer.confirm(
          '确定删除吗？',
          {title: '删除提示', closeBtn: 0},
          function (index) {
              ajaxRemove();
              layer.close(index);
        });
    }
}

//表格搜索清空
$('.main-box').on('click','.input-delete',function(){
    $(this).siblings('.input-search').val('').focus();
});
//表格搜索
$('.main-box').on('click','.btn-search',function () {
    let search = $(this).siblings('.input-search').val();
    tableFun(search);
});
//表格添加
$('.main-box').on('click','.table-add',function () {
    $('#table-form1 #form-save').attr('data-id', $(this).closest('div').attr('data-id'));
    $('#table-form1 #name').val("name");
    $('#table-form1 #founder').val("founder");
    $('#table-form1 #time').val("2020-02-05");
    $('#table-form1 #groupId').val("groupId");
    $('#table-form1 #artifactId').val("artifactId");
    $('#table-form1 #version').val("version");
    layershow("表格添加",["500px","300px"],$(".layer-form1"));
    $('#table-form1 #form-save').attr('data-id', null);
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
        version : $('#table-form1 #version').val(),
        strArray:'[]'
    }
    if(!formdata.name){
        layer.msg('请输入工程规则名称');
        $('#table-form1 #name').focus().addClass('has-error');
        return false;
    }else if(!formdata.founder){
        layer.msg('请输入创建人');
        $('#table-form1 #founder').focus().addClass('has-error');
        return false;
    }else if(!formdata.groupId){
        layer.msg('请输入组织标识');
        $('#table-form1 #groupId').focus().addClass('has-error');
        return false;
    }else if(!formdata.artifactId){
        layer.msg('请输入工程标识');
        $('#table-form1 #artifactId').focus().addClass('has-error');
        return false;
    }else if(!formdata.version){
        layer.msg('请输入版本');
        $('#table-form1 #version').focus().addClass('has-error');
        return false;
    }
    let ajaxUrl = id ? ajaxdatatableedit : ajaxdatatableadd;
    $.ajax({
        url: ajaxUrl,
        xhrFields: {withCredentials: true},
        type: "POST",
        data: formdata,
        dataType: 'json',
        success: function(rlt){debugger
            if(rlt.code == 200){
                $('#form-save').siblings('button').trigger('click');
                // $('#example').DataTable().draw();
                tableFun();
            }
            layer.msg(rlt.msg);
        },
        error: function (r) {
            layer.msg('服务错误，操作失败');
        }
    });
});

//form-清除has-error
$('#table-form1 input[type="text"]').keyup(function () {
    if($(this).hasClass('has-error')){
        $(this).val().length == 0 ? $(this).addClass('has-error').removeClass('has-success') : $(this).addClass('has-success').removeClass('has-error');
    }
});