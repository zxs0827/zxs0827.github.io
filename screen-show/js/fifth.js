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
            console.log("success");
            console.log(datajson);

            var getNumber = datajson.data.length ;
            alert(getNumber);

            if(maxLiNumber >= getNumber) {
            	$("#xtlb_body").css("height", getNumber*singleHeight);
            	swiperInit(getNumber);
            } else {
            	$("#xtlb_body").css("height", maxLiNumber*singleHeight);
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
    function setContext(data){
    	$.each(data, function(index, val) {
    		 /* iterate through array or object */
    		 $('<div />',{
    		 	'class' : 'xtlb_li swiper-slide',
    		 	'html' : '',
    		 }).appendTo('.swiper-wrapper')
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