/**
 * Created by Administrator on 2020/3/2 0002.
 */

treeShow(ajaxdataztree, $("#treeDemo"), true);


function singaltree_click(id, treeId, treeNode) {
    if (!treeNode.isParent) {
        $('.tab-content').removeClass('d-hidden');
    }
}



// 规则的策略定义弹出层触发
$('#tacticsAdd').on('click', function () {
    tacticsAdd = layer.open({
        type: 1,
        title: '添加规则对象',
        shadeClose: true, //点击遮罩关闭层
        area: ['800px', '520px'],
        content: $('#tacticsLayer')
    });
})

$('#tacticsConfrim').on('click', function () {
    // 规则的策略定义弹出层确定事件
    let result = '<span>tacticsConfrim</span>'

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
    let result = '<span>conclusion</span>'

    $('.conclusion').append(result)
    bindTacticsClick()
    layer.close(conclusionAdd)
})

// 相关事件
function bindTacticsClick() { }