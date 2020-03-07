/**
 * Created by Administrator on 2020/3/2 0002.
 */
var datatable_columns = [
    {   data: "level" , orderable: false  },
    {   data: "errorLog" , orderable: false },
    {   data: "row" , orderable: false },
    {   data: "column" , orderable: false },
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

CONSTANT.DATA_TABLES.DEFAULT_OPTION.paging = false;
CONSTANT.DATA_TABLES.DEFAULT_OPTION.info = false;
tableshow($(".table-error-log"),datatable_columns,datatable_ele,dataurl,delete_ele,data_manage,del_url);

layui.use(['form', 'element'], function(){
    var form = layui.form,
    element = layui.element;

    //规则的策略定义-弹层
    $('.btn-name5').click(function () {
        form.render('checkbox');
        layershow('规则的策略定义选择', ['680px', '330px'], $('.layer5'));
    });

    //规的结论-弹层
    $('.btn-name6').click(function () {
        form.render('checkbox');
        layershow('规的结论选择', ['680px', 'auto'], $('.layer6'));
    });
});

