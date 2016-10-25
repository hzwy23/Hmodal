(function($){
    $.extend({
        Hmodal:function(param){
            var __DEFAULT = {
                callback : "",
                preprocess: "",
                width:"600px",
                height:"230px ",

                header:"弹框信息",
                headerHeight:"30px",
                headerColor :"#31708f",
                headerFontSize:"14px",
                headerFontColor:"white",

                body:"",
            }
            $.extend(true,__DEFAULT,param)

            //初始化弹框主体
            function init(){
                var mframe='<div class="modal-dialog">'+
                    '<div class="modal-content" style="border: '+__DEFAULT.headerColor+' solid 2px; width: '+__DEFAULT.width+'; height: '+__DEFAULT.height+';">'+
                    '<div class="modal-header" style="background-color: '+__DEFAULT.headerColor+'; height: '+__DEFAULT.headerHeight+'; line-height: '+__DEFAULT.headerHeight+'; padding: 0px;">'+
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="height: '+__DEFAULT.headerHeight+'; line-height: '+__DEFAULT.headerHeight+'; width: 30px; padding: 0px; margin-top: 1px;">×</button>'+
                    '<h4 class="modal-title" style="margin-left: 15px;height: '+__DEFAULT.headerFontSize+';color: '+__DEFAULT.headerFontColor+'; line-height: '+__DEFAULT.headerHeight+';font-weight: 600; font-size: '+__DEFAULT.headerFontSize+'">'+__DEFAULT.header+'</h4>'+
                    '</div>'+
                    '<div class="modal-body" style="width: '+__DEFAULT.width+'; overflow-y: auto">'+__DEFAULT.body+'</div>'+
                    '<div class="modal-footer btn-group-sm">'+
                    '<button type="button" class="btn btn-danger cancel" data-dismiss="modal">关闭</button>'+
                    '<button type="button" class="btn btn-primary submit">提交</button>'+
                    '</div>' +
                    '</div>' +
                    '</div>';
                return mframe;
            }

            //显示弹出框
            function showModal(mframe){
                var hmod=document.createElement("div");
                $(hmod).addClass("modal fade").attr({
                    "tabindex":"-1",
                    "role":"dialog",
                    "aria-labelledby":"myModalLabel",
                    "aria-hidden":"true",
                })
                hmod.innerHTML=mframe;
                document.body.appendChild(hmod);
                $(hmod).modal({backdrop:false});
                $(hmod).modal("show");
                return hmod
            }

            //根据类获取对象实例
            function getObj(mod,className,typeObj){
                if (typeof typeObj == "undefined"){
                    typeObj = "div"
                }
                var obj = {}
                $(mod).find(typeObj).each(function(index,element){
                    if ($(element).hasClass(className)){
                        obj = element
                    }
                })
                return obj
            }

            //调节body高度和宽度
            function modifyBodyHeightAndWidth(mod){
                var headerObj = getObj(mod,"modal-header")
                var contentObj = getObj(mod,"modal-content")
                var bodyObj = getObj(hmode,"modal-body")
                var headHeight = $(headerObj).height()
                var contentHeight = $(contentObj).height()

                $(bodyObj).css("height",contentHeight-headHeight-65)
                $(bodyObj).css("width","-=4")
            }

            //modify location
            function modifyLocation(mod){
                var ww = $(window).width()
                var wh = $(window).height();
                var mw = $(getObj(mod,"modal-content")).width()
                var mh = $(getObj(mod,"modal-content")).height()
                var modifyY = (wh - mh)/2
                var modifyX = (ww - mw)/2
                $(getObj(mod,"modal-content")).offset({left:modifyX})

            }

            //
            var mframe =  init()
            var hmode = showModal(mframe)
            modifyBodyHeightAndWidth(hmode)
            modifyLocation(hmode)
            //close modal when click close button in right header
            $(getObj(hmode,"modal-header")).find("button").on("click",function(){
                $(hmode).remove();
            })

            // init footer
            //
            var footer = $(getObj(hmode,"modal-body")).find(".h-modal-footer")
            if ($(footer).find("button").html()==""){
                console.log("can not found button in modal body content")
                $(getObj(getObj(hmode,"modal-footer"),"submit","button")).on("click",function(){
                    console.log("no button found, default submit")
                    $(hmode).remove()
                })
                $(getObj(getObj(hmode,"modal-footer"),"cancel","button")).on("click",function(){
                    console.log("no button found, default cancel")
                    $(hmode).remove()
                })
            }else{
                $(getObj(hmode,"modal-footer")).html($(footer).html())
                $(footer).remove()
                if (__DEFAULT.callback == ""){
                    $(getObj(getObj(hmode,"modal-footer"),"submit","button")).on("click",function(){
                        console.log("no callback found, default submit")
                        $(hmode).remove()
                    })
                    $(getObj(getObj(hmode,"modal-footer"),"cancel","button")).on("click",function(){
                        console.log("no callback found, default cancel")
                        $(hmode).remove()
                    })
                }else if (typeof __DEFAULT.callback == "function"){
                    $(getObj(getObj(hmode,"modal-footer"),"cancel","button")).on("click",function(){
                        console.log("defined callback, cancel")
                        $(hmode).remove()
                    })
                    $(getObj(getObj(hmode,"modal-footer"),"submit","button")).on("click",function(){
                        console.log("defined callback, submit")
                        __DEFAULT.callback()
                    })
                }
            }

            // preprocess function
            if (typeof  __DEFAULT.preprocess == "function"){
                __DEFAULT.preprocess()
            }


            // 拖动绑定
            var d = "getSelection" in window?function(){
                window.getSelection().removeAllRanges()
            }:function(){
                document.selection.empty()
            };

            var f=0,c=0,e=0,b=0,a=0;
            $(getObj(hmode,"modal-header")).bind("mousemove",function(h){
                if(a==1){
                    f=h.pageX-e;
                    c=h.pageY-b;
                    if(c<=0){
                        c=0
                    }
                    $(this).parent().offset({left:f,top:c})
                }
            }).bind("mousedown",function(h){
                d();
                e=h.pageX-$(this).parent().offset().left;
                b=h.pageY-$(this).parent().offset().top;
                a=1;
                $(getObj(hmode,"modal-header")).css({"cursor":"move"})}
            ).bind("mouseup",function(h){
                $(getObj(hmode,"modal-header")).css({"cursor":"default"});
                a=0;
                e=0;
                b=0
            }).bind("mouseleave",function(h){
                a=0;
                $(getObj(hmode,"modal-header")).css({"cursor":"default"})
            })
        },
        Hconfirm:function(param){
            var __DEFAULT = {
                callback : "",
                preprocess: "",
                width:"360px",
                height:"230px ",

                header:"弹框信息",
                headerHeight:"30px",
                headerColor :"#31708f",
                headerFontSize:"14px",
                headerFontColor:"white",
                body:"",
                footer:"",
            }
            $.extend(true,__DEFAULT,param)

            //初始化弹框主体
            function init(){
                var mframe='<div class="modal-dialog">'+
                    '<div class="modal-content" style="border: '+__DEFAULT.headerColor+' solid 2px; width: '+__DEFAULT.width+'; height: '+__DEFAULT.height+';">'+
                    '<div class="modal-header" style="background-color: '+__DEFAULT.headerColor+'; height: '+__DEFAULT.headerHeight+'; line-height: '+__DEFAULT.headerHeight+'; padding: 0px;">'+
                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="height: '+__DEFAULT.headerHeight+'; line-height: '+__DEFAULT.headerHeight+'; width: 30px; padding: 0px; margin-top: 1px;">×</button>'+
                    '<h4 class="modal-title" style="margin-left: 15px;height: '+__DEFAULT.headerFontSize+';color: '+__DEFAULT.headerFontColor+'; line-height: '+__DEFAULT.headerHeight+';font-weight: 600; font-size: '+__DEFAULT.headerFontSize+'">'+__DEFAULT.header+'</h4>'+
                    '</div>'+
                    '<div class="modal-body" style="width: '+__DEFAULT.width+'; overflow-y: auto">'+__DEFAULT.body+'</div>'+
                    '<div class="modal-footer btn-group-sm">'+
                    '<button type="button" class="btn btn-danger cancel" data-dismiss="modal">关闭</button>'+
                    '<button type="button" class="btn btn-primary submit">提交</button>'+
                    '</div>' +
                    '</div>' +
                    '</div>';
                return mframe;
            }

            //显示弹出框
            function showModal(mframe){
                var hmod=document.createElement("div");
                $(hmod).addClass("modal fade").attr({
                    "tabindex":"-1",
                    "role":"dialog",
                    "aria-labelledby":"myModalLabel",
                    "aria-hidden":"true",
                })
                hmod.innerHTML=mframe;
                document.body.appendChild(hmod);
                $(hmod).modal({backdrop:false});
                $(hmod).modal("show");
                return hmod
            }

            //根据类获取对象实例
            function getObj(mod,className,typeObj){
                if (typeof typeObj == "undefined"){
                    typeObj = "div"
                }
                var obj = {}
                $(mod).find(typeObj).each(function(index,element){
                    if ($(element).hasClass(className)){
                        obj = element
                    }
                })
                return obj
            }

            //调节body高度和宽度
            function modifyBodyHeightAndWidth(mod){
                var headerObj = getObj(mod,"modal-header")
                var contentObj = getObj(mod,"modal-content")
                var bodyObj = getObj(hmode,"modal-body")
                var headHeight = $(headerObj).height()
                var contentHeight = $(contentObj).height()

                $(bodyObj).css("height",contentHeight-headHeight-65)
                $(bodyObj).css("width","-=4")
            }

            //modify location
            function modifyLocation(mod){
                var ww = $(window).width()
                var wh = $(window).height();
                var mw = $(getObj(mod,"modal-content")).width()
                var mh = $(getObj(mod,"modal-content")).height()
                var modifyY = (wh - mh)/2
                var modifyX = (ww - mw)/2
                $(getObj(mod,"modal-content")).offset({left:modifyX})
            }


            //
            var mframe =  init()
            var hmode = showModal(mframe)
            modifyBodyHeightAndWidth(hmode)
            modifyLocation(hmode);
            //close modal when click close button in right header
            $(getObj(hmode,"modal-header")).find("button").on("click",function(){
                $(hmode).remove();
            })


            // init footer
            //
            var footer = $(getObj(hmode,"modal-body")).find(".h-modal-footer")
            if ($(footer).find("button").html()==""){
                console.log("can not found button in modal body content")
                $(getObj(getObj(hmode,"modal-footer"),"submit","button")).on("click",function(){
                    console.log("no button found, default submit")
                    $(hmode).remove()
                })
                $(getObj(getObj(hmode,"modal-footer"),"cancel","button")).on("click",function(){
                    console.log("no button found, default cancel")
                    $(hmode).remove()
                })
            }else{
                $(getObj(hmode,"modal-footer")).html($(footer).html())
                $(footer).remove()
                if (__DEFAULT.callback == ""){
                    $(getObj(getObj(hmode,"modal-footer"),"submit","button")).on("click",function(){
                        console.log("no callback found, default submit")
                        $(hmode).remove()
                    })
                    $(getObj(getObj(hmode,"modal-footer"),"cancel","button")).on("click",function(){
                        console.log("no callback found, default cancel")
                        $(hmode).remove()
                    })
                }else if (typeof __DEFAULT.callback == "function"){
                    $(getObj(getObj(hmode,"modal-footer"),"cancel","button")).on("click",function(){
                        console.log("defined callback, cancel")
                        $(hmode).remove()
                    })
                    $(getObj(getObj(hmode,"modal-footer"),"submit","button")).on("click",function(){
                        console.log("defined callback, submit")
                        __DEFAULT.callback()
                    })
                }
            }

            // preprocess function
            if (typeof  __DEFAULT.preprocess == "function"){
                __DEFAULT.preprocess()
            }


            // 拖动绑定
            var d = "getSelection" in window?function(){
                window.getSelection().removeAllRanges()
            }:function(){
                document.selection.empty()
            };

            var f=0,c=0,e=0,b=0,a=0;
            $(getObj(hmode,"modal-header")).bind("mousemove",function(h){
                if(a==1){
                    f=h.pageX-e;
                    c=h.pageY-b;
                    if(c<=0){
                        c=0
                    }
                    $(this).parent().offset({left:f,top:c})
                }
            }).bind("mousedown",function(h){
                d();
                e=h.pageX-$(this).parent().offset().left;
                b=h.pageY-$(this).parent().offset().top;
                a=1;
                $(getObj(hmode,"modal-header")).css({"cursor":"move"})}
            ).bind("mouseup",function(h){
                $(getObj(hmode,"modal-header")).css({"cursor":"default"});
                a=0;
                e=0;
                b=0
            }).bind("mouseleave",function(h){
                a=0;
                $(getObj(hmode,"modal-header")).css({"cursor":"default"})
            })
        }
    })
}(jQuery));
