## 基于Bootstrap的模态框插件
[github](https://github.com/hzwy23/Hmodal)

```javascript
	## 示例一 ,确认框
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


	## 示例二,弹出框
	$.Hmodal({

		#弹出框高度
        height:"420px",

        #弹出框宽度
        width:"600px",

        #弹出框中内容
        body:"<div><span>hello world</span></div>",
    })
```

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