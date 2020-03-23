/**
 * Created by Administrator on 2020/3/2 0002.
 */
const ajaxType = 'JAVA';
function tableshowFun1(search) {
    var ajaxSearch = search ? search : null;
    var param = {search: ajaxSearch};
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
                return '<a  class="pointer tdn data-name">'+ data +'</a>';
            },
            orderable: false
        },
        {
            data: "version",
            render: function (data, type, row) {
                return '<a  class="pointer tdn data-name">'+ data +'</a>';
            },
            orderable: false
        },
        {
            data: "URL",
            render: function (data, type, row) {
                return '<a  class="tdn">'+ data +'</a>';
            },
            orderable: false
        },
        {
            data: "id",
            render: function (data, type, row) {

                return `<div class="data-name" data-id=${data}>
                        <button class="btn btn-xs btn-primary table-edit"><i class="fa fa-pencil"></i> 编辑</button>
                        <button class="btn btn-xs btn-primary table-delete"><i class="fa fa-trash-o"></i> 删除</button>
                        <button class="btn btn-xs btn-primary table-upload"><i class="fa fa-cloud-upload"></i> 更新</button>
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

    // CONSTANT.DATA_TABLES.DEFAULT_OPTION.paging = false;
    // CONSTANT.DATA_TABLES.DEFAULT_OPTION.info = false;
    tableshow($(".table-datatable1"),datatable_columns,datatable_ele,dataurl,delete_ele,data_manage,del_url);
}
function tableshowFun2(search) {
    var ajaxSearch = search ? search : null;
    var datatable_columns = [
        {
            data: "id",
            render: function (data, type, row) {
                return '<input data-id="'+ data +'" type="checkbox" name="select" title="" lay-skin="primary">'
            },
            orderable: false
        },
        {
            data: "nickname",
            render: function (data, type, row) {
                return '<a  class="pointer tdn data-name">'+ data +'</a>';
            },
            orderable: false
        },
        {
            data: "name",
            render: function (data, type, row) {
                return '<a  class="pointer tdn data-name">'+ data +'</a>';
            },
            orderable: false
        },
        {
            data: "desc",
            render: function (data, type, row) {
                return '<a  class="pointer tdn data-name">'+ data +'</a>';
            },
            orderable: false
        },
        {
            data: "path",
            render: function (data, type, row) {
                return '<a  class="tdn">'+ data +'</a>';
            },
            orderable: false
        },
        {
            data: "id",
            render: function (data, type, row) {

                return `<div class="data-name" data-id=${data}>
                        <button class="btn btn-xs btn-primary table-edit"><i class="fa fa-pencil"></i> 编辑</button>
                        <button class="btn btn-xs btn-primary table-delete"><i class="fa fa-trash-o"></i> 删除</button>
                        <button class="btn btn-xs btn-primary table-info"><i class="fa fa-th"></i> 详细</button>
                    </div>`;
            },
            orderable: false
        },
    ];
    var datatable_ele = null;
    var dataurl = ajaxdatatable2;
    var delete_ele = "undefined";
    var param = {type: ajaxType, search: ajaxSearch};//type = SPACE
    var data_manage = {
        getQueryCondition: function (data) {
            //var param = {type: 'JAVA'};
            //组装排序参数
            if (data.order && data.order.length && data.order[0]) {
                var sqlName = data.columns[data.order[0].column].data;
                param.orderColumn = sqlName;
                //排序方式asc或者desc
                param.orderDir = data.order[0].dir;
            }

            //组装分页参数
            param.startIndex = data.start;
            param.pageSize = data.length > 0 ? data.length : 10;
            param.draw = data.draw;
            return param;
        }
    };
    var del_url = "undefined";

    CONSTANT.DATA_TABLES.DEFAULT_OPTION.paging = false;
    CONSTANT.DATA_TABLES.DEFAULT_OPTION.info = false;
    tableshow($(".table-datatable2"),datatable_columns,datatable_ele,dataurl,delete_ele,data_manage,del_url,"POST");
}
function drawcallback() {
    layui.use('form', function(){
        var form = layui.form;
        form.render();
    });
}

tableshowFun1();
tableshowFun2();
//表格搜索清空
$('body').on('click','.input-delete',function(){
    $(this).siblings('.input-search').val('').focus();
});
//表格搜索
$('.main-box').on('click','.btn-search',function () {
    let search = $(this).siblings('.input-search').val();
    if($(this).closest('table').hasClass('table-datatable1')){
        tableshowFun1(search);
    }else if($(this).closest('table').hasClass('table-datatable2')){
        tableshowFun2(search);
    }
});
//表格添加
$('.main-box').on('click','.table-add',function () {
    if($(this).closest('table').hasClass('table-datatable1')){
        layershow("表格添加",["500px","300px"],$(".layer-form1"));
        $('#table-form1 .form-save').attr('data-id', null);
    }else if($(this).closest('table').hasClass('table-datatable2')){
        $('#table-form2 input[name="name1"]').val("nickname");
        $('#table-form2 input[name="name2"]').val("name");
        $('#table-form2 input[name="name3"]').val("desc");
        $('#table-form2 input[name="name4"]').val("com.vci.ruleservice.entity");
        layershow("表格添加",["500px","300px"],$(".layer-form2"),$(".layer-form2 div"));
        $('#table-form2 .form-save').attr('data-id', null);
    }
});
//表格弹层表单-保存
$('body').on('click','.form-save',function () {
    let saveurl = null,id = null;
    let that = $(this);
    let formdata = {};
    if($(this).closest('form').hasClass('table-form1')){
        id = $('#table-form1 .form-save').attr('data-id') ? $('#table-form1 .form-save').attr('data-id') : null;
        saveurl = !id ? ajaxdatatableupdateadd1:ajaxdatatableupdateedit1;
        formdata = {
            id : id,
            name : $('#table-form1 #name').val(),
            founder : $('#table-form1 #founder').val(),
            time : $('#table-form1 #time').val(),
            groupId : $('#table-form1 #groupId').val(),
            artifactId : $('#table-form1 #artifactId').val(),
            version : $('#table-form1 #version').val()
        }
    }else if($(this).closest('form').hasClass('table-form2')){
        id = $('#table-form2 .form-save').attr('data-id') ? $('#table-form2 .form-save').attr('data-id') : null;
        var tableFormType = 'JAVA';
        saveurl = !id ? ajaxdatatableupdateadd2:ajaxdatatableupdateedit2;
        var attr_data = [
            {"type": 'int',
                "name": 'age',
                "nickName": '年龄'}
        ];
        var method_data = [
            {
                "name": 'getInfo',
                "nickName": '获取信息',
                "content": "",
                "type": "String",
                "param_data": [
                    {
                        "name": 'number',
                        'type':'int'
                    }
                ]
            }
        ];
        formdata = {
            type: tableFormType,
            id: id,
            objNickName : $('#table-form2 input[name="name1"]').val(),
            objName : $('#table-form2 input[name="name2"]').val(),
            desc : $('#table-form2 input[name="name3"]').val(),
            path : $('#table-form2 input[name="name4"]').val(),
            // attr_data : JSON.stringify(attr_data),
            // method_data: JSON.stringify(method_data),
            attr_data : "",
            method_data: "",
        };
    }
    $.ajax({
        url: saveurl,
        type: 'POST',
        data: formdata,
        dataType: 'json',
        success: function(rlt){
            if(rlt.code == 200){
                that.siblings('button').trigger('click');
                //$('.table').DataTable().draw();
                if(that.closest('form').hasClass('table-form1')){
                    tableshowFun1();
                }else if(that.closest('form').hasClass('table-form2')){
                    tableshowFun2();
                }
            }
            layer.msg(rlt.message);
        },
        error: function (r) {
            layer.msg('服务错误，操作失败');
        }
    });
});

//表格编辑-弹层
$('.main-box').on('click','.table-edit',function () {
    let id = $(this).closest('div').attr('data-id');
    if($(this).closest('table').hasClass('table-datatable1')){
        layershow("表格编辑",["500px","300px"],$(".layer-form1"));
        $('#table-form1 .form-save').attr('data-id', id);
        $('#table-form1 input[name="name1"]').val($(this).closest('tr').find('td:nth-child(2)').text());
        $('#table-form1 input[name="name2"]').val($(this).closest('tr').find('td:nth-child(3)').text());
        $('#table-form1 input[name="name3"]').val($(this).closest('tr').find('td:nth-child(4)').text());
    }else if($(this).closest('table').hasClass('table-datatable2')){
        $.ajax({
            url: ajaxformdata2,
            data:{id: id},
            type: 'POST',
            success:function (rlt) {
                if(rlt.code == 200){
                    $('#table-form2 input[name="name1"]').val(rlt.data.nickname);
                    $('#table-form2 input[name="name2"]').val(rlt.data.name);
                    $('#table-form2 input[name="name3"]').val(rlt.data.desc);
                    $('#table-form2 input[name="name4"]').val(rlt.data.path);
                    $('#table-form2 .form-save').attr('data-id', id);
                    layershow("表格编辑",["500px","300px"],$(".layer-form2"),$(".layer-form2 div"));
                }else {
                    layer.msg(rlt.message);
                }
            },
            error: function (rlt) {
                layer.msg('服务错误');
            }

        });

    }
});

//表格2删除
$('.main-box').on('click','.table-delete',function () {
    var that = $(this);
    var deleteurl = null;
    var ajaxdata = {};
    if($(this).closest('table').hasClass('table-datatable1')){
        deleteurl = ajaxdatatabledelete1;
    }else if($(this).closest('table').hasClass('table-datatable2')){
        deleteurl = ajaxdatatabledelete2;
        ajaxdata.id = that.closest('div').attr("data-id");
    }
    $.ajax({
        url: deleteurl,
        type: 'POST',
        data:ajaxdata,
        dataType: 'json',
        success: function (rlt) {
            if(rlt.code == 200){
                that.closest('tr').remove();
            }
            layer.msg(rlt.message);
        },
        error: function (r) {
            layer.msg('服务错误，操作失败');
        }
    });
});

//表格1更新
$('.main-box').on('click','.table-upload',function () {
    $.ajax({
        url: ajaxdatatableupload1,
        data:{},
        dataType: 'json',
        success: function (rlt) {
            if(rlt.code == 200){

            }
            layer.msg(rlt.message);
        },
        error: function (r) {
            layer.msg('服务错误，操作失败');
        }
    });
});

//表格2详细
$('.main-box').on('click','.table-info',function (event) {
    let id = $(this).closest('div').attr('data-id');
    $.ajax({
        url: ajaxdatatableinfo2,
        data:{id: id},
        type: 'POST',
        dataType: 'json',
        success: function (rlt) {
            if(rlt.code == 200){
                console.log(rlt);
                $(event.target).siblings('.table-edit').trigger('click');
                $('.layer-form2 ').find('input').prop('readonly', true);
            }
        },
        error: function (r) {
            layer.msg('服务错误，操作失败');
        }
    });
});