/**
 * Created by Administrator on 2020/3/2 0002.
 */
const paramType = "FUNCTION_SPACE";//空间数据函数
function tableFun1(search) {
    var ajaxSearch = search ? search : null;
    var param = {type: paramType, search: ajaxSearch};
    var datatable_columns = [
        // {
        //     data: "methodid",
        //     render: function (data, type, row) {
        //         return '<input data-id="' + data + '" type="checkbox" name="select" title="" lay-skin="primary">'
        //     },
        //     orderable: false
        // },
        {
            data: "name",
            render: function (data, type, row) {
                return '<div class="pointer function-name"><a  class="bl tdn">' + data + '</a></div>';
            },
            orderable: false
        },
        {   data: "desc",  orderable: false },
        {   data: "url",  orderable: false },
        // {
        //     data: "methodid",
        //     render: function (data, type, row) {
        //
        //         return `<div class="data-name" data-id=${data}>
        //                 <button class="btn btn-xs btn-primary table-edit"><i class="fa fa-pencil"></i> 编辑</button>
        //                 <button class="btn btn-xs btn-primary table-delete"><i class="fa fa-trash-o"></i> 删除</button>
        //             </div>`;
        //     },
        //     orderable: false
        // },
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
    table = tableshow($(".table-datatable"),
      datatable_columns,
      datatable_ele,
      dataurl,
      delete_ele,
      data_manage,
      del_url,
      "GET");
    return table;

}

function tableFun2(n) {
    var datatable_columns = [
        // {
        //     data: "id",
        //     render: function (data, type, row) {
        //         return '<input data-id="' + data + '" type="checkbox" name="select" title="" lay-skin="primary">'
        //     },
        //     orderable: false
        // },
        {
            data: "name",
            render: function (data, type, row) {
                return '<a  class="pointer tdn data-name">' + data + '</a>';
            },
            orderable: false
        },
        {   data: "desc", orderable: false   },
        // {   data: "nickname", orderable: false   },
        // {   data: "type", orderable: false   },
    ];
    var datatable_ele = null;
    var dataurl = ajaxdatatable2;
    var delete_ele = "undefined";
    var data_manage = {
        getQueryCondition: function (data) {
            var param = {name: n, search: ''};
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
    tableshow($(".table-datatable2"),
      datatable_columns,
      datatable_ele,
      dataurl,
      delete_ele,
      data_manage,
      del_url,
      "GET");
}

function drawcallback(ele, tableele) {
    layui.use('form', function(){
        var form = layui.form;
        form.render();
        if($(ele).hasClass('table-datatable')) {
            // $(ele).find('tr:first').trigger('click');
        }
    });

}

function callbackBtn(ele, tableele) {
    if($(ele).hasClass("table-edit")){//表格编辑-弹层
        let id = $(ele).closest('div').attr('data-id');
        $('#table-form1 .form-save').attr('data-id', id);
        layershow("表格编辑",["500px","auto"],$(".layer-form1"),$(".layer-form1 div"));

        $('#table-form1 [name="name3"]').val("com.vci.ruleservice.entity");
        $('#table-form1 [name="name4"]').val($(ele).closest('tr').find('td:nth-child(2)').text());
        // $.ajax({
        //     url: 'ddd',
        //     type: 'POST',
        //     data: {},
        //     dataType: 'json',
        //     success: function (rlt) {
        //         if(rlt.code == 200){
        //
        //
        //             $('#table-form1 [name="name1"]').val("Spacedata");
        //             $('#table-form1 [name="name3"]').val("com.vci.ruleservice.entity");
        //         }
        //         layer.msg(rlt.message);
        //
        //     }
        // });

    }else if($(ele).hasClass("table-delete")){//表格删除
        let that = $(ele);
        $.ajax({
            url: ajaxdatatabledelete,
            type: "POST",
            data:{id: that.closest('div').attr("data-id")},
            dataType: 'json',
            success: function (rlt) {
                if(rlt.code = 200){
                    // that.closest('tr').remove();
                    tableFun1();
                }
                layer.msg(rlt.message);
            },
            error: function (r) {
                layer.msg('服务错误，删除失败');
            }
        });
    }

}

//函数列表table加载
tableFun1();

//函数属性table加载
// tableFun2();
//table2数据加载
$('body').on( 'click', '.table-datatable td', function (e) {
    let table1 = $(".table-datatable").DataTable();
    let tr = this.parentNode;
    let name = table1.row(tr).data().name;
    tableFun2(name);
});
//表格搜索清空
$('.main-box').on('click','.input-delete',function(){
    $(this).siblings('.input-search').val('').focus();
});
//表格搜索
$('.main-box').on('click','.btn-search',function () {
    let search = $(this).siblings('.input-search').val();
    tableFun1(search);
});
//表格添加
$('.main-box').on('click','.table-add',function () {
    layershow("表格添加",["500px","auto"],$(".layer-form1"),$(".layer-form1 div"));
    $('#table-form1 .form-save').attr('data-id', null);

    $('#table-form1 [name="name1"]').val("Spacedata");
    $('#table-form1 [name="name3"]').val("com.vci.ruleservice.entity");
});
//表格弹层表单-保存
$('.layer-form1').on('click','.form-save',function () {
    let that = $(this),
      id = $('#table-form1 .form-save').attr('data-id') ? $('#table-form1 .form-save').attr('data-id') : null,
      ajaxUrl = $('#table-form1 .form-save').attr('data-id') ? ajaxdatatableedit : ajaxdatatableadd,
      formData = {},
      type = paramType;
    if(!id){//添加form
        let method_data = [
            {
                "name": $('#table-form1 [name="name4"]').val(),
                "nickName": "获取信息",
                "content":"",
                "type":"void",
                "param_data":""
            }
        ];
        formData = {
            type: type,
            id : id,
            objNickName: "空间数据对象",
            objName : $('#table-form1 [name="name1"]').val(),
            // desc: $('#table-form1 input[name="name2"]').val(),
            path: $('#table-form1 [name="name3"]').val(),
            method_data: JSON.stringify(method_data)
        }
    }else{//编辑form
        let method_data = [
            {
                "name": $('#table-form1 [name="name4"]').val(),
                "nickName": "获取信息",
                "content":"",
                "type":"void",
                "param_data":""
            },
            // {
            //     "name": $('#table-form1 [name="name4"]').val(),
            //     "nickName": "获取信息",
            //     "content":"String info = '123';" + "return info;",
            //     "type":"",
            //     "param_data":[
            //         {
            //             "name": 'number',
            //             'type':'int'
            //         }
            //     ]
            // }
        ];
        formData = {
            // type: type,
            id : id,
            // objNickName: "空间数据对象",
            // objName : $('#table-form1 [name="name1"]').val(),
            // desc: $('#table-form1 input[name="name2"]').val(),
            // path: $('#table-form1 [name="name3"]').val(),
            method_data: JSON.stringify(method_data)
        }
    }

    console.log(JSON.stringify(formData));
    $.ajax({
        url: ajaxUrl,
        type: "POST",
        data: formData,
        dataType: 'json',
        success: function(rlt){
            if(rlt.code == 200){
                that.siblings('button').trigger('click');
                // $('.table-datatable').DataTable().draw();
                tableFun1();
            }
            layer.msg(rlt.message);

        },
        error: function (r) {
            console.log(r);
            layer.msg('服务错误，操作失败');
        }
    });
});




