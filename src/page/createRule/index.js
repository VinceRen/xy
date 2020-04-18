const SUCCESS = 200;
let urlId = getUrlParam('id'),
  singleTreeId = null;
let ruleId = null;
function isAdd(treeId, treeNode) {
    return false;
}

function showRenameBtn(treeId, treeNode) {
    return false;
}

function showRemoveBtn(treeId, treeNode) {
    return false;
}
layui.use('form', function () {
    // layui相关插件定义
    let form = layui.form;

    // 全局变量相关定义
    let tacticsSelection = null;
    let projectItem = null;


    // let treeData = "index.json";
    let treeData = `${basePath}ruleService/rule/getRuleClassTree`;
    treeShow(treeData, $("#ruleTree"), true);

    //标签加载
    $.ajax({
        url: `${basePath}ruleService/rulelable/loadAllRuleLableData`,
        type: 'POST',
        async: false,
        // data: {},
        xhrFields: { withCredentials: true},
        dataType: 'JSON',
        success: function (rlt) {
            let optionHtml = '';
            if(rlt.code == 200){
                [...rlt.pageData].forEach(function (value, index, arr) {
                    optionHtml += `<option value="${value.id}">${value.name}</option>`;
                })
            }
            $('#table-form1 #label, #summary-label').html(optionHtml);
        },
        error: function (r) {
            console.log(r);
            layer.msg('服务错误，标签加载失败');
            // return false;
        }
    });
    //表格添加
    $('.main-box').on('click', '.table-add', function () {
        $('#table-form1 #form-save').attr('data-id', null);
        $('#table-form1 #name').val("名称");
        $('#table-form1 #creator').val("admin");
        $('#table-form1 #desc').val("描述内容");
        $('#table-form1 #version').val("version-1.0.0");
        layershow("表格添加", ["500px", "auto"], $(".layer-form1"), $(".layer-form1 div"));
    });
    //表格弹层表单-添加保存
    $('.layer-form1').on('click', '#form-save', function () {
        let id = $('#table-form1 #form-save').attr('data-id') ? $('#table-form1 #form-save').attr('data-id') : null,
            ajaxUrl = id ? `${basePath}ruleService/rule/updateRuleInfo` : `${basePath}ruleService/rule/addRuleInfo`,
            ajaxData = getFormVal($("#table-form1"));
        ajaxData.classId = singleTreeId;
        ajaxData.pId = urlId;
        ajaxData.lableName  = $("#label option:selected").text();
        $.ajax({
            url: ajaxUrl,
            type: "POST",
            xhrFields: { withCredentials: true},
            data: ajaxData,
            dataType: 'json',
            success: function (rlt) {
                if(rlt.code == 200){
                    $('#form-save').siblings('button').trigger('click');
                    loadTableRuleInfo(singleTreeId);
                }
                layer.msg(rlt.message);
            },
            error: function (r) {
                console.log(r);
                layer.msg('服务错误，操作失败');
            }
        });
    });
    //表格编辑
    $('body').on('click', '.table-edit', function () {
        let formData = {
            name: $(this).closest('tr').find('td:nth-child(2)').text(),
            desc: $(this).closest('tr').find('td:nth-child(3)').text(),
            creator: $(this).closest('tr').find('td:nth-child(5)').text(),
            version: $(this).closest('tr').find('td:nth-child(6)').text(),
            lableName: $(this).closest('tr').find('td:nth-child(7)').text(),
            lableId: $(this).closest('tr').find('td:nth-child(7) div').attr('data-id'),
            classId: singleTreeId,
            pId: urlId,
        }
        $('.summary-operating').removeClass('d-hidden');
        $('#detailForm2 .summary-add').attr('data-id', $(this).closest('div').attr('data-id'));
        for (let key in formData) {
            $('#detailForm2 [name='+ key + ']').val(formData[key]);
        }
        $('.workTabs li:nth-child(4) a').trigger('click');
    });
    $('body').on('click', '.ruleTitle', function () {
        $(this).closest('tr').css({"background":"#eee"}).siblings().css({"background":"none"})
        ruleId = $(this).attr('data-id')
        $('.workTabs li').css({"display":"block"})
        $('.workTabs li').eq(3).addClass('active').siblings().removeClass('active')
        $('.summary').css({"display":"block"}).siblings().css({"display":"none"})
        loadCode('brief')
        loadBriefTable()
    });
    //表格-概述表单-编辑保存
    $('.summary-add').on('click', function () {
        let ajaxUrl = `${basePath}ruleService/rule/updateRuleInfo`,
          ajaxData = getFormVal($("#detailForm2"));
        ajaxData.id = $(this).attr('data-id');
        ajaxData.lableName  = $("#summary-label option:selected").text();
        if(!ajaxData.id){layer.msg('请选择规则数据关联');return false;}
        $.ajax({
            url: ajaxUrl,
            type: "POST",
            xhrFields: { withCredentials: true},
            data: ajaxData,
            dataType: 'json',
            success: function (rlt) {
                if(rlt.code == 200){
                    $('#form-save').siblings('button').trigger('click');
                    loadTableRuleInfo(singleTreeId);
                }
                layer.msg(rlt.message);
            },
            error: function (r) {
                console.log(r);
                layer.msg('服务错误，操作失败');
            }
        });
    });
    //表格删除
    $('body').on('click', '.table-delete', function () {
        debugger
        let that = $(this);
        $.ajax({
            url: `${basePath}ruleService/rule/deletRuleInfo`,
            type: 'POST',
            data: {ids: that.closest('div').attr('data-id')},
            dataType: 'json',
            success: function (rlt) {
                if(rlt.code == 200){
                    that.closest('tr').remove();
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
    });

    $('.tabs a').on('click', function () {
        let type = $(this).attr('href')
        // console.log(type)
        if(type === 'tab-info'){
            $('.ruleInfo').css({ "display": "block" }).siblings().css({ "display": "none" })
        }else if (type === 'tab-edit') {
            $('.ruleDefine').css({ "display": "block" }).siblings().css({ "display": "none" })
        } else if (type === 'tab-code') {
            loadCode('code')
            $('.code').css({ "display": "block" }).siblings().css({ "display": "none" })
        } else if (type === 'tab-brief') {
            $('.summary').css({ "display": "block" }).siblings().css({ "display": "none" })
            // loadFormData()
            loadCode('brief')
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


    $('#tacticsConfrim').on('click', function () {
        // 规则的策略定义弹出层确定事件
        let result = ''
        if (tacticsType === 'project') {
            let val = $('.projectOptions input:radio:checked').val();
            let name = $('.projectOptions input:radio:checked').next('span').html()
            result = `<div data='${val}' class="objectItem" data-type='${tacticsType}'>
                <span class="objectTitle" data-type='${tacticsType}'>
                    <i>${name}</i>
                    <em></em>
                </span>
            </div>`
        } else if (tacticsType === 'condition') {
            let val = $('.conditionOptions input:radio:checked').val();
            console.log(val)
            let name = $('.conditionOptions input:radio:checked').next('span').html()
            // result = `<span data='condition' data-type='${tacticsType}'>存在条件/不存在/所有条件true(根据上页现在的条件显示)</span>`
            result = `<div data='${val}' class="objectItem" data-type='${tacticsType}'>
                <span class="objectTitle">
                    <i>${name}</i>
                    <em></em>
                </span>
            </div>`
        } else if (tacticsType === 'gourp') {
            result = `<span data='gourp' data-type='${tacticsType}'>普通集合\增强集合（根据上文选择的集合类型确定，普通集合与增强集合与存在条件的选择集合一致）</span>`
        } else if (tacticsType === 'custom') {
            result = `<span data='custom' data-type='${tacticsType}'>${name}</span>`
        }
        $('.tactics').append(result)
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
        if (+propertyRadioValue === 0) { // 选项对象的字段
            let ajaxData = [{
                id: 0,
                text: '等于'
            }]
            let margin = tacticsSelection.innerWidth()
            let result = `<div class="projectItem" data-type="attribute" field-name="${fieldValue}" style="margin-left: ${margin}px">
                <form class="layui-form">
                    <span class="attrTitle"><i>${fieldText}</i><em></em></span>
                    <select name="city" lay-verify="required" lay-filter="property">
                        ${ajaxData.map(e => {
                return `<option value="${e.id}">${e.text}</option>`
            })}
                    </select>
                    <button class="btn btn-sm btn-default projectItemEdit"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                    <button class="btn btn-sm btn-default"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <div class="property"></div>
                </form>
            </div>`
            tacticsSelection.parent().append(result)
            form.render('select');
            layer.close(projectLayer)
        } else if (+propertyRadioValue === 1) { // 选项多约束对象
            let margin = tacticsSelection.innerWidth()
            let typeValue = $('#projectLayer .constraintType select').find("option:selected").val()
            let typeText = $('#projectLayer .constraintType select').find("option:selected").text()
            // if (+typeValue === 0) {} else if (+typeValue === 1) { }
            let result = `
                    <div class="projectItem constraint" data-type="constraint" data="${typeValue}" style="margin-left: ${margin}px">
                        <span class="constraintTitle">${typeText}</span>
                        <button class="btn btn-sm btn-default"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </div>`
            tacticsSelection.parent().append(result)
            form.render('select');
            layer.close(projectLayer)
        } else if (+propertyRadioValue === 2) { // 新建公式和函数
            let margin = tacticsSelection.innerWidth()
            let typeValue = $('#projectLayer .funcType select').find("option:selected").val()
            let typeText = $('#projectLayer .funcType select').find("option:selected").text()
            let params = JSON.parse($('#projectLayer .funcType select').find("option:selected").attr('data'))
            let result = `
                    <div class="projectItem function" data-type="function" data="${typeValue}" style="margin-left: ${margin}px">
                        <form class="layui-form">
                            <span class="attrTitle"><i>${typeText}</i><em></em></span>
                            ${params.map(e => (`
                                <span>参数：${e}</span>
                                <input param="${e}">
                            `)).join('')}
                            <button class="btn btn-sm btn-default"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </form>
                    </div>`
            tacticsSelection.parent().append(result)
            form.render('select');
            layer.close(projectLayer)
        } else if (+propertyRadioValue === 3) { // 选择使用表达式方式
            let margin = tacticsSelection.innerWidth()
            let ajaxData = [{
                id: 0,
                text: '01表达式(高度)'
            }]
            let ajaxData2 = [{
                id: 0,
                text: '等于'
            }]
            let result = `
                    <div class="projectItem expression" data-type="formula" data="" style="margin-left: ${margin}px">
                        <form class="layui-form">
                            <span class="attrTitle"><em>【没有绑定变量】</em></span>
                            <select name="expressionSelect" lay-verify="required" lay-filter="expressionSelect" class="expressionSelect">
                                <option value="text" checked>文本输入</option>
                                ${ajaxData.map(e => {
                                    return `<option value="${e.id}">${e.text}</option>`
                                })}
                            </select>
                            <section>
                                <div class="form-group">
                                    <input type="text" class="form-control layui-input" placeholder="输入搜索关键词">
                                </div>
                                <select name="" lay-verify="required" lay-filter="" class="factor">
                                    ${ajaxData2.map(e => {
                                        return `<option value="${e.id}">${e.text}</option>`
                                    })}
                                </select>
                                <button class="btn btn-sm btn-default projectItemEdit"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                <div class="property"></div>
                            </section>
                        </form>
                    </div>`
            tacticsSelection.parent().append(result)
            form.render('select');
            layer.close(projectLayer)
        } else if (+propertyRadioValue === 4) { // 设置变量名
            let name = $('#objectName').val()
            let result = `[<b>${name}</b>]`
            tacticsSelection.find('em').html(result)
            layer.close(projectLayer)
        }
    })


    form.on('select(expressionSelect)', function (data) {
        let box = $(this).closest(".layui-form").find('section')
        let ajaxData2 = [{
            id: 0,
            text: '等于'
        }]
        if (data.value === 'text') {
            let html = `
                <div class="form-group">
                    <input type="text" class="form-control layui-input" placeholder="输入搜索关键词">
                </div>
                <select name="" lay-verify="required" lay-filter="" class="factor">
                    ${ajaxData2.map(e => {
                        return `<option value="${e.id}">${e.text}</option>`
                    })}
                </select>
                <button class="btn btn-sm btn-default projectItemEdit"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <div class="property"></div>
            `
            box.html(html)
        } else {
            let ajaxData = [{
                name: 'codePointBefore(int)',
                id: 22
            }]
            let html = `
                <select class="funcSelect">
                    ${ajaxData.map(e => {
                        return `<option value="${e.id}">${e.name}</option>`
                    })}
                </select>
                <select name="" lay-verify="required" lay-filter="" class="factor">
                    ${ajaxData2.map(e => {
                        return `<option value="${e.id}">${e.text}</option>`
                    })}
                </select>
                <button class="btn btn-sm btn-default projectItemEdit"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <div class="property"></div>
            `
            box.html(html)
        }
        form.render('select');
    });

    let setPropertyValue = ''
    form.on('radio(setProperty)', function (data) {
        console.log('setproperty', data.value)
        setPropertyValue = data.value
    });
    $('#setPropertyConfrim').on('click', function () {
        if (+setPropertyValue === 0) {
            let html = `
            <div class="form-group">
                <input type="text" class="layui-input" id="" name="" data-name="attribute" placeholder="请输入属性值">
                <button class="btn btn-sm btn-default"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>
            `
            projectItem.find('form .property').html(html)
        } else if (+setPropertyValue === 1) {
            let html = `
            <div class="form-group">
                <input type="text" class="layui-input" id="" name="" data-name="formula" placeholder="请输入属性公式">
                <button class="btn btn-sm btn-default"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>
            `
            projectItem.find('form .property').html(html)
        } else if (+setPropertyValue === 2) {
            let html = `<div class="form-group">
                变量：
                <input type="text" class="layui-input" id="" name="" data-name="variable" value="${$('#objectItemEdit select').find("option:selected").text()}" disabled>
                <button class="btn btn-sm btn-default"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>`
            projectItem.find('form .property').html(html)
        }
        layer.close(projectItemEditLayer)
    })

    // 相关事件
    $('body').on('click', '.tactics .objectTitle', function () {
        // 点击变量、规则条件、规则合集、自定义规则事件
        $('#projectLayer .layui-input-block').eq(4).css({ "display": "flex" })
        form.render()
        tacticsSelection = $(this)
        let type = $(this).parent().attr('data-type')
        let name = $(this).html()
        if (type === 'project') {
            projectLayer = layer.open({
                type: 1,
                title: `修改（${name}）对象`,
                shadeClose: true, //点击遮罩关闭层
                area: ['800px', '520px'],
                content: $('#projectLayer')
            });
        } else if (type === 'condition') {
            $('#selectObjectLayer .layui-input-block').css({"display":"flex"})
            selectObjectLayer = layer.open({
                type: 1,
                title: `选择对象模型`,
                shadeClose: true, //点击遮罩关闭层
                area: ['800px', '520px'],
                content: $('#selectObjectLayer')
            });
        }
    })
    $('body').on('click', '.tactics .attrTitle', function () {
        // 点击属性名事件
        tacticsSelection = $(this)
        let attr = $(this).find('i').html()
        setAttrNameLayer = layer.open({
            type: 1,
            title: `设置${attr}变量名`,
            shadeClose: true, //点击遮罩关闭层
            area: ['800px', '200px'],
            content: $('#setAttrName')
        });
    })
    $('body').on('click', '.tactics .constraintTitle', function () {
        // 点击变量、规则条件、规则合集、自定义规则事件
        $('#projectLayer .layui-input-block').eq(4).css({ "display": "none" })
        tacticsSelection = $(this)
        // let type = $(this).closest('.objectItem').attr('data-type')
        let type = $(this).parent().siblings('.objectTitle').attr('data-type')
        let name = $(this).html()
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
    $('#setAttrNameConfrim').on('click', function () {
        // 设置属性的变量名
        let objName = `[<b>${$('#objectAttrName').val()}</b>]`
        tacticsSelection.find('em').html(objName)
        layer.close(setAttrNameLayer)
    })
    $('body').on('click', '.projectItemEdit', function (e) {
        e.preventDefault()
        let parentName = $(this).closest('.objectItem').find('.objectTitle').find('i').html()
        projectItem = $(this).closest('.projectItem')
        projectItemEditLayer = layer.open({
            type: 1,
            title: `修改（${parentName}）字段属性`,
            shadeClose: true, //点击遮罩关闭层
            area: ['800px', '300px'],
            content: $('#objectItemEdit')
        });

        // 查询全部变量名并渲染
        let allVariable = []
        let obj = $('.objectTitle')
        let attr = $('.attrTitle')
        obj.each(function (e) {
            let item = $('.objectTitle').eq(e).find('b').html()
            if (item) {
                allVariable.push(item)
            }
        })
        attr.each(function (e) {
            let item = $('.attrTitle').eq(e).find('b').html()
            if (item) {
                allVariable.push(item)
            }
        })
        let html = '<option value="">请选择变量</option>'
        for (let i = 0; i < (allVariable && allVariable.length); i++) {
            html += `<option value="${allVariable[i]}">${allVariable[i]}</option>`
        }
        $('#objectItemEdit .showVariable').html(html)
        form.render('select', 'showAttrLayer')
    })
    $('#selectObjectConfirm').on('click', function () {
        let val = $('#selectObjectLayer input:radio:checked').val();
        let margin = tacticsSelection.innerWidth()
        if (+val === 0) {
            //选择已有对象
            let objName = $('#existsObject').find("option:selected").text()
            let objValue = $('#existsObject').find("option:selected").val()
            let result = `
                    <div class="projectItem" data-type="project" data="${objValue}" style="margin-left: ${margin}px">
                        <span class="objectTitle" data-type="project">
                            <i>${objName}</i>
                            <em></em>
                            <div class="fa fa-times" aria-hidden="true"></div>
                        </span>
                    </div>`
            tacticsSelection.parent().append(result)
            layer.close(selectObjectLayer)
        } else if (+val === 1) {
            //从增强合集选择
            let result = `
            <div class="projectItem" data-type="enhance" data="${val}" style="margin-left: ${margin}px">
                <span class="conditiontTitle">
                    <i>增强合集</i>
                    <div class="fa fa-times" aria-hidden="true"></div>
                </span>
            </div>`
            tacticsSelection.parent().append(result)
            layer.close(selectObjectLayer)
        } else if (+val === 2) {
            // 从普通集合选择
            let result = `
            <div class="projectItem" data-type="common" data="${val}" style="margin-left: ${margin}px">
                <span class="conditiontTitle">
                    <i>普通合集</i>
                    <div class="fa fa-times" aria-hidden="true"></div>
                </span>
            </div>`
            tacticsSelection.parent().append(result)
            layer.close(selectObjectLayer)
        }
    })
    $('body').on('click', '.conditiontTitle', function () {
        let type = $(this).parent().attr('data-type')
        tacticsSelection = $(this)
        if (type !== 'object') {
            $('#selectObjectLayer .layui-input-block').eq(0).css({"display":"flex"}).siblings().css({"display":"none"})
            // 增强、普通合集
            selectObjectLayer = layer.open({
                type: 1,
                title: `选择对象模型`,
                shadeClose: true, //点击遮罩关闭层
                area: ['800px', '520px'],
                content: $('#selectObjectLayer')
            });
        } else {
            // 已有对象,目前走的对象添加
        }
    })
    // 源代码编辑后保存事件
    $('.code button').on('click', function () {
        $.ajax({
            url: 'http://172.18.84.114:8081/ruleService/rule/updateRuleDefinition',
            data: {
                id: ruleId,
                content: $('#codeTextArea').val()
            },
            type: 'POST',
            success: function (data) {
                if (data && data.code === SUCCESS) {
                   loadCode('code')
                   layer.msg(data.message);
                } else layer.msg(data.message);
            }
        })
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
            let allItem = tactics.eq(e).children('.projectItem')
    
            if (type === 'project') {
                let getData = function (allDom) {
                    let data = []
                    allDom.each(index => {
                        let itemType = allDom.eq(index).attr('data-type')
                        if (itemType === 'attribute') {
                            data.push({
                                type: itemType,
                                factorName: allDom.eq(index).find('select').find("option:selected").text(),
                                factorValue: allDom.eq(index).find('select').find("option:selected").val(),
                                fieldName: allDom.eq(index).attr('field-name'),
                                name: allDom.eq(index).find('.property input').attr('data-name'),
                                value: allDom.eq(index).find('.property input').val(),
                                variable: allDom.eq(index).find('.attrTitle b').html()
                            })
                        } else if (itemType === 'function') {
                            let funcData = {
                                type: itemType,
                                funcId: allDom.eq(index).attr('data'),
                                funcName: allDom.eq(index).find('.attrTitle > i').html(),
                                variable: allDom.eq(index).find('.attrTitle b').html()
                            }
                            let params = allDom.eq(index).find('input')
                            params.each(index => {
                                let paramsName = params.eq(index).attr('param')
                                funcData[paramsName] = params.eq(index).val()
                            })
                            data.push(funcData)
                        } else if (itemType === 'formula') {
                            data.push({
                                type: itemType,
                                variable: allDom.eq(index).find('.attrTitle > em > b').html(),
                                attrName: allDom.eq(index).find('.expressionSelect').find("option:selected").text(),
                                attrId: allDom.eq(index).find('.expressionSelect').find("option:selected").val(),
                                funcName: allDom.eq(index).find('.funcSelect').find("option:selected").text(),
                                funcId: allDom.eq(index).find('.funcSelect').find("option:selected").val(),
                                factorName: allDom.eq(index).find('.factor').find("option:selected").text(),
                                factorValue: allDom.eq(index).find('.factor').find("option:selected").val(),
                                name: allDom.eq(index).find('.property input').attr('data-name'),
                                value: allDom.eq(index).find('.property input').val()
                            })
                        } else if (itemType === 'constraint') {
                            let constraintAttrData = getData(allDom.eq(index).children('.projectItem'))
                            data.push({
                                type: itemType,
                                value: allDom.eq(index).attr('data'),
                                attr_data: constraintAttrData
                            })
                        }
                    })
                    return data
                }
                let attr_data = getData(allItem)
                data.push({
                    name,
                    id,
                    type,
                    variable: tactics.eq(e).children('.objectTitle b').html(),
                    attr_data
                })
            } else if (type === 'condition') {
                let getData = function (allDom) {
                    let data = []
                    allDom.each(index => {
                        let itemType = allDom.eq(index).attr('data-type')
                        let name = allDom.eq(index).find('.objectTitle > i').html()
                        let id = allDom.eq(index).attr('data')
                        let variable = allDom.eq(index).find('.objectTitle > em b').html()
                        if (itemType === 'project') {
                            let getData = function (allDom) {
                                let data = []
                                allDom.each(index => {
                                    let itemType = allDom.eq(index).attr('data-type')
                                    if (itemType === 'attribute') {
                                        data.push({
                                            type: itemType,
                                            factorName: allDom.eq(index).find('select').find("option:selected").text(),
                                            factorValue: allDom.eq(index).find('select').find("option:selected").val(),
                                            fieldName: allDom.eq(index).attr('field-name'),
                                            name: allDom.eq(index).find('.property input').attr('data-name'),
                                            value: allDom.eq(index).find('.property input').val(),
                                            variable: allDom.eq(index).find('.attrTitle b').html()
                                        })
                                    } else if (itemType === 'function') {
                                        let funcData = {
                                            type: itemType,
                                            funcId: allDom.eq(index).attr('data'),
                                            funcName: allDom.eq(index).find('.attrTitle > i').html(),
                                            variable: allDom.eq(index).find('.attrTitle b').html()
                                        }
                                        let params = allDom.eq(index).find('input')
                                        params.each(index => {
                                            let paramsName = params.eq(index).attr('param')
                                            funcData[paramsName] = params.eq(index).val()
                                        })
                                        data.push(funcData)
                                    } else if (itemType === 'formula') {
                                        data.push({
                                            type: itemType,
                                            variable: allDom.eq(index).find('.attrTitle > em > b').html(),
                                            attrName: allDom.eq(index).find('.expressionSelect').find("option:selected").text(),
                                            attrId: allDom.eq(index).find('.expressionSelect').find("option:selected").val(),
                                            funcName: allDom.eq(index).find('.funcSelect').find("option:selected").text(),
                                            funcId: allDom.eq(index).find('.funcSelect').find("option:selected").val(),
                                            factorName: allDom.eq(index).find('.factor').find("option:selected").text(),
                                            factorValue: allDom.eq(index).find('.factor').find("option:selected").val(),
                                            name: allDom.eq(index).find('.property input').attr('data-name'),
                                            value: allDom.eq(index).find('.property input').val()
                                        })
                                    } else if (itemType === 'constraint') {
                                        let constraintAttrData = getData(allDom.eq(index).children('.projectItem'))
                                        data.push({
                                            type: itemType,
                                            value: allDom.eq(index).attr('data'),
                                            attr_data: constraintAttrData
                                        })
                                    }
                                })
                                return data
                            }
                            let attr_data = getData(allDom.eq(index).children('.projectItem'))
                            data.push({
                                name,
                                id,
                                type: itemType,
                                variable,
                                attr_data
                            })
                        } else if (itemType === 'enhance' || itemType === 'common') {
                            let attr_data = getData(allDom.eq(index).children('.projectItem'))
                            data.push({
                                name: allDom.eq(index).find('.conditiontTitle > i').html(),
                                id,
                                type: itemType,
                                attr_data
                            })
                        }
                        
                    })
                    return data
                }
                let attr_data = getData(allItem)
                data.push({
                    name,
                    id,
                    type,
                    variable: tactics.eq(e).children('.objectTitle b').html(),
                    attr_data
                })
            }
    
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
        // if (data.method_data.length) data.method_data = JSON.stringify(data.method_data)
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
        $('#addDataLayer .form-control').eq(0).val('business')
        addDataLayer = layer.open({
            type: 1,
            title: `添加业务数据对象`,
            shadeClose: true, //点击遮罩关闭层
            area: ['800px', '520px'],
            content: $('#addDataLayer')
        });
    })

    $('#spaceAdd').on('click', function () {
        // 空间对象添加事件
        $('#addDataLayer .form-control').eq(0).val('space')
        addDataLayer = layer.open({
            type: 1,
            title: `添加空间数据对象`,
            shadeClose: true, //点击遮罩关闭层
            area: ['800px', '520px'],
            content: $('#addDataLayer')
        });
    })
    $('#addDataLayer #addDataConfrim').on('click', function () {
        let data = form.val("addBusiness");
        $.ajax({
            url: 'http://172.18.84.114:8081/ruleService/bean/addBean',
            data,
            type: 'POST',
            success: function (data) {
                layer.msg(data.message);
                loadBusinessTable()
                loadSpaceTable()
                layer.close(addDataLayer)
                // if (data && data.code === 'SUCCESS') layer.msg('添加成功');
                // else layer.msg('添加失败');
            }
        })
    })

    

    
});
// 相关事件提取为函数
function loadSpaceTable() {
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
            param.type = 'space'
            param.search = ''
            return param;
        }
    };
    let del_url = "undefined";

    // CONSTANT.DATA_TABLES.DEFAULT_OPTION.paging = false;
    // CONSTANT.DATA_TABLES.DEFAULT_OPTION.info = false;
    tableshow($("#spaceTable"), datatable_columns, datatable_ele, dataurl, delete_ele, data_manage, del_url, 'POST');
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
            param.type = 'business',
            param.search = ''
            return param;
        }
    };
    let del_url = "undefined";

    // CONSTANT.DATA_TABLES.DEFAULT_OPTION.paging = false;
    // CONSTANT.DATA_TABLES.DEFAULT_OPTION.info = false;
    tableshow($("#businessTable"), datatable_columns, datatable_ele, dataurl, delete_ele, data_manage, del_url, 'POST');
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
            param.search = ''
            return param;
        }
    };
    let del_url = "undefined";

    // CONSTANT.DATA_TABLES.DEFAULT_OPTION.paging = false;
    // CONSTANT.DATA_TABLES.DEFAULT_OPTION.info = false;
    tableshow($("#funcTable"), datatable_columns, datatable_ele, dataurl, delete_ele, data_manage, del_url, 'POST');
}
function loadFormData() {
    $.ajax({
        url: 'http://172.18.84.114:8081/ruleService/rule/ruleOverview',
        data: {
            ruleId: 3
        },
        type: 'POST',
        success: function (data) {
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
            render: function (data) {
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
            param.ruleId = ruleId
            return param;
        }
    };
    let del_url = "undefined";

    // CONSTANT.DATA_TABLES.DEFAULT_OPTION.paging = false;
    // CONSTANT.DATA_TABLES.DEFAULT_OPTION.info = false;
    tableshow($("#historyTable"), datatable_columns, datatable_ele, dataurl, delete_ele, data_manage, del_url, 'POST');
}
function loadCode(type) {
    $.ajax({
        url: 'http://172.18.84.114:8081/ruleService/rule/getRuleInfoById',
        data: {
            id: ruleId
        },
        type: 'POST',
        success: function (data) {
            if (data && data.code === SUCCESS) {
                // if (type === 'code') $('.code code').html(data.pageData[0].definition)
                if (type === 'code')$('#codeTextArea').val(data.pageData[0].definition);
                else if(data.pageData.length){
                    // 编辑状态
                    $('#summaryRuleCreate,#summaryRuleEdit,#summaryRuleMan').attr("disabled", false)
                    // 赋值
                    $('#summaryRuleName').val(data.pageData[0].name)
                    $('#summaryRuleDesc').val(data.pageData[0].desc)
                    $('#summaryRuleCreate').val(data.pageData[0].createtime)
                    $('#summaryRuleEdit').val(data.pageData[0].edittime)
                    $('#summaryRuleMan').val(data.pageData[0].creator)
                    $('#summaryRuleVersion').val(data.pageData[0].version)
                    // 不可编辑
                    $('#summaryRuleCreate,#summaryRuleEdit,#summaryRuleMan').attr("disabled", true)
                }
            } else layer.msg('删除失败');
        }
    })
}
function callbackBtn(ele, tableele) {
    let id = ele.attr('data-id')
    if (ele.hasClass('spaceDelect') || ele.hasClass('businessDelect')) {
        layer.confirm(`确认删除该业务数据对象`, {
            btn: ['确认', '取消']
        }, function () {
            $.ajax({
                url: 'http://172.18.84.114:8081/ruleService/bean/deleteBean/',
                data: {
                    id
                },
                type: 'POST',
                success: function (data) {
                    if (data && data.code === SUCCESS) {
                        layer.msg('删除成功');
                        if (ele.hasClass('businessDelect')) loadBusinessTable()
                        if (ele.hasClass('spaceDelect')) loadSpaceTable()
                    } else layer.msg('删除失败');
                }
            })
        }, function () {
            layer.msg('取消删除');
        });
    }

    if (ele.hasClass('funcDelect')) {
        layer.confirm(`确认删除该函数吗？`, {
            btn: ['确认', '取消']
        }, function () {
            $.ajax({
                url: 'http://172.18.84.114:8081/ruleService/bean/deleteFunction/',
                data: {
                    id
                },
                type: 'POST',
                success: function (data) {
                    if (data && data.code === SUCCESS) {
                        layer.msg('删除成功');
                        loadFuncTable()
                    } else layer.msg('删除失败');
                }
            })
        }, function () {
            layer.msg('取消删除');
        });
    }

    if (ele.hasClass('briefDownload')) {
        layer.confirm(`下载，id为：${id}`, {
            btn: ['确认', '取消']
        }, function () {
            layer.msg('下载成功');
        }, function () {
            layer.msg('取消下载');
        });
    }

}
function drawcallback(ele, tableele) {
    layui.use('form', function () {
        var form = layui.form;
        form.render();
    });
}
//规则信息表格加载函数
function loadTableRuleInfo(id, search) {
    var ajaxSearch = search ? search : null;
    var param = {classId: id, search: ajaxSearch, pId: urlId};
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
                return `<p data-id="${row.id}" class="ruleTitle">${data}</p>`;
            },
            orderable: false
        },
        { data: "desc", orderable: false },
        { data: "createtime", orderable: false },
        { data: "creator", orderable: false },
        { data: "version", orderable: false },
        {
            data: "lableName",
            render: function(data, type, row){
                return `<div data-id="${row.lableId }">${data}</div>`;
            },
            orderable: false
        },
        {
            data: "id",
            render: function (data, type, row) {

                return `<div class="data-name" data-id=${data}>
                        <button class="btn btn-xs btn-primary table-delete"><i class="fa fa-trash-o"></i> 删除</button>
                    </div>`;
            },
            orderable: false
        },
    ];
    var datatable_ele = null;
    var dataurl = `${basePath}ruleService/rule/loadRuleInfoList`;
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
    tableshow($(".table-info"),
      datatable_columns,
      datatable_ele,
      dataurl,
      delete_ele,
      data_manage,
      del_url,
      "POST");
}
//tree点击事件

function singaltree_click(id, treeId, treeNode){
    singleTreeId = id;
    loadTableRuleInfo(id);
    $('.workTabs li:nth-child(1) a').trigger('click');
}
// 获取url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
} 




