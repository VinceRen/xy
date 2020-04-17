/**
 * Created by Administrator on 2020/3/2 0002.
 */

let ajaxTreeData = {};//tree添加数据
treeShow(ajaxdataztree, $("#treeDemo"), true, "POST");
function isAdd(treeId, treeNode) {
    return false;
}
function showRenameBtn(treeId, treeNode) {
    return false;
}
function showRemoveBtn(treeId, treeNode) {
    return false;
}

function addTree(zTree, treeNode) {
    $(".tree-form  .tree-save").attr('data-id', '');
    layershow('节点名称添加', ["480px", "auto"], $(".tree-form"));
    ajaxTreeData = {
        pId: treeNode.id,
    }
}
function zTreeBeforeEditName(treeId, treeNode) {
    $(".tree-form  .tree-save").attr('data-id', treeNode.id);
    $(".tree-form [name='tree-name']").val(treeNode.name);
    ajaxTreeData = {
        id: treeNode.id,
        pId: treeNode.pId,
    }
    layershow('节点名称添加', ["480px", "auto"], $(".tree-form"), $(".tree-form div"));
    return false;
}
function zTreeBeforeRemove(treeId, treeNode) {
    $.ajax({
        url: ajaxdataztreedelet,
        // type: 'POST',
        data: {id: treeNode.id},
        dataType: 'json',
        success:function (rlt) {
            if(rlt.code == 200){
                treeShow(ajaxdataztree, $("#treeDemo"), true);
            }
            layer.msg(rlt.msg);
        },
        error: function (r) {
            console.log(r);
            layer.msg('服务错误，删除失败');
        }
    });
}
let singleTreeId = null;
function singaltree_click(id, treeId, treeNode) {
    layer.confirm('确定应用该字典吗？',
      {title:'应用字典', btn: ['确定', '取消'], skin: 'dictionary-box', btnAlign: "c"},
      function(index, layero){
          $.ajax({
              url: `${basePath}ruleService/dict/applyDictionary`,
              type: 'POST',
              data: {dictId : id},
              dataType: 'json',
              xhrFields: { withCredentials: true },
              success: function (rlt) {
                if(rlt.code == 200){
                    layer.close(index);
                }
                layer.msg(rlt.msg);
              },
              error: function (r) {
                  console.log(r);
                  layer.msg('服务错误，操作失败');
              }
          });
      });
}

//tree节点名称添加/提交
$('body').on('click', '.tree-form .tree-save', function () {
    let id = $(this).attr('data-id');
    let name = $(".tree-form [name='tree-name']").val();
    let desc = $(".tree-form [name='tree-desc']").val();
    let ajaxurl = id ? ajaxdataztreeedit : ajaxdataztreeadd;
    ajaxTreeData.name = name;
    ajaxTreeData.desc = desc;
    $.ajax({
        url: ajaxurl,
        // type: "POST",
        data: ajaxTreeData,
        dataType: 'json',
        success: function(rlt){
            if(rlt.code == 200){
                $('.tree-form .tree-save').siblings('.btn').trigger('click');
                treeShow(ajaxdataztree, $("#treeDemo"), true);
            }
            layer.msg(rlt.msg);
        },
        error: function (r) {
            console.log(r);
            layer.msg('服务错误，操作失败');
        },
    });
});

function tableFun(id, search) {
    var ajaxSearch = search ? search : null;
    var param = {classId: id, search: ajaxSearch};
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

                return '<a  class="pointer tdn data-name" href="../createRule/index.html?id='+ row.id +'">' + data + '</a>';
            },
            orderable: false
        },
        { data: "creator", orderable: false },
        { data: "createtime", orderable: false },
        // { data: "groupId", orderable: false },
        // { data: "artifactId", orderable: false },
        { data: "desc", orderable: false },
        { data: "version", orderable: false },
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
    tableshow($(".table-datatable"),
      datatable_columns,
      datatable_ele,
      dataurl,
      delete_ele,
      data_manage,
      del_url,
      "POST");
}

function drawcallback(ele, tableele) {
    layui.use('form', function () {
        var form = layui.form;
        form.render();
    });
}

function callbackBtn(ele, tableele){
    if($(ele).hasClass('table-edit')){//编辑
        layershow("表格编辑", ["500px", "300px"], $(".layer-form1"));
        $('#table-form1 #form-save').attr('data-id', $(ele).closest('div').attr('data-id'));
        $('#table-form1 #name').val($(ele).closest('tr').find('td:nth-child(2)').text());
        $('#table-form1 #founder').val($(ele).closest('tr').find('td:nth-child(3)').text());
        // $('#table-form1 #time').val($(ele).closest('tr').find('td:nth-child(4)').text().slice(0, 10));
        // $('#table-form1 #groupId').val($(ele).closest('tr').find('td:nth-child(5)').text());
        // $('#table-form1 #artifactId').val($(ele).closest('tr').find('td:nth-child(6)').text());
        $('#table-form1 #desc').val($(ele).closest('tr').find('td:nth-child(5)').text());
        $('#table-form1 #version').val($(ele).closest('tr').find('td:nth-child(6)').text());
    }else if($(ele).hasClass('table-delete')){//删除
        $.ajax({
            url: ajaxdatatabledelete,
            type: 'POST',
            data: {ids: $(ele).closest('div').attr('data-id')},
            dataType: 'json',
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
}

//表格搜索清空
$('.main-box').on('click','.input-delete',function(){
    $(this).siblings('.input-search').val('').focus();
});
//表格搜索
$('.main-box').on('click','.btn-search',function () {
    let search = $(this).siblings('.input-search').val();
    tableFun(singleTreeId, search);
});
//表格添加
$('.main-box').on('click', '.table-add', function () {
    $('#table-form1 #form-save').attr('data-id', null);
    $('#table-form1 #name').val("名称");
    $('#table-form1 #founder').val("admin");
    // $('#table-form1 #time').val('2020-02-02');
    // $('#table-form1 #groupId').val("groupId-01");
    $('#table-form1 #desc').val("描述内容");
    $('#table-form1 #version').val("version-1.0.0");
    layershow("表格添加", ["500px", "300px"], $(".layer-form1"), $(".layer-form1 div"));
});



//表格弹层表单-保存
$('.layer-form1').on('click', '#form-save', function () {
    let id = $('#table-form1 #form-save').attr('data-id') ? $('#table-form1 #form-save').attr('data-id') : null;
    let formdata = {
        id: id,
        classId: singleTreeId,
        name: $('#table-form1 #name').val(),
        creator: $('#table-form1 #founder').val(),
        // time: $('#table-form1 #time').val(),
        // groupId: $('#table-form1 #groupId').val(),
        // artifactId: $('#table-form1 #artifactId').val(),
        desc: $('#table-form1 #desc').val(),
        version: $('#table-form1 #version').val(),
        // strArray: '[]'
    }
    let ajaxUrl = id ? ajaxdatatableupdate : ajaxdatatableadd;

    $.ajax({
        url: ajaxUrl,
        type: "POST",
        data: formdata,
        dataType: 'json',
        success: function (rlt) {
            if(rlt.code == 200){
                $('#form-save').siblings('button').trigger('click');
                // $('#example').DataTable().draw();
                tableFun(singleTreeId);
            }
            layer.msg(rlt.message);
        },
        error: function (r) {
            console.log(r);
            layer.msg('服务错误，操作失败');
        }
    });
});