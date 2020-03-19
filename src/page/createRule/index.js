$(function () {
    layui.use('form', function () {
        // layui相关插件定义
        let form = layui.form;

        // 全局变量相关定义
        const SUCCESS = 200;

        let tacticsSelection = 222;

        // $.ajax({
        //     url: 'http://172.18.84.114:8081/ruleService/bean/queryElementByType/',
        //     type: 'POST',
        //     data: JSON.stringify({
        //         "type": 'SPACE',
        //         "startIndex": 0,
        //         "pageSize": 10
        //     }),
        //     contentType: 'application/json;charset=UTF-8',
        //     success: function (data) {
        //         console.log(data)
        //     }
        // })






    

        let treeData = "index.json";
        treeShow(treeData, $("#ruleTree"), true);




        $('.tabs a').on('click', function () {
            let type = $(this).attr('href')
            // console.log(type)
            if (type === 'tab-edit') {
                $('.ruleDefine').css({ "display": "block" }).siblings().css({ "display": "none" })
            } else if (type === 'tab-code') {
                $('.code').css({ "display": "block" }).siblings().css({ "display": "none" })
            } else if (type === 'tab-brief') {
                // $.ajax({
                //     url: './history.json',
                //     success: function (data) {
                //         if (data && +data.code === SUCCESS) {
                //             let res = data.data
                //             $('#summaryRuleName').val(res.NAME)
                //             $('#summaryRuleType').val(res.TYPE)
                //             $('#summaryRuleDesc').val(res.DESCRIPTION)
                //             $('#summaryRuleCreate').val(moment(res.CREATETIME).format('YYYY年MM月DD日'))
                //             $('#summaryRuleEdit').val(moment(res.LASTMODIFYTIME).format('YYYY年MM月DD日'))
                //             $('#summaryRuleMan').val(res.CREATOR)
                //             $('#summaryRuleVersion').val(res.VERSION)

                //             let { history } = res
                //             let html = ''
                //             history.map((e) => {
                //                 html += `<tr>
                //                     <td>${moment(e.CREATETIME).format('YYYY年MM月DD日')}</td>
                //                     <td>${e.CREATOR}</td>
                //                     <td>${e.VERSION}</td>
                //                     <td>
                //                         <button type="button" class="btn btn-xs btn-link historyEdit" data="${JSON.stringify(e)}">
                //                             <i class="fa fa-pencil-square-o" aria-hidden="true"></i> 编辑
                //                         </button>
                //                         <button type="button" class="btn btn-xs btn-link historyDownload" data-id="${e.OID}">
                //                             <i class="fa fa-arrow-circle-down" aria-hidden="true"></i> 下载
                //                         </button>
                //                     </td>
                //                 </tr>`
                //             })
                //             $("#historyTable tbody").html(html)
                //             $('.summary').css({ "display": "block" }).siblings().css({ "display": "none" })
                //         } else {
                //             alert(data.message)
                //         }
                //     }
                // })
                $('.summary').css({ "display": "block" }).siblings().css({ "display": "none" })
                loadFormData()
                loadBriefTable()
            } else if (type === 'tab-data') {
                loadSpaceTable()
                loadBusinessTable()
                $('.data').css({ "display": "block" }).siblings().css({ "display": "none" })
            } else if (type === 'tab-func') {
                loadFuncTable()
                $('.func').css({ "display": "block" }).siblings().css({ "display": "none" })
            } else if (type === 'tab-rely') {
                $('.rely').css({ "display": "block" }).siblings().css({ "display": "none" })
            } else if (type === 'tab-service') {
                $('.service').css({ "display": "block" }).siblings().css({ "display": "none" })
            } else if (type === 'tab-work') {
                $('.workTabs').css({ "display": "block" }).siblings().css({ "display": "none" })
                $('.ruleDefine').css({ "display": "block" }).siblings().css({ "display": "none" })
                $('.workTabs li').removeClass('active')
                $('.workTabs li').eq(0).addClass('active').siblings().removeCLass('active')
            } else if (type === 'tab-set') {
                $('.setTabs').css({ "display": "block" }).siblings().css({ "display": "none" })
                $('.setUp').css({ "display": "block" }).siblings().css({ "display": "none" })
            }
        })
        // 规则的策略定义弹出层触发
        $('#tacticsAdd').on('click', function () {
            tacticsAdd = layer.open({
                type: 1,
                title: '添加规则条件',
                shadeClose: true, //点击遮罩关闭层
                area: ['800px', '520px'],
                content: $('#tacticsLayer')
            });
        })
        let tacticsType = 'project'
        $('#project').on('click', function () {
            tacticsType = 'project'
            $('.projectOptions').css({ "display": "flex" }).siblings().css({ "display": "none" })
        })
        $('#condition').on('click', function () {
            tacticsType = 'condition'
            $('.conditionOptions').css({ "display": "flex" }).siblings().css({ "display": "none" })
        })
        $('#gourp').on('click', function () {
            tacticsType = 'gourp'
            $('.gourpOptions').css({ "display": "flex" }).siblings().css({ "display": "none" })
        })
        $('#custom').on('click', function () {
            tacticsType = 'custom'
            $('.customInput').css({ "display": "block" }).siblings().css({ "display": "none" })
        })


        let tacticsNum = 0;
        $('#tacticsConfrim').on('click', function () {
            // 规则的策略定义弹出层确定事件
            let result = ''
            if (tacticsType === 'project') {
                let val = $('.projectOptions input:radio:checked').val();
                let name = $('.projectOptions input:radio:checked').next('span').html()
                result = `<div data='${val}' class="objectItem objectItem-${tacticsNum}" data-type='${tacticsType}'>
                    <span class="objectTitle">
                        <i>${name}</i>
                        <em></em>
                    </span>
                </div>`
            } else if (tacticsType === 'condition') {
                result = `<span data='condition' data-type='${tacticsType}'>存在条件/不存在/所有条件true(根据上页现在的条件显示)</span>`
            } else if (tacticsType === 'gourp') {
                result = `<span data='gourp' data-type='${tacticsType}'>普通集合\增强集合（根据上文选择的集合类型确定，普通集合与增强集合与存在条件的选择集合一致）</span>`
            } else if (tacticsType === 'custom') {
                result = `<span data='custom' data-type='${tacticsType}'>${name}</span>`
            }
            $('.tactics').append(result)
            tacticsNum++
            layer.close(tacticsAdd)
        })

        // 规的结论弹出层触发
        $('#conclusionAdd').on('click', function () {
            conclusionAdd = layer.open({
                type: 1,
                title: '选择结论的操作',
                shadeClose: true, //点击遮罩关闭层
                area: ['800px', '520px'],
                content: $('#conclusionLayer')
            });
        })
        $('#conclusionConfrim').on('click', function () {
            // 规则的策略定义弹出层确定事件
            let result = ''
            let val = $('.projectOptions input:radio:checked').val();
            let name = $('.projectOptions input:radio:checked').next('span').html()
            result = `<span data='${val}' data-type='${tacticsType}'>${name}</span>`
            $('.conclusion').append(result)
            layer.close(conclusionAdd)
        })

        let propertyRadioValue = ''
        form.on('radio(property)', function (data) {
            propertyRadioValue = data.value
        });
        let fieldValue = ''
        let fieldText = ''
        form.on('select(field)', function (data) {
            fieldValue = data.value
            fieldText = data.elem[data.elem.selectedIndex].text
        });
        $('#projectConfrim').on('click', function () {
            if (+propertyRadioValue === 0) {
                let ajaxData = [{
                    id: 0,
                    text: '等于'
                }]
                let margin = tacticsSelection.innerWidth()
                let result = `<div class="projectItem" data-type="${fieldValue}" style="margin-left: ${margin}px">
                    <form class="layui-form">
                        <span><i>${fieldText}</i></span>
                        <select name="city" lay-verify="required" lay-filter="property">
                            ${ajaxData.map(e => {
                    return `<option value="${e.id}">${e.text}</option>`
                })}
                        </select>
                        <button class="btn btn-sm btn-default projectItemEdit"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                        <button class="btn btn-sm btn-default"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </form>
                </div>`
                tacticsSelection.parent().append(result)
                form.render('select');
                layer.close(projectLayer)
            } else if (+propertyRadioValue === 4) {
                setObjecgName = layer.open({
                    type: 1,
                    title: `设置变量`,
                    shadeClose: true, //点击遮罩关闭层
                    area: ['800px', '520px'],
                    content: $('#setObjectName')
                });
                layer.close(projectLayer)
            }
        })
        $('#setProjrctNameConfrim').on('click', function () {
            let name = $('#setObjectName input').val()
            let result = `[<b>${name}</b>]`
            tacticsSelection.find('em').html(result)
            layer.close(setObjecgName)
        })
    
    // 相关事件
    $('body').on('click', '.tactics .objectTitle', function () {
        tacticsSelection = $(this)
        let type = $(this).parent().attr('data-type')
        let name = $(this).html()
        console.log(type)
        if (type === 'project') {
            projectLayer = layer.open({
                type: 1,
                title: `修改（${name}）对象`,
                shadeClose: true, //点击遮罩关闭层
                area: ['800px', '520px'],
                content: $('#projectLayer')
            });
        }
    })

    $('body').on('click', '.projectItemEdit', function (e) {
        e.preventDefault()
        let parentName = $(this).closest('.objectItem').find('.objectTitle').find('i').html()
        projectItemEdit = layer.open({
            type: 1,
            title: `修改（${parentName}）字段属性`,
            shadeClose: true, //点击遮罩关闭层
            area: ['800px', '520px'],
            content: $('#objectItemEdit')
        });
    })
    // 提交 规则编辑器内容
    $('#submit').on('click', function () {
        let tactics = $('.objectItem')
        let data = []
        tactics.each(function (e) {
            let name = tactics.eq(e).find('.objectTitle > i').html()
            let id = tactics.eq(e).attr('data')
            let type = tactics.eq(e).attr('data-type')
            // console.log('对象的名字', name)
            // console.log('对象的值(id)', id)
            // console.log('对象的类型', type)
            let allItem = tactics.eq(e).find('.projectItem')
            let attr_data = []
            allItem.each(function (index) {
                let itemType = allItem.eq(index).attr('data-type')
                // console.log('对象子集属性的类型', itemType)
                // console.log('select选中的值的文本', allItem.eq(index).find('select').find("option:selected").text())
                // console.log('select选中的值', allItem.eq(index).find('select').find("option:selected").val())
                attr_data.push({
                    type: itemType,
                    name: allItem.eq(index).find('select').find("option:selected").text(),
                    value: allItem.eq(index).find('select').find("option:selected").val()
                })
            })
            data.push({
                name,
                id,
                type,
                attr_data
            })
        })
        console.log(data)
    })

    // 添加事件
    $('#addFunc').on('click', function () {
        // 添加函数事件
        addFuncLayer = layer.open({
            type: 1,
            title: `添加函数`,
            shadeClose: true, //点击遮罩关闭层
            area: ['800px', '520px'],
            content: $('#addFuncLayer')
        });
    })
    $('#addFuncConfirm').on('click', function () {
        let data = form.val('addFunc')
        $.ajax({
            url: 'http://172.18.84.114:8081/ruleService/bean/addFunction/',
            data,
            type: 'POST',
            success: function (data) {
                layer.msg(data.message);
                loadFuncTable()
                layer.close(addFuncLayer)
                // if (data && data.code === 'SUCCESS') layer.msg('添加成功');
                // else layer.msg('添加失败');
            }
        })
    })
    $('#businessAdd').on('click', function () {
        // 业务对象添加事件
        addBusinessLayer = layer.open({
            type: 1,
            title: `添加业务数据对象`,
            shadeClose: true, //点击遮罩关闭层
            area: ['800px', '520px'],
            content: $('#addBusinessLayer')
        });
    })
    $('#addBusinessConfrim').on('click', function () {
        let data = form.val("addBusiness");
        $.ajax({
            url: 'http://172.18.84.114:8081/ruleService/bean/addBean',
            data,
            type: 'POST',
            success: function (data) {
                layer.msg(data.message);
                loadBusinessTable()
                layer.close(addBusinessLayer)
                // if (data && data.code === 'SUCCESS') layer.msg('添加成功');
                // else layer.msg('添加失败');
            }
        })
    })
    $('#spaceAdd').on('click', function () {
        // 空间对象添加事件
        // $.ajax({
        //     url: 'http://172.18.84.114:8081/ruleService/bean/addBean',
        //     data: {
        //         type: 'java',
        //         objName: 'Building',
        //         objNickName: '建筑1',
        //         path: 'com.vci.ruleservice.entity',
        //         desc: '测试建筑描述',
        //         attr_data: [],
        //         method_data: []
        //     },
        //     type: 'POST',
        //     success: function (data) {
        //         layer.msg(data.message);
        //         loadSpaceTable()
        //         // if (data && data.code === 'SUCCESS') layer.msg('添加成功');
        //         // else layer.msg('添加失败');
        //     }
        // })
        
    })

    // 删除事件
    $('body').on('click', '.spaceDelect', function (e) {
        // 删除空间数据对象
        let id = $(this).attr('data-id')
        layer.confirm(`确认删除该空间数据对象`, {
            btn: ['确认', '取消']
        }, function () {
            $.ajax({
                url: 'http://172.18.84.114:8081/ruleService/bean/deleteBean/',
                data: {
                    id
                },
                type: 'POST',
                success: function(data) {
                    layer.msg(data.message);
                    loadSpaceTable()
                    // if (data && data.code === 'SUCCESS') layer.msg('删除成功');
                    // else layer.msg('删除失败');
                }
            })
        }, function () {
            layer.msg('取消删除');
        });
    })
    $('body').on('click', '.businessDelect', function (e) {
        // 删除业务数据对象
        let id = $(this).attr('data-id')
        layer.confirm(`确认删除该业务数据对象`, {
            btn: ['确认', '取消']
        }, function () {
            $.ajax({
                url: 'http://172.18.84.114:8081/ruleService/bean/deleteBean/',
                data: {
                    id
                },
                type: 'POST',
                success: function(data) {
                    if (data && data.code === SUCCESS) {
                        layer.msg('删除成功');
                        loadBusinessTable()
                    } else layer.msg('删除失败');
                }
            })
        }, function () {
            layer.msg('取消删除');
        });
    })
    $('body').on('click', '.funcDelect', function (e) {
        // 删除函数
        let id = $(this).attr('data-id')
        layer.confirm(`确认删除该函数吗？`, {
            btn: ['确认', '取消']
        }, function () {
            $.ajax({
                url: 'http://172.18.84.114:8081/ruleService/bean/deleteFunction/',
                data: {
                    id
                },
                type: 'POST',
                success: function(data) {
                    if (data && data.code === SUCCESS) {
                        layer.msg('删除成功');
                        loadFuncTable()
                    } else layer.msg('删除失败');
                }
            })
        }, function () {
            layer.msg('取消删除');
        });
    })
    $('body').on('click', '.historyDownload', function (e) {
        // 下载规则
        layer.confirm(`下载，id为：${$(this).attr('data-id')}`, {
            btn: ['确认', '取消']
        }, function () {
            layer.msg('下载成功');
        }, function () {
            layer.msg('取消下载');
        });
    })

    // 相关事件提取为函数
    function loadSpaceTable () {
        let datatable_columns = [
            {
                data: "name",
                orderable: false
            },
            {
                data: "desc",
                orderable: false
            },
            {
                data: "path",
                orderable: false
            },
            {
                data: "id",
                render: function (data, type, row) {
                    return `
                    <button class="btn btn-xs btn-primary spaceDelect" data-id=${data}><i class="fa fa-trash-o"></i> 删除</button>
                    `;
                },
                orderable: false
            },
        ];
        let datatable_ele = null;
        let dataurl = 'http://172.18.84.114:8081/ruleService/bean/queryElementByType/';
        let delete_ele = "undefined";
        let data_manage = {
            getQueryCondition: function (data) {
                let param = {};
                //组装排序参数
                if (data.order && data.order.length && data.order[0]) {
                    let sqlName = data.columns[data.order[0].column].data;
                    param.orderColumn = sqlName;
                    //排序方式asc或者desc
                    param.orderDir = data.order[0].dir;
                }
    
                //组装分页参数
                param.startIndex = data.start;
                param.pageSize = data.length;
                param.draw = data.draw;
                param.type = 'java'
                return param;
            }
        };
        let del_url = "undefined";
    
        // CONSTANT.DATA_TABLES.DEFAULT_OPTION.paging = false;
        // CONSTANT.DATA_TABLES.DEFAULT_OPTION.info = false;
        tableshow($("#spaceTable"),datatable_columns,datatable_ele,dataurl,delete_ele,data_manage,del_url);
    }
    function loadBusinessTable() {
        let datatable_columns = [
            {
                data: "name",
                orderable: false
            },
            {
                data: "desc",
                orderable: false
            },
            {
                data: "path",
                orderable: false
            },
            {
                data: "id",
                render: function (data, type, row) {
                    return `
                    <button class="btn btn-xs btn-primary businessDelect" data-id=${data}><i class="fa fa-trash-o"></i> 删除</button>
                    `;
                },
                orderable: false
            },
        ];
        let datatable_ele = null;
        let dataurl = 'http://172.18.84.114:8081/ruleService/bean/queryElementByType/';
        let delete_ele = "undefined";
        let data_manage = {
            getQueryCondition: function (data) {
                let param = {};
                //组装排序参数
                if (data.order && data.order.length && data.order[0]) {
                    let sqlName = data.columns[data.order[0].column].data;
                    param.orderColumn = sqlName;
                    //排序方式asc或者desc
                    param.orderDir = data.order[0].dir;
                }
    
                //组装分页参数
                param.startIndex = data.start;
                param.pageSize = data.length;
                param.draw = data.draw;
                param.type = 'java'
                return param;
            }
        };
        let del_url = "undefined";
    
        // CONSTANT.DATA_TABLES.DEFAULT_OPTION.paging = false;
        // CONSTANT.DATA_TABLES.DEFAULT_OPTION.info = false;
        tableshow($("#businessTable"),datatable_columns,datatable_ele,dataurl,delete_ele,data_manage,del_url);
    }
    function loadFuncTable() {
        let datatable_columns = [
            {
                data: "methodnickname",
                orderable: false
            },
            {
                data: "methodtype",
                orderable: false
            },
            {
                data: "methodcontent",
                orderable: false
            },
            {
                data: "objpath",
                orderable: false
            },
            {
                data: "methodid",
                render: function (data, type, row) {
                    return `
                    <button class="btn btn-xs btn-primary funcDelect" data-id=${data}><i class="fa fa-trash-o"></i> 删除</button>
                    `;
                },
                orderable: false
            },
        ];
        let datatable_ele = null;
        let dataurl = 'http://172.18.84.114:8081/ruleService/bean/queryMethod/';
        let delete_ele = "undefined";
        let data_manage = {
            getQueryCondition: function (data) {
                let param = {};
                //组装排序参数
                if (data.order && data.order.length && data.order[0]) {
                    let sqlName = data.columns[data.order[0].column].data;
                    param.orderColumn = sqlName;
                    //排序方式asc或者desc
                    param.orderDir = data.order[0].dir;
                }
    
                //组装分页参数
                param.startIndex = data.start;
                param.pageSize = data.length;
                param.draw = data.draw;
                param.type = 'FUNCTION_SPACE'
                return param;
            }
        };
        let del_url = "undefined";
    
        // CONSTANT.DATA_TABLES.DEFAULT_OPTION.paging = false;
        // CONSTANT.DATA_TABLES.DEFAULT_OPTION.info = false;
        tableshow($("#funcTable"),datatable_columns,datatable_ele,dataurl,delete_ele,data_manage,del_url);
    }
    function loadFormData() {
        $.ajax({
            url: 'http://172.18.84.114:8081/ruleService/rule/ruleOverview',
            data: {
                ruleId: 3
            },
            type: 'POST',
            success: function(data) {
                if (data && +data.code === SUCCESS) {
                    let res = data.data
                    $('#summaryRuleName').val(res.NAME)
                    $('#summaryRuleType').val(res.TYPE)
                    $('#summaryRuleDesc').val(res.DESCRIPTION)
                    $('#summaryRuleCreate').val(moment(res.CREATETIME).format('YYYY年MM月DD日'))
                    $('#summaryRuleEdit').val(moment(res.LASTMODIFYTIME).format('YYYY年MM月DD日'))
                    $('#summaryRuleMan').val(res.CREATOR)
                    $('#summaryRuleVersion').val(res.VERSION)
                }
            }
        })
    }
    function loadBriefTable() {
        let datatable_columns = [
            {
                data: "CREATETIME",
                render: function(data) {
                    return `${moment(data).format('YYYY年MM月DD日')}`
                },
                orderable: false
            },
            {
                data: "CREATOR",
                orderable: false
            },
            {
                data: "VERSION",
                orderable: false
            },
            {
                data: "OID",
                render: function (data, type, row) {
                    return `
                    <button class="btn btn-xs btn-primary briefEdit" data-id=${data}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 编辑</button>
                    <button class="btn btn-xs btn-primary briefDownload" data-id=${data}><i class="fa fa-arrow-circle-down" aria-hidden="true"></i> 下载</button>
                    `;
                },
                orderable: false
            },
        ];
        let datatable_ele = null;
        let dataurl = 'http://172.18.84.114:8081/ruleService/rule/getRuleHistoryById';
        let delete_ele = "undefined";
        let data_manage = {
            getQueryCondition: function (data) {
                let param = {};
                //组装排序参数
                if (data.order && data.order.length && data.order[0]) {
                    let sqlName = data.columns[data.order[0].column].data;
                    param.orderColumn = sqlName;
                    //排序方式asc或者desc
                    param.orderDir = data.order[0].dir;
                }
    
                //组装分页参数
                param.startIndex = data.start;
                param.pageSize = data.length;
                param.draw = data.draw;
                param.ruleId = 3
                return param;
            }
        };
        let del_url = "undefined";
    
        // CONSTANT.DATA_TABLES.DEFAULT_OPTION.paging = false;
        // CONSTANT.DATA_TABLES.DEFAULT_OPTION.info = false;
        tableshow($("#historyTable"),datatable_columns,datatable_ele,dataurl,delete_ele,data_manage,del_url);
    }
});
})