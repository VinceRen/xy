/**
 * Created by Administrator on 2020/3/2 0002.
 */
//初始化tree再加数据
let treeData = {
  projectId: "A001023fsf34f34",//项目编号ID
}
//tree加载
treeFun();

function isAdd(treeId, treeNode) {
  return true;
}

function showRenameBtn(treeId, treeNode) {
  if (treeNode.level == 0) {
    return false;
  } else {
    return true;
  }
}

function showRemoveBtn(treeId, treeNode) {
  if (treeNode.level == 0) {
    return false;
  } else {
    return true;
  }
}


let addTreeData = {};//tree添加数据
function addTree(zTree, treeNode) {
  $(".tree-form  .tree-save").attr('data-id', '');
  layershow('节点名称添加', ["480px", "auto"], $(".tree-form"));
  addTreeData = {
    projectId: treeData.projectId,
    parentId: treeNode.id,
    level: treeNode.lvs,
  }
}
function zTreeBeforeEditName(treeId, treeNode) {
  $(".tree-form  .tree-save").attr('data-id', treeNode.id);
  $(".tree-form [name='tree-name']").val(treeNode.name);
  layershow('节点名称添加', ["480px", "auto"], $(".tree-form"), $(".tree-form div"));
  return false;
}
function zTreeBeforeRemove(treeId, treeNode) {
  //删除确定回调
  function ajaxRemove(){
    $.ajax({
      url: ajaxdataztreedelet,
      type: 'POST',
      data: {id: treeNode.id},
      dataType: 'json',
      async: false,
      success: function (rlt) {
        if (rlt.code == 200) {
          treeFun();
        }
        layer.msg(rlt.message);
      },
      error: function (r) {
        console.log(r);
        layer.msg('服务错误，删除失败');
      }
    });
  }
  layer.confirm(
    '确定删除' + treeNode.name + '吗？',
    {title: '删除提示', closeBtn: 0},
    function (index) {
      ajaxRemove();
      layer.close(index);
    }
  );
  return false;
}

//tree节点名称添加/提交
$('body').on('click', '.tree-form .tree-save', function () {
  let id = $(this).attr('data-id');
  let name = $(".tree-form [name='tree-name']").val();
  let desc = $(".tree-form [name='tree-desc']").val();
  let ajaxurl = id ? ajaxdataztreeedit : ajaxdataztreeadd;
  let ajaxdata = {};
  if (!id) {
    ajaxdata = addTreeData;
  }
  ajaxdata.id = id;
  ajaxdata.name = name;
  ajaxdata.desc = desc;
  $.ajax({
    url: ajaxurl,
    type: "POST",
    data: ajaxdata,
    dataType: 'json',
    xhrFields:{withCredentials: true},
    success: function (rlt) {
      if (rlt.code == 200) {
        $('.tree-form .tree-save').siblings('.btn').trigger('click');
        treeFun();
      }
      layer.msg(rlt.message);
    },
    error: function (r) {
      console.log(r);
      layer.msg('服务错误，操作失败');
    },
  });
});

function treeFun() {
  treeShow(ajaxdataztree, $("#treeDemo"), true, "POST", treeData);
}

var singleTreeId = null;
let dataurl = ajaxdatatable;

function singaltree_click(id, treeId, treeNode) {
  // if(!treeNode.isParent){
  //     dataurl = ajaxdatatable + '?name=' + treeNode.name;
  //     tableFun(dataurl);
  //     $('.tab-content').removeClass('d-hidden');
  // }
  //     let dataurl = ajaxdatatable + '?name=' + treeNode.name;
  singleTreeId = id;

  tableFun(dataurl, {classId: singleTreeId});
  $('.tab-content').removeClass('d-hidden');
}

//规则工程table
function ruleEnginTableFun(search) {
  let resultFun = true;
  if(singleTreeId == 0){//更节点不允许添加
    layer.msg('请选择要关联的规则应用');
    resultFun = false;
    return resultFun;
  }
  let searchWord = search ? search : null;
  var param = {"search": searchWord, classId: singleTreeId};
  // var param = {param: search};
  var datatable_columns = [
    {
      data: "id",
      render: function (data, type, row) {
        return '<input value="' + data + '" type="checkbox" name="select" title="" lay-skin="primary">'
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
    // {   data: "founder" , orderable: false  },
    // {   data: "time" , orderable: false },
    {data: "description", orderable: false},
    // {data: "conversationName", orderable: false},
    {data: "groupId", orderable: false},
    {data: "artifactId", orderable: false},
    {data: "version", orderable: false},
  ];
  var datatable_ele = null;
  var dataurl = ajaxdataruleengintable;
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
    $(".layer-table"),
    datatable_columns,
    datatable_ele,
    dataurl,
    delete_ele,
    data_manage,
    del_url,
    "POST");
  return resultFun;
}

//规则工程关联规则table
function tableFun(ajaxUrl, ajaxData) {
  var param = {};
  if (!ajaxData) {
    param = {search: null}
  } else if (typeof (ajaxData) === 'string') {
    param = {search: ajaxData}
  } else if (
    Object.prototype.toString.call(ajaxData) === "[object Object]" &&
    ajaxData.hasOwnProperty('search')
  ) {
    param = ajaxData;
  } else if (
    Object.prototype.toString.call(ajaxData) === "[object Object]" &&
    !ajaxData.hasOwnProperty('search')
  ) {
    param = ajaxData;
    param.search = null;
  }
  var datatable_columns = [
    {
      data: "id",
      render: function (data, type, row) {
        return '<input value="' + row.relatedId + '" data-id="' + data + '" type="checkbox" name="select" title="" lay-skin="primary">'
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
    // {
    //   data: "conversationName",
    //   render: function (data, type, row) {
    //     return '<a  class="pointer tdn data-name">' + data + '</a>';
    //   },
    //   orderable: false
    // },
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
    // {
    //     data: "id",
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
  var dataurl = ajaxUrl;
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
    if(ele.hasClass('layer-table')){
        ruleEnginIdArr.length = 0;
        $('.layer-table').find('thead input[type="checkbox"]').prop("checked", false);
    }else if(ele.hasClass('table-datatable')){
        deleteRuleIdArr.length = 0;
        $('.table-datatable').find('thead input[type="checkbox"]').prop("checked", false);
    }
    form.render();
  });
}

function callbackBtn(ele, tableele) {
  if ($(ele).hasClass('.table-edit')) {
    //表格编辑-弹层
    // layershow("表格编辑",["500px","300px"],$(".layer-form1"));
    // $('#table-form1 #form-save').attr('data-id', $(this).closest('div').attr('data-id'));
    // $('#table-form1 #name').val($(this).closest('tr').find('td:nth-child(2)').text());
    // $('#table-form1 #founder').val($(this).closest('tr').find('td:nth-child(3)').text());
    // $('#table-form1 #time').val($(this).closest('tr').find('td:nth-child(4)').text());
    // $('#table-form1 #groupId').val($(this).closest('tr').find('td:nth-child(5)').text());
    // $('#table-form1 #artifactId').val($(this).closest('tr').find('td:nth-child(6)').text());
    // $('#table-form1 #version').val($(this).closest('tr').find('td:nth-child(7)').text());
  } else if ($(ele).hasClass('.table-delete')) {//表格删除
    $.ajax({
      url: ajaxdatatabledelete,
      data: {},
      dataType: 'json',
      async: false,
      success: function (rlt) {
        if (rlt.code == 200) {
          $(ele).closest('tr').remove();
        }
        layer.msg(rlt.message);
      },
      error: function (r) {
        layer.msg('服务错误，删除失败');
      }
    });
  }
}

let layType = null;//弹层类型
let ruleEnginIdArr = [];//关联规则工程ID
let deleteRuleIdArr = [];//规则ID
layui.use('form', function () {
  var form = layui.form;
  form.on('checkbox', function (data) {
    if (data.value === 'on' && data.elem.checked && $(data.elem).closest('table').hasClass('layer-table')) {
        //关联规则全选
        ruleEnginIdArr.length = 0;
        $(data.elem).closest('table').find('tbody td:first-child').each(function (index, item) {
            let itemValut = $(item).find('input[type="checkbox"]').val();
            ruleEnginIdArr.push(itemValut);
            $(item).find('input[type="checkbox"]').prop('checked', true);
        });

    } else if (data.value === 'on' && !data.elem.checked && $(data.elem).closest('table').hasClass('layer-table')) {
      //取消关联规则全选
        ruleEnginIdArr.length = 0;
        $(data.elem).closest('table').find('tbody td:first-child').each(function (index, item) {
            $(item).find('input[type="checkbox"]').prop('checked', false);
        });
    } else if (data.value !== 'on' && data.elem.checked && $(data.elem).closest('table').hasClass('layer-table')) {
      ruleEnginIdArr.push(data.value);
        let checkboxLength = $('.layer-table').find('tbody input[type="checkbox"]').length;
        checkboxLength === ruleEnginIdArr.length ?
          $('.layer-table').find('thead input[type="checkbox"]').prop("checked", true) :
          $('.layer-table').find('thead input[type="checkbox"]').prop("checked", false);
    } else if (data.value !== 'on' && !data.elem.checked && $(data.elem).closest('table').hasClass('layer-table')) {
      ruleEnginIdArr.splice(ruleEnginIdArr.indexOf(data.value), 1);
      $('.layer-table').find('thead input[type="checkbox"]').prop("checked", false);
    } else if (data.value === 'on' && data.elem.checked && $(data.elem).closest('table').hasClass('table-datatable')) {
      //规则全选
      deleteRuleIdArr.length = 0;
      $(data.elem).closest('table').find('tbody td:first-child').each(function (index, item) {
        let itemValut = $(item).find('input[type="checkbox"]').val();
        deleteRuleIdArr.push(itemValut);
        $(item).find('input[type="checkbox"]').prop('checked', true);
      });
    } else if (data.value === 'on' && !data.elem.checked && $(data.elem).closest('table').hasClass('table-datatable')) {
      //取消规则全选
      deleteRuleIdArr.length = 0;
      $(data.elem).closest('table').find('tbody td:first-child').each(function (index, item) {
        $(item).find('input[type="checkbox"]').prop('checked', false);
      });
    } else if (data.value !== 'on' && data.elem.checked && $(data.elem).closest('table').hasClass('table-datatable')) {
      deleteRuleIdArr.push(data.value);
      let checkboxLength = $('.table-datatable').find('tbody input[type="checkbox"]').length;
      checkboxLength === deleteRuleIdArr.length ?
        $('.table-datatable').find('thead input[type="checkbox"]').prop("checked", true) :
        $('.table-datatable').find('thead input[type="checkbox"]').prop("checked", false);
    } else if (data.value !== 'on' && !data.elem.checked && $(data.elem).closest('table').hasClass('table-datatable')) {
      deleteRuleIdArr.splice(deleteRuleIdArr.indexOf(data.value), 1);
      $('.table-datatable').find('thead input[type="checkbox"]').prop("checked", false)
    }
    form.render();
  });
});

//表格搜索清空
$('.main-box').on('click','.input-delete',function(){
  $(this).siblings('.input-search').val('').focus();
});
//表格搜索
$('.main-box').on('click','.btn-search',function () {
  let search = $(this).siblings('.input-search').val();
  tableFun(dataurl, {classId: singleTreeId,search: search});
});
// 关联规则添加-弹层
$('.main-box').on('click', '.table-add', function () {
  layType = 'add';
  ruleEnginIdArr.length = 0;//关联规则工程ID清空
  if(!ruleEnginTableFun()){return false};
  layershow("关联规则添加", ["780px", "480px"], $(".layer-table-box"));
});
// 关联规则编辑-弹层
$('.main-box').on('click', '.table-edit', function () {
  layType = 'edit';
  ruleEnginIdArr.length = 0;//关联规则工程ID清空
  ruleEnginTableFun();
  layershow("关联规则编辑", ["780px", "480px"], $(".layer-table-box"));
});
// 关联规则删除
$('.main-box').on('click', '.table-delete', function () {
  //删除回调
  function ajaxRemove() {
    $.ajax({
      url: ajaxdataruleengindelete,
      type: 'POST',
      data: {
        ids: deleteRuleIdArr.toString(),
      },
      async: false,
      success: function (rlt) {
        if (rlt.code == 200) {
          deleteRuleIdArr.length = 0;//清空规则选择ID;
          tableFun(dataurl, {classId: singleTreeId});
        }
        layer.msg(rlt.message);
      },
      error: function (r) {
        console.log(r);
        layer.msg('服务错误，操作失败');
      }
    });
  }
  if (!deleteRuleIdArr.length) {
    layer.msg('请选择操作对象');
    return false;
  }
  layer.confirm(
    '确定删除吗？',
    {title: '删除提示', closeBtn: 0},
    function (index) {
      ajaxRemove();
      layer.close(index);
    }
  );
});
// 关联规则-弹层确定
$('body').on('click', '.layer-table-save', function () {
  if (!ruleEnginIdArr.length) {
    layer.msg('请选择操作对象');
    return false;
  }
  switch (layType) {
    case 'add':
      $.ajax({
        url: ajaxdataruleenginadd,
        type: 'POST',
        data: {
          classId: singleTreeId,
          projectIds: ruleEnginIdArr.toString(),
        },
        success: function (rlt) {
          if (rlt.code == 200) {
            $('.layer-table-save').siblings().trigger('click');
            tableFun(dataurl, {classId: singleTreeId});
          }
          layer.msg(rlt.message);
        },
        error: function (r) {
          console.log(r);
          layer.msg('服务错误，操作失败');
        }
      });
      break;
    case 'edit':
      $.ajax({
        url: ajaxdataruleenginedit,
        type: 'POST',
        data: {
          classId: singleTreeId,
          projectIds: ruleEnginIdArr.toString(),
        },
        success: function (rlt) {
          if (rlt.code == 200) {
            $('.layer-table-save').siblings().trigger('click');
            tableFun(dataurl, {classId: singleTreeId});
          }
          layer.msg(rlt.message);
        },
        error: function (r) {
          console.log(r);
          layer.msg('服务错误，操作失败');
        }
      });
      break;
    // case 'delete':
    //     break;
    default:
      break;
  }
});

