//----------------------------------------------------------------------------------
// 1.亦庄系统得分滚动图 && 廊坊系统得分滚动图 
//----------------------------------------------------------------------------------

function defengundongtuFn() {
    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/xitonggundongtu.json',
            type: 'GET',
            dataType: 'json'
        })
        .done(function(datajson) {
            var LFDATA = {};
            var YZDATA = {};
            var yz_html = "";
            var lf_html = "";
            var swiper;

            YZDATA = datajson.data.yz;
            LFDATA = datajson.data.lf;

            // 亦庄数据长度
            var yzLength = YZDATA.length;
            // 廊坊数据长度
            var lfLength = LFDATA.length;
            // 取最大长度
            var maxNum = Math.max(yzLength, lfLength);

            // console.log(YZDATA);
            // console.log(LFDATA);


            $('ul.swiper-wrapper').html("");
            for (var i = 0; i < maxNum; i++) {
                // 亦庄 填充文字
                var yz_context = YZDATA[i % yzLength].sys_name;
                // 廊坊 填充文字
                var lf_context = LFDATA[i % lfLength].sys_name;

                // 亦庄 状态圆形显示颜色
                var yz_status = YZDATA[i % yzLength].priority;
                // 廊坊 状态圆形显示颜色
                var lf_status = LFDATA[i % lfLength].priority;

                // 亦庄 数字
                var yz_num = YZDATA[i % yzLength].za_system_id;
                // 廊坊 数字
                var lf_num = LFDATA[i % yzLength].za_system_id;



                var yz_html = '<div class="left-data"><span class="infor-' + yz_status + '"></span><span class="swiper-context">' + yz_context + '</span>' + '<span class="swipter-number">' + yz_num + '</span>' + '</div>';
                var lf_html = '<div class="right-data"><span class="infor-' + lf_status + '"></span><span class="swiper-context">' + lf_context + '</span>' + '<span class="swipter-number">' + lf_num + '</span>' + '</div>';
                var html = yz_html + lf_html;
                $("<li />", {
                    html: html,
                    'class': 'swiper-slide'
                }).appendTo('ul.swiper-wrapper');
            }
            if (swiper) {
                swiper.destroy();
            }
            swiper = new Swiper('.swiper-container', {
                direction: 'vertical',
                loop: true, // 环路
                slidesPerView: 5, //每页显示条数
                simulateTouch: true, //鼠标拖动事件
                autoplay: {
                    delay: 8000,
                    disableOnInteraction: false,
                }
            });

        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

}

defengundongtuFn();

//----------------------------------------------------------------------------------
// 2.各级别告警内容TOP5 
//----------------------------------------------------------------------------------

function gaojingneirongFn() {
    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/xitonggaojingneirongtop5.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {
            var gjnr_html = "";
            $.each(datajson.data, function(index, val) {
                var i = index + 1;
                gjnr_html += '<div class="gjnr_list"> <i class="gjnr_i">' + i + '</i> <span class="gjnr_span">' + val.description + '</span> <u class="gjnr_u"> ' + val.cons + '</u> </div>';
            });

            $(".gjnr_body").append(gjnr_html);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}

gaojingneirongFn();


//----------------------------------------------------------------------------------
// 3.系统名称 
//----------------------------------------------------------------------------------

function xitongmingchengFn() {
    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/xitongjibiegaojingshuliang.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {
            $.each(datajson.data, function(index, val) {
                switch (val.priority) {
                    case 1:
                        // 信息
                        $("#xinxi span").text(val.count);
                    case 2:
                        // 轻微
                        $("#qingwei span").text(val.count);
                    case 3:
                        // 一般
                        $("#yiban span").text(val.count);
                    case 4:
                        // 重要
                        $("#zhongyao span").text(val.count);
                    case 5:
                        // 紧急
                        $("#jinji span").text(val.count);
                    default:
                        break;
                }
            });
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

}

xitongmingchengFn();

//----------------------------------------------------------------------------------
// 4.各级别告警占比 
//----------------------------------------------------------------------------------

function gaojingzhanbi() {
    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/xitongjibiegaojingshuliang.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {

            var dataArray = [];
            var sum = 0;

            $.each(datajson.data, function(index, val) {
                sum += parseInt(val.count);
            });

            $.each(datajson.data, function(index, val) {

                dataArray.push({
                    "value": val.count,
                    "name": (function() {
                        switch (val.priority) {
                            case 1:
                                // 信息
                                return "信息: ";
                            case 2:
                                // 轻微
                                return "轻微: ";
                            case 3:
                                // 一般
                                return "一般: ";
                            case 4:
                                // 重要
                                return "重要: ";
                            case 5:
                                // 紧急
                                return "紧急: ";
                            default:
                                break;
                        }
                    })(val.priority)
                })
            });

            function echartsPieInit() {
                var gaojingzhanbi_echarts = echarts.init($("#gaojingzhanbi-echarts")[0]);
                var option = {
                    series: [{
                        type: 'pie',
                        minAngle: 40,
                        radius: ' 55%',
                        roseType: 'radius',
                        center: ['50%', '50%'],
                        labelLine: {
                            normal: {
                                length: -5,
                                show: true
                            }
                        },
                        label: { //饼图图形上的文本标签
                            normal: {
                                show: true,
                                position: 'outer', //标签的位置
                                textStyle: {
                                    fontWeight: 300,
                                    fontSize: 16 //文字的字体大小
                                },
                                formatter: '{b}' + '{d}%'
                            }
                        },
                        color: ['rgb(236, 134, 81)', 'rgb(255, 101, 218)', 'rgb(54, 116, 233)', 'rgb(86, 207, 236)', 'rgb(194, 194, 49)'],
                        data: dataArray
                    }]
                }
                gaojingzhanbi_echarts.setOption(option);
            }

            echartsPieInit();
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

}

gaojingzhanbi();


//----------------------------------------------------------------------------------
// 5.各级别告警占比 
//----------------------------------------------------------------------------------
function lfDataInit() {
    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/biaoge.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {
            var n = 42; // 每页显示的数据条数
            var lf_length = datajson.data.lf.length; // 廊坊数据长度
            var lf_parent = 'xtlb_lf_';
            (function addParent() {
                if ((lf_length / n) > Math.floor(lf_length / n)) {
                    for (var i = 0; i <= Math.floor(lf_length / n); i++) {
                        var add_lf_parent = lf_parent + i;
                        $('<div id = "' + add_lf_parent + '" class="xtlb_list"/ >').appendTo("#xitongliebiao");
                    }
                } else if ((lf_length / n) == Math.floor(lf_length / n)) {
                    for (var i = 0; i < Math.floor(lf_length); i++) {
                        $('<div id = "' + add_lf_parent + '" class="xtlb_list"/ >').appendTo("#xitongliebiao");
                    }
                }
            })();
            $.each(datajson.data.lf, function(index, val) {
                var parent_name = "#" + lf_parent + Math.floor(index / n);
                $('<div />', {
                    html: val.sys_name,
                    'class': 'xtlb_item',
                }).appendTo(parent_name);
            });

        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}


function yzDataInit() {
    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/biaoge.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {
            var n = 42; // 每页显示的数据条数
            var yz_length = datajson.data.yz.length; // 廊坊数据长度
            var yz_parent = 'xtlb_yz_';
            (function addParent() {
                if ((yz_length / n) > Math.floor(yz_length / n)) {
                    for (var i = 0; i <= Math.floor(yz_length / n); i++) {
                        var add_yz_parent = yz_parent + i;
                        $('<div id = "' + add_yz_parent + '" class="xtlb_list"/ >').appendTo("#xitongliebiao");
                    }

                } else if ((yz_length / n) == Math.floor(yz_length / n)) {
                    for (var i = 0; i < Math.floor(yz_length); i++) {
                        $('<div id = "' + add_yz_parent + '" class="xtlb_list"/ >').appendTo("#xitongliebiao");
                    }
                }
            })();
            $.each(datajson.data.yz, function(index, val) {
                var parent_name = "#" + yz_parent + Math.floor(index / n);
                $('<div />', {
                    html: val.sys_name,
                    'class': 'xtlb_item',
                }).appendTo(parent_name);
            });
            $("#xtlb_yz_0").css("display", "grid");

            addPageNumber("yz");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}


// 添加页码
function addPageNumber(name) {
    $('#xtlb_page').html("");
    var dom = "[id^='xtlb_" + name + "_']";
    var pagenum = $(dom).length;
    for (var i = 1; i <= pagenum; i++) {
        $('<span>', {
            'class': 'page_list',
            'html': i
        }).appendTo('#xtlb_page');

        $(".page_list").eq(0).addClass("active");
    }
}


function subPageClick() {
    $("body").on("click",".page_list",function(){
        var indexPageNum = $(this).index();
        var idName = $("#xtlb_title > span.active").attr("id").replace("xtlb_","");
        $(".xtlb_list").css("display","none");
        $("#xtlb_"+ idName +"_" + indexPageNum).css("display","grid");
    })
}

(function xtlbInit (){
    lfDataInit();
    yzDataInit();

    $('#xtlb_title > span').click(function(){
        $('#xtlb_title > span').removeClass("active");
        $(this).addClass("active");
        var idName = $(this).attr("id").replace("xtlb_","");
        addPageNumber(idName);
        $(".xtlb_list").css("display","none");
        $("#xtlb_"+ idName +"_0").css("display","grid");

    })
    subPageClick();
})();