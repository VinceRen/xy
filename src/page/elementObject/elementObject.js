/**
 * Created by Administrator on 2020/3/2 0002.
 */
const treeData = {
    projectId: "3E10B807-7354-C151-D75A-C950FEC6C681",
    id: null,
    level: null
}
treeShow(ajaxdataztree,$("#treeDemo"), true, "POST", treeData);
function isAdd(treeId, treeNode) {
    return false
}
function showRemoveBtn(treeId, treeNode) {
    return false
}
function showRenameBtn(treeId, treeNode) {
    return false
}
function drawcallback(ele, tableele) {
    layui.use('form', function(){
        var form = layui.form;
        form.render();
    });
}
function tableFun1(treeId, search) {
    var ajaxSearch = search ? search : null;
    var param = {id: treeId,search: ajaxSearch};
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
            data: "className",orderable: false
        }
    ];
    var datatable_ele = null;
    var dataurl = ajaxdatatable1;
    var delete_ele = "undefined";
    var data_manage = {
        getQueryCondition: function (data) {
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

function tableFun2(tableTrId, search) {
    var ajaxSearch = search ? search : null;
    var param = {id: tableTrId, search: ajaxSearch};
    var datatable_columns = [
        {
            data: "id",
            render: function (data, type, row) {
                return '<input data-id="' + data + '" type="checkbox" name="select" title="" lay-skin="primary">'
            },
            orderable: false
        },
        {
            data: "attribute",
            render: function (data, type, row) {
                return '<a  class="pointer tdn data-name">' + data + '</a>';
            },
            orderable: false
        },
        {
            data: "type",
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
        }
    ];
    var datatable_ele = null;
    var dataurl = ajaxdatatable2;
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
    tableshow($(".table-datatable2"),
        datatable_columns,
        datatable_ele,
        dataurl,
        delete_ele,
        data_manage,
        del_url,
        "POST");
}
let singleTreeId = null;
function singaltree_click(id, treeId, treeNode) {
    // singleTreeId = "367C0C36-251F-4D65-AADF-C89E6BAFEE11";
    singleTreeId = treeNode.id;
    tableFun1(singleTreeId);
    $('.tab-content').removeClass('d-hidden');
    $('.input-search').val('')
}

//点击table1-tr事件--table2加载
let trId = null;
$('body').on('click', '.table-datatable tbody tr', function (event) {
    trId = $(this).find('input[type="checkbox"]').attr('data-id');
    tableFun2(trId)
});

//表格搜索清空
$('.main-box').on('click','.input-delete',function(){
    $(this).siblings('.input-search').val('').focus();
});
//表格搜索
$('.main-box').on('click','.btn-search',function () {
    let search = $(this).siblings('.input-search').val();
    if($(this).closest('table').hasClass('table-datatable')){
        tableFun1(singleTreeId, search);
    }else if($(this).closest('table').hasClass('table-datatable2')){
        tableFun2(trId, search);
    }
});


