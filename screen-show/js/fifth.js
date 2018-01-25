//----------------------------------------------------------------------------------
// 1.xtlb 系统列表
//----------------------------------------------------------------------------------

function xtlbInit() {
    var maxLiNumber = 15;
    var pageShowNumber = 0;
    var singleHeight = 30;


    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/xtlb.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {

            var getNumber = datajson.data.length ;
            if(maxLiNumber >= getNumber) {
            	$("#xtlb_body").css("height", getNumber*singleHeight);
            	setContext(datajson.data);
            	swiperInit(getNumber);
            } else {
            	$("#xtlb_body").css("height", maxLiNumber*singleHeight);
            	setContext(datajson.data);
            	swiperInit(maxLiNumber);
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

    // 滚动内容
    function setContext(datajson){
    	$.each(datajson, function(index, val) {
    		 /* iterate through array or object */
    		 var htmlStr = '<span class="xtlb_xtmc">'+val.sys_name+'</span>' + '<span class="xtlb_wlj">' + val.physics +'</span>' + '<span class="xtlb_xnj">'+val.fictitious+'</span>' +'<span class="xtlb_zj">'+val.host+'</span>';
    		 $('<div />',{
    		 	'class' : 'xtlb_li swiper-slide',
    		 	'html' : htmlStr,
    		 }).appendTo('.swiper-wrapper');
    	});
    }

    // 滚动初始化
    function swiperInit(number) {
        var swiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            loop: true, // 环路
            slidesPerView: number, //每页显示条数
            simulateTouch: false, //鼠标拖动事件
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            }
        });
    }

}

xtlbInit();