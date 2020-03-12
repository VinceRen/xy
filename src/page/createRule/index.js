$(function () {
    // 全局变量相关定义
    let tacticsSelection = 222;



    layui.use('form', function () {
        // layui相关插件定义
        let form = layui.form;

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
                $('.summary').css({ "display": "block" }).siblings().css({ "display": "none" })
            } else if (type === 'tab-data') {
                $('.data').css({ "display": "block" }).siblings().css({ "display": "none" })
            } else if (type === 'tab-func') {
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
                        <button class="btn btn-sm btn-default projectItemEdit">edit</button>
                        <button class="btn btn-sm btn-default">del</button>
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
    });
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

    $('body').on('click', '.projectItemEdit', function () {
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
        tactics.each(function (e) {
            let type = tactics.eq(e).attr('data-type')
            console.log('对象的类型', type)
            let allItem = tactics.eq(e).find('.projectItem')
            allItem.each(function (index) {
                let itemType = allItem.eq(index).attr('data-type')
                console.log('对象子集属性的类型', itemType)
                console.log('select选中的值的文本', allItem.eq(index).find('select').find("option:selected").text())
                console.log('select选中的值', allItem.eq(index).find('select').find("option:selected").val())
            })

        })
    })
})