## 基于Bootstrap的模态框插件
[github](https://github.com/hzwy23/Hmodal)


	## 示例一 ,确认框
```javascript
	$.Hconfirm({

		#显示框的高度	
        height:"230px",

		#显示框的宽度
        width:"360px",

		#显示框中的内容
        body:"<span style='height: 100px;line-height: 100px;'>基于bootstrap的模态弹出框</span>",
		
		#点击确认时的回调函数
        callback:function(){console.log("submit")}

    })
```
## 示例二,弹出框
```javascript
    $.Hmodal({
        height:"420px",
        width:"600px",
        body:"<div><form>" +
            "<div>hello world 1</div>" +
            "<div>hello world 2</div>" +
            "<div class='h-modal-footer'>" +
            "<button class='btn btn-danger cancel'>关闭</button>" +
            "<button class='btn btn-primary submit'>提交</button></div>" +
            "</form></div>",
    })
```
>Hmodal函数会主动将h-modal-footer中的内容添加到弹出框的底部
>button中添加cancel类,Hmodal会主动绑定关闭弹出窗口
>button中添加submit类,会绑定submit默认的提交方式,如果在Hmodal参数中指定callback函数,则会执行回调函数

##可供选择参数:

		#回调函数
        callback : "",

        #预处理程序
        preprocess: "",

        #弹出框宽度
        width:"360px",

        #弹出框高度
        height:"230px ",

		#弹出框标题
        header:"弹框信息",

        #弹出框标题栏高度
        headerHeight:"30px",

        #弹出框背景色
        headerColor :"#31708f",

        #弹出框标题栏字体大小
        headerFontSize:"14px",

        #弹出框标题栏字体颜色
        headerFontColor:"white",

        #弹框内容
        body:"",