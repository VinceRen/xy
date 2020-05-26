/**
 * Created by Administrator
 */
//基础服务路径
var basePath = 'http://172.18.84.114:8081/';

var CONSTANT = {
	DATA_TABLES: {
		DEFAULT_OPTION: { //DataTables初始化选项
			language: {
				"sProcessing": "处理中...",
				"sLengthMenu": "",
				"sZeroRecords": "没有匹配结果",
				"sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
				"sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
				"sInfoFiltered": "(由 _MAX_ 项结果过滤)",
				"sInfoPostFix": "",
				"sSearch": "搜索:",
				"sUrl": "",
				"sEmptyTable": "表中数据为空",
				"sLoadingRecords": "载入中...",
				"sInfoThousands": ",",
				"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "上页",
					"sNext": "下页",
					"sLast": "末页",
					"sJump": "跳转"
				},
				"oAria": {
					"sSortAscending": ": 以升序排列此列",
					"sSortDescending": ": 以降序排列此列"
				}
			},
			"ordering": true,
			"dom": "ft<'row-fluid'<'fl'i> <'fl'l><'fr'p>>",
			"lengthMenu": [10, 20, 30],
			paging: true,
			autoWidth: false, //禁用自动调整列宽
			stripeClasses: [], //为奇偶行加上样式，兼容不支持CSS伪类的场合
			order: [], //取消默认排序查询,否则复选框一列会出现小箭头
			processing: false, //隐藏加载提示,自行处理
			serverSide: true, //启用服务器端分页
			searching: false, //禁用原生搜索
			bLengthChange: false
		},

		COLUMN: {
			CHECKBOX: { //复选框单元格
				className: "td-checkbox",
				"orderable": false,
				width: "30px",
				data: null,
				render: function(data, type, row, meta) {
					return '<input type="checkbox" class="iCheck">';
				}
			}
		},
		RENDER: { //常用render可以抽取出来，如日期时间、头像等
			ELLIPSIS: function(data, type, row, meta) {
				data = data || "";
				return '<span title="' + data + '">' + data + '</span>';
			}
		}
	}
};

function subFuntion(form2,zTree,treeNode,addTreeUrl,fixTreeUrl){}
function subFuntion2(form2,zTree,treeNode,addTreeUrl,fixTreeUrl){}

function validation(obj,zTree,addTreeUrl,fixTreeUrl) {
    // for more info visit the official plugin documentation:
    // http://docs.jquery.com/Plugins/Validation
    var form2 = obj;
    form2.validate({
		errorElement: 'span', //default input error message container
		errorClass: 'help-block help-block-error', // default input error message class
		focusInvalid: true, // do not focus the last invalid input
		ignore: "",  // validate all fields including form hidden input
		rules: {
			name: {
				minlength: 2,
				required: true
			},
			email: {

				email: true
			},
			url: {
				required: true,
				url: true
			},
			number: {
				required: true,
				number: true
			},
            digits: {
                required: true,
                digits: true
            },
            creditcard: {
                required: true,
                creditcard: true
            },
            password: {
           	 maxlength:10,
               required: true
           },
             newpassword: {
            	 minlength:6,
            	 maxlength:10,
                required: true,
                alnum: true,
				samepassword: true
            },
			newpasswordrepeat: {
				minlength:6,
				maxlength:10,
			  equalTo: "#newpassword",
				  alnum: true,
				  samepassword: true
			}
		},
		messages: {
        newpasswordrepeat: {
	        equalTo: "两次密码输入不一致"
	      }
		},

		errorPlacement: function(error, element) { // render error placement for each input type
			var icon = $(element).parent('.input-icon').children('i');
			icon.removeClass('fa-check').addClass("fa-warning");
			icon.attr("data-original-title", error.text()).tooltip({
				'container': 'body'
			});
		},

		highlight: function (element) { // hightlight error inputs
			$(element).closest('.form-group').removeClass("has-success").addClass('has-error'); // set error class to the control group
		},
		success: function (label, element) {
			var icon = $(element).parent('.input-icon').children('i');
			$(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
			icon.removeClass("fa-warning").addClass("fa-check");
		},
		submitHandler: function () {
            subFuntion(form2,zTree,addTreeUrl,fixTreeUrl)
            subFuntion2(form2,zTree,addTreeUrl,fixTreeUrl)
		}
	});
}



function scrollTable(height) {
	return {
		DATA_TABLES: {
			DEFAULT_OPTION: { //DataTables初始化选项
				language: {
					"sProcessing": "处理中...",
					"sLengthMenu": "",
					"sZeroRecords": "没有匹配结果",
					"sInfo": "",
					"sInfoPostFix": "",
					"sUrl": "",
					"sEmptyTable": "表中数据为空",
					"sLoadingRecords": "载入中...",
					"sInfoThousands": ",",
				},
				"scrollCollapse": true,
				"scrollY": height,
				"ordering": true,
				"dom": "ft<'row-fluid'<'fl'i> <'fl'l><'fr'p>>",
				autoWidth: false, //禁用自动调整列宽
				processing: false, //隐藏加载提示,自行处理
				serverSide: false, //启用服务器端分页
				searching: false, //禁用原生搜索
				bLengthChange: false
			},

			COLUMN: {
				CHECKBOX: { //复选框单元格
					className: "td-checkbox",
					"orderable": false,
					width: "30px",
					data: null,
					render: function(data, type, row, meta) {
						return '<input type="checkbox" class="iCheck">';
					}
				}
			},
			RENDER: { //常用render可以抽取出来，如日期时间、头像等
				ELLIPSIS: function(data, type, row, meta) {
					data = data || "";
					return '<span title="' + data + '">' + data + '</span>';
				}
			}
		}
	};
}

function drawcallback(ele, tableele) {}

function callbacka(ele, tableele) {}
function callbackBtn(ele, tableele) {}

function delFun() {}

function tableshow(ele, inputcolumns, tableele, url, deleteDom, userManage, delUrl,ajaxType) {
		var $table = ele;
	  tableele = $table.dataTable($.extend(true, {}, CONSTANT.DATA_TABLES.DEFAULT_OPTION, {
			ajax: function(data, callback, settings) {
			//封装请求参数
			var param = userManage.getQueryCondition(data);
			//ajax请求判断
			if( typeof(ajaxType) !== "string" || ajaxType.toLocaleUpperCase() != "POST"){
				ajaxType = "GET"
			}
			$.ajax({
				type: ajaxType,
				url: url,
				cache: false, //禁用缓存
				data: param, //传入已封装的参数
				dataType: "json",
				xhrFields: { withCredentials: true },
				// async: false,//同步
				success: function(result) {
					//异常判断与处理
					if(result.code == 400) {
						console.log(result);
						if(result.msg){
							layer.msg(result.msg);
						}else{
							layer.msg("查询失败");
						}
						return;
					}
					//封装返回数据
					var returnData = {};
					returnData.draw = data.draw; //这里直接自行返回了draw计数器,应该由后台返回
					returnData.recordsTotal = result.total; //总记录数
					returnData.recordsFiltered = result.total; //后台不实现过滤功能，每次查询均视作全部结果
					if(Object.prototype.toString.call(result.pageData) === '[object Object]'){
						returnData.data = result.pageData.params;
					}else{
						returnData.data = result.pageData;
					}

					//调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
					//此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕

					callback(returnData);

				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(textStatus);
					layer.msg("服务错误，查询失败");
				}
			});
		},
		"destroy": true,
		columns: inputcolumns,

		destroy: true,
		"drawCallback": function(settings) {
			drawcallback(ele, tableele);
			//清空全选状态
			ele.find(":checkbox[name='cb-check-all']").prop('checked', false);

			if(ele.hasClass("select-table")) {
				selecttablecallback(ele, tableele);
			};

			if(ele.hasClass("select-file")) {
				selectfilecallback(ele, tableele);
			};

			//渲染完毕后的回调
			ele.find("td span").unbind("click");
			ele.find("td span").click(function(event) {
				event.stopPropagation();
				callbacka($(this), tableele);
			});
			ele.find("td .btn").unbind("click");
			ele.find("td .btn").click(function(event) {
				callbackBtn($(this), tableele);
			})
		}
	})).api();

		ele.on("change", ":checkbox", function() {
		if($(this).is("[name='cb-check-all']")) {
			$(":checkbox", ele).prop("checked", $(this).prop("checked"));
			ele.find("tr").removeClass("active");
			ele.find("tbody input").change();

		} else {
			//一般复选
			var checkbox = $("tbody :checkbox", ele);
			$(":checkbox[name='cb-check-all']", ele).prop('checked', checkbox.length == checkbox.filter(':checked').length);
			ele.find("tr").removeClass("active");
		}
	});

		if(deleteDom != "undefined") {
		deleteDom.unbind("click")
		deleteDom.click(function() {

			var arrItemId = [];
			ele.find("tbody :checkbox:checked").each(function(i) {
				var item = tableele.row($(this).closest('tr')).data();

				if(!!item.oid) {
					arrItemId.push(item.oid);
				} else {
					arrItemId.push(item.id);
				}
			});
			console.log(arrItemId);

			if(arrItemId && arrItemId.length) {
				layer.confirm('确定要删除吗?', {
					btn: ['确定', '取消']
				}, function(index) {
					$.ajax({
						url: delUrl,
						type: "post",
						traditional: true,
						data: {
							arr: JSON.stringify(arrItemId)
						},
						dataType: "json",
						success: function(data) {
							if(data != "haschild") {
								layer.msg("删除成功!");
								tableele.ajax.reload();
								layer.close(index);
							}
							delFun(data);
						}
					})
				});
			} else {
				layer.msg('请先选中要操作的行');
			}
		});
	}

		// 搜索按钮触发效果
		ele.find(".tablesearch").click(function() {
			tableele.draw();
		});

		ele.find(".upsearch").unbind("keyup");
		ele.find(".upsearch").keyup(function(){
		$(this).closest("tr").find(".tablesearch").trigger("click");
		})

		$table.on("click", ".btn-edit", function() {
			//编辑按钮
			var item = tableele.row($(this).closest('tr')).data();
			userManage.editItemInit(item);
		}).on("click", ".btn-del", function() {
			//删除按钮
			var item = tableele.row($(this).closest('tr')).data();
			userManage.deleteItem(item);
		});
}

function singaltree_click(id, treeId, treeNode) {}

function hiddenValue(treeNode, treeId) {}

function treeTable(treeDom, url, tableurl, tableDom, msg, table, delDom, userManage, delUrl, flag) {
	var view = null;
	var enable;
	if(flag) {
		view = {
			expandSpeed: "",
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom,
			selectedMulti: false
		};
		enable = flag;
	} else {
		view = {
			selectedMulti: false
		};
		enable = flag;
	}

	var setting = {
		view: view,
		data: {
			simpleData: {
				enable: true //是否采用简单数据模式
			}
		},
		edit: {
			enable: enable,
			showRemoveBtn: showRemoveBtn,
			showRenameBtn: showRenameBtn,
			renameTitle: "编辑",
			removeTitle: "删除",
			drag: {
				isCopy: false,
				isMove: false
			}
		},
		async: {
			enable: true,
			type: 'GET',
			url: url,
			/* autoParam:[],
			 otherParam:{"zTreeIsLoad":true},*/
			dataFilter: filter,
			autoParam: ["id","level=lv","lvs","marked=md"]
		},
		treeNodeKey: "id", //在isSimpleData格式下，当前节点id属性  
		treeNodeParentKey: "pId", //在isSimpleData格式下，当前节点的父节点id属性  
		callback: {
			onAsyncSuccess: function() {
			},
			onCollapse: function() {

				$(".curSelectedNode").prev().addClass("selectnode");

			},
			onExpand: function() {

				$(".curSelectedNode").prev().addClass("selectnode");

			},
			//beforeRename: beforeRename,
			beforeRemove: zTreeBeforeRemove,
			beforeEditName: zTreeBeforeEditName,
			onClick: function(event, treeId, treeNode, clickFlag) {

				$(".selectnode").removeClass("selectnode");
				$(".curSelectedNode").prev().addClass("selectnode");

				if(tableurl.indexOf("?") > 0) {
					newtableurl = tableurl + '&id=' + treeNode.id;
				} else {
					newtableurl = tableurl + '?id=' + treeNode.id;
				}
				if($("#eid") != "undefined") {
					$("#eid").val(treeNode.id);
					$("#pid").val(treeNode.id);
					$("#op").show();
				}
				hiddenValue(treeNode, treeId)
				tableshow(tableDom, msg, table, newtableurl, delDom, userManage, delUrl);

				singaltree_click(treeNode.id, treeId, treeNode);
			}
		}
	};

	function filter(treeId, parentNode, childNodes) {
		if(!childNodes) return null;
		for(var i = 0, l = childNodes.length; i < l; i++) {
			
			childNodes[i].name = childNodes[i].name.replace(/\.n/g,'.');
			
			
		}
		return childNodes;
	}
	$.fn.zTree.init(treeDom, setting);

	//	$('.tree_box').niceScroll({
	//		cursorcolor: "#ccc", //#CC0071 光标颜色
	//		cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
	//		touchbehavior: true, //使光标拖动滚动像在台式电脑触摸设备
	//		cursorwidth: "5px", //像素光标的宽度
	//		cursorborder: "0", // 游标边框css定义
	//		cursorborderradius: "5px", //以像素为光标边界半径
	//		autohidemode: false, //是否隐藏滚动条
	//		horizrailenabled: true, // nicescroll可以管理水平滚动
	//		cursordragontouch: true, // 使用触屏模式来实现拖拽
	//	});

}
var treedele = null;
function treeShow(url, treele, flag, ajaxType, ajaxData) {
	var view = null, enable;
	ajaxType = ajaxType == "POST" ? "POST" : "GET";
	ajaxData = Object.prototype.toString.call(ajaxData) === '[object Object]' ? ajaxData : {};
	ajaxData.otherParam = "zTreeAsyncTest";
	// ajaxData.parentId = 0;
	if(flag) {
		view = {
			expandSpeed: "",
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom,
			selectedMulti: false
		};
		enable = flag;
	} else {
		view = {
			selectedMulti: false
		};
		enable = flag;
	}
	var setting = {
		view: view,
		data: {
			simpleData: {
				enable: true //是否采用简单数据模式
			}
		},
		edit: {
			enable: enable,
			showRemoveBtn: showRemoveBtn,
			showRenameBtn: showRenameBtn,
			renameTitle: "编辑",
			removeTitle: "删除"
		},
		async: {
			enable: true,
			type: ajaxType,
			url: url,
			xhrFields: {withCredentials: flag},
			//autoParam: ["id", "name=n", "level=lv"],
			autoParam: ["id", "name=n", "lvs=lv", "lvs=level"],
			otherParam: ajaxData,
			dataFilter: filter
		},
		callback: {
			beforeRemove: zTreeBeforeRemove,
			beforeEditName: zTreeBeforeEditName,
			onClick: function(event, treeId, treeNode, clickFlag) {
				singaltree_click(treeNode.id, treeId, treeNode);

			}
		}
	};

	function filter(treeId, parentNode, childNodes) {
		if(!childNodes) return null;
		if(childNodes.hasOwnProperty('pageData') &&
				childNodes.code == 200 &&
					childNodes.pageData.length){
				childNodes = childNodes.pageData;
		}else if(childNodes.hasOwnProperty('pageData') &&
			childNodes.code == 400 &&
			!childNodes.pageData.length){
				alert(childNodes.msg);
			  childNodes = [{name: childNodes.msg}]
		}
		for(var i = 0, l = childNodes.length; i < l; i++) {
			childNodes[i].name = childNodes[i].name.replace(/\.n/g,'.');
		}
		return childNodes;
	}
	$.fn.zTree.init(treele, setting);
}

function addHoverDom(treeId, treeNode) {
	/*判断是否有增加图标*/
	var isadd = isAdd(treeId, treeNode);
	if(!isadd) {
		return isadd;
	}
	var sObj = $("#" + treeNode.tId + "_span");
	if(treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
	var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='增加' onfocus='this.blur();'></span>";
	sObj.after(addStr);
	var btn = $("#addBtn_" + treeNode.tId);

	if(btn) btn.bind("click", function() {
		var zTree = $.fn.zTree.getZTreeObj(treeId);
		addTree(zTree, treeNode);
		return false;
	});
}
function removeHoverDom(treeId, treeNode) {
	$("#addBtn_" + treeNode.tId).unbind().remove();
}

function isAdd(treeId, treeNode) {
	return true
}
function showRemoveBtn(treeId, treeNode) {
	return true
}
function showRenameBtn(treeId, treeNode) {
	return true
}

function addTree(zTree, treeNode) {}
function zTreeBeforeEditName(treeId, treeNode) {}
function zTreeBeforeRemove(treeId, treeNode) {}

Array.prototype.indexOf = function(val) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] == val) return i;
	}
	return -1;
};

Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if(index > -1) {
		this.splice(index, 1);
	}
};

function ajaxSub(form2, url) {
	form2.ajaxSubmit({
		type: "post",
		url: url,
		//beforeSubmit: showRequest,
		success: function() {

		}
	});
	return false;
}

function setselect(ele, data) {
	if(ele.size() > 0) {
		for(i = 0; i < ele.size(); i++) {
			var optionhtml = '';
			$.each(data, function(key, val) {
				optionhtml += '<option value="' + data[key] + '">' + key + '</option>';
			})
			ele.eq(i).append(optionhtml)
		}
	}
}

function sortall(obj) {
	for(var i = 0; i < obj.length; i++) {
		obj[i].orderable = true;
	}
}

function nosortall(obj) {
	for(var i = 0; i < obj.length; i++) {
		obj[i].orderable = false;
	}
}

//滚动条
function scroll(dom) {
	dom.niceScroll({
		cursorcolor: "#ddd", // 改变滚动条颜色，使用16进制颜色值
		cursoropacitymin: 1, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
		cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
		cursorwidth: "5px", // 滚动条的宽度，单位：便素
		cursorborder: "3px solid #ddd", // CSS方式定义滚动条边框
		cursorborderradius: "5px", // 滚动条圆角（像素）
		zindex: "auto", // 改变滚动条的DIV的z-index值
		scrollspeed: 60, // 滚动速度
		mousescrollstep: 40, // 鼠标滚轮的滚动速度 (像素)
		autohidemode: 'scroll',
		railoffset: true, // 可以使用top/left来修正位置
		railpadding: {
			top: 0,
			right: -25
		},
		horizrailenabled: false
	});
}

function layershow(title, w, dom, formDom) {
	if(typeof w == 'string') {
		var area = [w, 'auto'];
	} else {
		var area = w;
	};

	index = layer.open({
		type: 1,
		title: title,
		area: area,
		scrollbar: false,
		shadeClose: false,
		content: dom,
		btnAlign: 'c',
		success: function() {
			// for(var i = 0; i < dom.find("table th input[type='text']").size(); i++) {
			// 	dom.find("table th input[type='text']").eq(i).val("");
			// }

			$(".layclose,.cancle").on('click',
				function() {
					$(this).closest(".layui-layer").find(".layui-layer-setwin a").trigger("click");
				})
		}
	});
		
	if(typeof formDom == "undefined") {
	
			//$("form").find("input[type='text'],textarea,select").val('');
			//$("form").find("input[type='checkbox']").prop("checked", false);  
			$(".form-group").removeClass("has-success").removeClass('has-error');
			$(".input-icon").find('i').removeClass().addClass("fa");
			
	} else {
		if(formDom.is("form")) {
			formDom.find("input[type='text'],textarea,select").val('');
			formDom.find("input[type='checkbox']").prop("checked", false);  
			formDom.find(".form-group").removeClass("has-success").removeClass('has-error');
			formDom.find('.input-icon i').removeClass().addClass("fa");
		}
	}
}

function layermsg(title) {
	layer.msg(title, {
		time: 800
	});
}

// 表单信息的序列化获取
function getFormVal(formId){
    var values = {};
    formId.find("input,select,textarea").each(function(){
        var name = $(this).attr("name");
           values[name] = $(this).val();   
    });
    return(values);
}

function closeLayer(){
	$(".layui-layer-close").trigger("click");
}

//初始化select
function setselect(ele, data) {

	//		data: [
	//		{
	//			"key": "建筑类型一",
	//			"value": "1"
	//		}, {
	//			"key": "建筑类型二",
	//			"value": "2"
	//		}, {
	//			"key": "建筑类型三",
	//			"value": "3"
	//		}
	//	]

	if(ele.size() > 0) {
		for(i = 0; i < ele.size(); i++) {

			var optionhtml = '';
			for(var j = 0; j < data.length; j++) {
				optionhtml += '<option value="' + data[j].value + '">' + data[j].key + '</option>';
			}
			ele.eq(i).append(optionhtml)
		}
	}
}

//上传文件
function getMessage() {}

function uploadFile(pathsrc, ele,socketport) {
	debugger;
	var uploadpoint = ele;
	
	var oidStr = '';
	var nameStr = '';
	var objData = {};
	//###################socket方式访问start
	var url = 'http://localhost:' + socketport + "";
	$.ajax({
		url: url,
		type: "get",
		data: {
			"methodName": "uploadAndCreateFO",
			"userName": userName
		},
		cache: false,
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "getMessage",
		success: function(data) {
			objData = data;
			if(data.fileobjectoid == "null") {
				layer.msg("找不到该文件 " + '<br/>' + "请检查文件名是否正确，然后重试！");
			} else {
				$.ajax({
					type: "post",
					data: {
						"newfileobjoid": data.fileobjectoid,

					},
					url: pathsrc + "blm/file!createNewFileObj.action",
					dataType: "json",
					success: function(data) {
						
						if(data.data.length != 0) {
							
							oidStr ='';
							$.each(data.data, function(index, value) {
								var tname = '<em data-id="'+value.oid+'"><input type=""  value="' + value.filename + '" /><span class="fa fa-remove ml6 emRemove"></span></em>';
								uploadpoint.closest("form").find(".filegroup .filecont").append(tname);
							
							})
								$(".emRemove").unbind("click");
								$(".emRemove").click(function() {

									var that = $(this);
									$.ajax({
										type: "post",
										data: {
											"fileobjoid": that.closest("em").attr("data-id")
										},
										url: pathsrc + "blm/file!delfileobject.action",
										dataType: "json",
										success: function() {
											that.closest("em").remove();
										}
									})
								})
								
						
						
						} else {
							layer.msg("上传失败");
						}

					}
				})
			}

		},
		error: function() {
			alert("发生错误");
		}
	});
}

function loading(){
	$("body").append("<div class='loading'></div>")
}

function closeloading(){
	$("body .loading").remove();
}

// 时间格式化 start
function format(now, mask) {
	var d = now;
	var zeroize = function(value, length) {
		if(!length) length = 2;
		value = String(value);
		for(var i = 0,
					zeros = ''; i < (length - value.length); i++) {
			zeros += '0';
		}
		return zeros + value;
	};

	return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g,
		function($0) {
			switch($0) {
				case 'd':
					return d.getDate();
				case 'dd':
					return zeroize(d.getDate());
				case 'ddd':
					return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDate()];
				case 'dddd':
					return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDate()];
				case 'M':
					return d.getMonth() + 1;
				case 'MM':
					return zeroize(d.getMonth() + 1);
				case 'MMM':
					return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
				case 'MMMM':
					return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
				case 'yy':
					return String(d.getFullYear()).substr(2);
				case 'yyyy':
					return d.getFullYear();
				case 'h':
					return d.getHours() % 12 || 12;
				case 'hh':
					return zeroize(d.getHours() % 12 || 12);
				case 'H':
					return d.getHours();
				case 'HH':
					return zeroize(d.getHours());
				case 'm':
					return d.getMinutes();
				case 'mm':
					return zeroize(d.getMinutes());
				case 's':
					return d.getSeconds();
				case 'ss':
					return zeroize(d.getSeconds());
				case 'l':
					return zeroize(d.getSeconds(), 3);
				case 'L':
					var m = d.getMilliseconds();
					if(m > 99) m = Math.round(m / 10);
					return zeroize(m);
				case 'tt':
					return d.getHours() < 12 ? 'am' : 'pm';
				case 'TT':
					return d.getHours() < 12 ? 'AM' : 'PM';
				case 'Z':
					return d.toString().match(/[A-Z]+$/);
				// Return quoted strings with the surrounding quotes removed
				default:
					return $0.substr(1, $0.length - 2);
			}
		});
};
// 时间格式化 end

//左侧导航跟随滚动条的滑动 start
window.onscroll = function() {
	$(".main_head").css({
		"left": $(document).scrollLeft() * -1
	});
	var scrolltop = $(this).scrollTop();
	if(scrolltop > 0) {
		$(".returnBox").show();
	} else {
		$(".returnBox").hide();
	}

};
//左侧导航跟随滚动条的滑动 end

//nav 选择 s
$('body').on('click', '.nav-pills > li', function () {
	$(this).addClass('active').siblings('li').removeClass('active');
	$('.main-box').css({'marginLeft': '220px'});
});
//nav 选择 e