$(function () {

    var treeData = "index.json";
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



    $('#tacticsConfrim').on('click', function () {
        // 规则的策略定义弹出层确定事件
        let result = ''
        if (tacticsType === 'project') {
            let val = $('.projectOptions input:radio:checked').val();
            let name = $('.projectOptions input:radio:checked').next('span').html()
            result = `<span data='${val}' data-type='${tacticsType}'>${name}</span>`
        } else if (tacticsType === 'condition') {
            result = `<span data='condition' data-type='${tacticsType}'>存在条件/不存在/所有条件true(根据上页现在的条件显示)</span>`
        } else if (tacticsType === 'gourp') {
            result = `<span data='gourp' data-type='${tacticsType}'>普通集合\增强集合（根据上文选择的集合类型确定，普通集合与增强集合与存在条件的选择集合一致）</span>`
        } else if (tacticsType === 'custom') {
            result = `<span data='custom' data-type='${tacticsType}'>${name}</span>`
        }
        $('.tactics').append(result)
        bindTacticsClick()
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
        bindTacticsClick()
        layer.close(conclusionAdd)
    })


    // 相关事件
    function bindTacticsClick() {
        $('.tactics span').on('click', function () {
            let type = $(this).attr('data-type')
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
    }
})