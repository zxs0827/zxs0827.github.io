$(document).ready(function() {
    alarmCount();
    gjzszsInit();
    getHostTop();
    getObjectTop();
    BubbleChar('');
    getTodayAlarmlist();
    alarmUnconFirmedInit();
    jfcpuzsxtfbbtInit();
    cpinccpInit();
    getHost();
    getZiYuan();
    zjztInit();
});
//-----------------------------------------------------------------------------------------
// 各级别告警数量统计
//-----------------------------------------------------------------------------------------
function alarmCount(){ 
    $.getJSON('json/alarmStatistics.json', function(datajson, textStatus) {
        console.log(datajson);
        $("#a_jinji .a_smallfont").text(datajson.data.zjj);
        $("#a_zhongyao .a_smallfont").text(datajson.data.zzy);
        $("#a_yiban .a_smallfont").text(datajson.data.zyb);
        $("#a_yz_sltj .a_bigfont").text(datajson.data.count);
    });
}
//-----------------------------------------------------------------------------------------
// 告警总数走势折线图
//-----------------------------------------------------------------------------------------
function gjzszsInit() {
    function echartsInit(data) {
        var gjzszs_echarts = echarts.init(document.getElementById("gjzszs-echarts"));
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var xData = [];
        var yData = [];
        var lineCount = 0;
        var lineNum = 24;
        $.each(data, function(index, val) {
            data1.push(val.clock.substring(11, 16));
            data2.push(val.cons);
            data3.push(val.clock);
        });
        xData = data1.slice(lineCount, lineCount + lineNum);
        yData = data2.slice(lineCount, lineCount + lineNum);
        var maxNum = Math.max.apply({}, data2);
        if (maxNum % 50 > 0) {
            maxNum = Math.ceil(maxNum / 50) * 50;
        }
        var option = {
            grid: {
                width: '80%',
            },
            xAxis: [{
                // name: '时间',
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    show: true
                },
                axisLabel: {
                    fontSize: 10,
                    interval: 0,
                    rotate: -30
                } ,
                data: xData
            }],
            yAxis: [{
                type: 'value',
                scale: true,
                name: '     告警数量 / 时间',
                // max: maxNum,
                min: 0,
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    show: true
                },
                splitLine : {
                    show: true,
                    lineStyle : {
                        color : 'rgba(255,255,255,0.1)',
                    }
                },
                boundaryGap: [0.2, 0.2]
            }],
            series: [{
                type: 'line',
                itemStyle: {
                    normal: {
                        color: 'rgba(255, 255, 255,0.6)',
                        shadowBlur: 10,
                        shadowColor: 'white'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(107, 107, 255,0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 230, 255, 0.4)'
                        }])
                    }
                },
                symbolSize: 8,
                data: yData
            }]
        };
        gjzszs_echarts.setOption(option);
        gjzszs_echarts.on('click', function (param) {
            for (var i = 0; i < data3.length; i++) {
                if(data3[i].indexOf(param.name)=="11"){
                    $('#bgPop_gj,#pop_gj').show();
                    var time = $('#query_time').val(data3[i]);
                    query24Alarm(data3[i]);
                }
            }
        });
        setInterval(function(){
            gjzszs_echarts.clear();
            gjzszs_echarts.setOption(option);
        }, 20000);
    }
    $.ajax({
        url: "json/getsygj.json",
        type: "get",
        dataType: "json",
    })
        .done(function(datajson) {
            echartsInit(datajson.data);
        })
}
//----------------------------------------------------------------------------------
// 告警对象/主机TOP5
//----------------------------------------------------------------------------------
// 告警主机
function getHostTop() {
    $.ajax({
        type: "GET",
        url: "json/hostTop.json",
        dataType: "json",
        success: function(datajson){
            var $li =  $("#gjdxzjtop5-items").find("li");
            var max = datajson.data[0].alarmnum;
            $.each(datajson.data, function(index, val) {
                $li.eq(index).children('.gjdxzjtop5-name').text(val.host);
                $li.eq(index).children('.gjdxzjtop5-name').prop("title", val.sys_name);
                $li.eq(index).children('.gjdxzjtop5-persent').text(val.alarmnum);
                var setWidth = ((val.alarmnum / max)*100) + '%' ; 
                $li.eq(index).children('.gjdxzjtop5-bar').find('i').css('width', setWidth );
            });
        }
    });
}
// 告警对象
function getObjectTop() {
    $.ajax({
        type: "GET",
        url: "json/ObjectTop.json",
        dataType: "json",
        success: function(datajson){
            var $li =  $("#gjdxzjtop5-items-obj").find("li");
            var max = datajson.data[0].alarmnum;
            $.each(datajson.data, function(index, val) {
                $li.eq(index).children('.gjdxzjtop5-name').text(val.description);
                $li.eq(index).children('.gjdxzjtop5-name').prop("title",+val.description);
                $li.eq(index).children('.gjdxzjtop5-persent').text(val.alarmnum);
                var setWidth = ((val.alarmnum / max)*100) + '%' ; 
                $li.eq(index).children('.gjdxzjtop5-bar').find('i').css('width', setWidth );
            });
        }
    });
}
// 单击切换
$("#gjdxzjtop5-list > span").click(function(event) {
    $("#gjdxzjtop5-list > span").removeClass("active");
    $(this).addClass("active");
    if($(this).index() == 0) {
        $("#gjdxzjtop5-items").css("display","block");
        $("#gjdxzjtop5-items-obj").css("display","none");
    }else if($(this).index() == 1){
        $("#gjdxzjtop5-items-obj").css("display","block");
        $("#gjdxzjtop5-items").css("display","none");
    }
});
//----------------------------------------------------------------------------------
// 各级别告警分布图
//----------------------------------------------------------------------------------
function BubbleChar (arg) {
    $("#gjbgjfbt-data").empty();

    var format = d3.format(",d"),
    color = d3.scale.category20c();
    // color = ['#e24647','#eef13a','#ea42c2','#47b73b','#4a40e9','#427cea','#99306f','#652f98','#72b836'];

    var bubble = d3.layout.pack()
        .sort(null)
        .size([320, 260])
        .padding(1.5);

    var svg = d3.select("#gjbgjfbt-data").append("svg")
        .attr("width", 320)
        .attr("height", 260)
        .attr("class", "bubble");

    d3.json("json/AlarmFBT" + arg + ".json", function(error, root) {
    // d3.json("https://zxs0827.github.io/web-back/JSON/AlarmFBT.json", function(error, root) {
    // d3.json("${ctx}/exhibition/AlarmFBT" + arg, function(error, root) {
      var node = svg.selectAll(".node")
          .data(bubble.nodes(classes(root))
          .filter(function(d) { return !d.children; }))
        .enter().append("g")
          .attr("class", "node")
          // .attr("transform", function(d) { return "translate(" + (Math.round(d.x) + 5)  + "," + (Math.round(d.y)+5) + ")"; });
          .attr("transform", function(d) { return "translate(" + d.x  + "," + d.y + ")"; });
        // Coordinates calculated by D3 layout, need to actually use them yourself!

      // node contains a selection of positioned groups - time to fill them!
      
      node.append("title") // Tooltip
          .text(function(d) { return d.className + ": " + format(d.value); });

      node.append("circle")
          .attr("r", function(d) { return d.r; }).style("fill", function(d) { return color(d.packageName); });

      node.append("text") // The label
          .attr("dy", ".5ex")
          .style("text-anchor", "middle") // CSS styling
          .style("text-decoration", "none")
          .style("font-family", "sans-serif")
          .text(function(d) { return d.className.substring(0, d.r / 3); });

      node.append("text") // The label
          .attr("dy", "3ex")
          .style("text-anchor", "middle") // CSS styling
          .style("text-decoration", "none")
          .style("font-family", "sans-serif")
          .text(function(d) { return format(d.value) == 0 ? "" : format(d.value); });

    });

    function classes(root) {
      var classes = [];
      root.data.forEach(function(i,k){
        classes.push({packageName: "tongjishuju", className: i.name, value: i.size});
      })
      return {children: classes};
    }
}

$("#gjbgjfbt-navigation > ul > li").click(function(){
    $("#gjbgjfbt-navigation > ul > li").removeClass("active");
    $(this).addClass('active');

    switch ($(this).index()) {
        case 0:
            BubbleChar("");
            break;
        case 1:
            BubbleChar("_priority5");
            break;
        case 2:
            BubbleChar("_priority4");
            break;
        case 3:
            BubbleChar("_priority3");
            break;
        default:
            break;
    }
})

//----------------------------------------------------------------------------------
// 当日告警列表
//----------------------------------------------------------------------------------

function getTodayAlarmlist () {

    $.ajax({
        url: 'json/TodayAlarmlist.json',
        type: 'GET',
        dataType: 'json',
    })
    .done(function(datajson) {
        // 时间类型转换
        function timestampToTime(timestamp,bj) {
            var date = new Date(timestamp);
            Y = date.getFullYear() + '-';
            M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            D = date.getDate()<10 ? '0'+date.getDate():date.getDate();
            h = (date.getHours()<10 ? '0'+date.getHours():date.getHours())+ ':';
            m = (date.getMinutes()<10? '0'+date.getMinutes():date.getMinutes()) + ':';
            s = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
            if(bj){
                return Y+M+D;
            }else{
                return h+m+s;
            }
        }

        $("#drgjlb-ul").empty();

        var weichuli = 0,yichuli = 0;

        $.each(datajson.data.data, function(index, val) {
            var innerString = '<li class="drgjlb-li swiper-slide">';
                innerString += '<div class="drgjlb-timer">';
                innerString += '<div class="drgjlb-date">' + timestampToTime(val.event_time, 1) + '</div>';
                innerString += '<div class="drgjlb-hour">' + timestampToTime(val.event_time, 0) + '</div>';
                innerString += '</div>';
                innerString += '<div class="drgjlb-img"></div>';
                innerString += '<div class="drgjlb-host">';
                innerString += '<div class="drgjlb-host-name">' + val.hostname +'</div>';
                innerString += '<div class="drgjlb-ip">' + val.HOST + '</div>';
                innerString += '</div>';
                innerString += '<div class="drgjlb-state">';

                if( $.trim(val.flags) == '已恢复' ) {
                    innerString += '<div class="drgjlb-desc color5">' + val.flags + '</div>';
                    yichuli ++ ;
                }else {
                    switch (val.priority) {
                        case 3:
                            innerString += '<div class="drgjlb-desc color8">' + '一般' + '</div>'
                            break;
                        case 4:
                            innerString += '<div class="drgjlb-desc color7">' + '严重' + '</div>'
                            break;
                        case 5:
                            innerString += '<div class="drgjlb-desc color6">' + '紧急' + '</div>'
                            break;
                        default:
                            break;
                    }
                }

                innerString += '<div class="drgjlb-info">' + val.alarm_content + '</div>';
                innerString += '</div>';
                innerString += '</li>';
            $("#drgjlb-ul").append(innerString);
        }); 

        weichuli = datajson.data.wslcount;

        $("#drgjlb-wcl > span").text(weichuli);

        $("#drgjlb-ycl > span").text(yichuli);

        $("#drgjlb-qb > span").text(weichuli + yichuli);


        var TodayAlarmlistSwiper ;

    if(TodayAlarmlistSwiper) {
        TodayAlarmlistSwiper.destroy();
    }

    TodayAlarmlistSwiper = new Swiper('.swiper-container',{
        slidesPerView : 5,
        slidesPerGroup : 5,
        direction : 'vertical',
        grabCursor : true,
    });

    setTimeout(getTodayAlarmlist,60000);

    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });        
}

//----------------------------------------------------------------------------------
// 当前未受理告警
//----------------------------------------------------------------------------------
function alarmUnconFirmedInit(){
    $.ajax({
        url: "json/alarmUnconFirmed.json",
        type: 'GET',
        dataType: 'json',
    })
        .done(function(datajson) {
            Date.prototype.format = function(fmt) { 
                 var o = { 
                    "M+" : this.getMonth()+1,                 //月份 
                    "d+" : this.getDate(),                    //日 
                    "h+" : this.getHours(),                   //小时 
                    "m+" : this.getMinutes(),                 //分 
                    "s+" : this.getSeconds(),                 //秒 
                    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
                    "S"  : this.getMilliseconds()             //毫秒 
                }; 
                if(/(y+)/.test(fmt)) {
                        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
                }
                 for(var k in o) {
                    if(new RegExp("("+ k +")").test(fmt)){
                         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                     }
                 }
                return fmt; 
            }

            var options = {
                valueNames: [ 'sys_name', 'hostip', 'fuzeren','alarm_content','event_time','alarm_time_length','diqu'],
                item: '<tr><td class= "sys_name"></td> <td class="hostip"></td>  <td class="fuzeren"></td> <td class="alarm_content"></td> <td class="event_time"></td> <td class="alarm_time_length"></td> <td class="diqu"></td></tr>',
                page: 10,
                pagination: {
                    outerWindow: 1,
                    innerWindow: 1
                }
            };

            var values = datajson.rows;

            values.map(function(value){
                var date = new Date(value.event_time);
                value.event_time = date.format("yyyy-MM-dd hh:mm:ss");
                value.alarm_time_length =  formatSeconds(value.alarm_time_length);
                return value;
            })

            var hackerList = new List('dqwqrgj', options, values);

            function formatSeconds(value) { 
                var theTime = parseInt(value);// 秒 
                var theTime1 = 0;// 分 
                var theTime2 = 0;// 小时 
                var theTime3 = 0;//天
                theTime1 = parseInt(theTime/60); 
                theTime = parseInt(theTime%60); 
                theTime2 = parseInt(theTime1/60); 
                theTime1 = parseInt(theTime1%60); 
                theTime3 = parseInt(theTime2/24);
                theTime2 = parseInt(theTime2%24);
                if(theTime<10){
                    theTime = "0"+theTime;
                }
                if(theTime1<10){
                    theTime1 = "0"+theTime1;
                }
                if(theTime2<10){
                    theTime2 = "0"+theTime2;
                }
                if(theTime3<10){
                    theTime3 = "0"+theTime3;
                }
                var result = theTime3+"天 "+theTime2+"小时"+theTime1+"分"+theTime+"秒"; 
                return result; 
            } 

        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}

//----------------------------------------------------------------------------------
// 资源统计 | 这里因为使用了两个json，所以分两个方法
//----------------------------------------------------------------------------------
function toFixed2(num){
    return parseInt(num).toFixed(0);
}

function getZiYuan() {
    $.ajax({
        url: 'json/getZiYuan.json',
        type: 'GET',
        dataType: 'json',
    })
    .done(function(datajson) {
        console.log("success getZiYuan");
        // 总数
        $("#zytongji-cpusyl").find("u").text(toFixed2(datajson.data.all.sylcpu) + "%");
        $("#zytongji-ncsyl").find("u").text(toFixed2(datajson.data.all.sylneicun) + "%");
        $("#zytongji-cpsyl").find("u").text(toFixed2(datajson.data.all.sylyingpan) + "%");

        // 亦庄
        // CPU
        $("#zytongji-yz .zytongji-data2 .zytongji-percent").find("span").text(toFixed2(datajson.data.yz.shiyonglvCPU));
        $("#zytongji-yz .zytongji-data2 .bar-color").css("height",toFixed2(datajson.data.yz.shiyonglvCPU)+"%");
        //内存
        $("#zytongji-yz .zytongji-data3 .zytongji-percent").find("span").text(toFixed2(datajson.data.yz.shiyonglvNC));
        $("#zytongji-yz .zytongji-data3 .bar-color").css("height",toFixed2(datajson.data.yz.shiyonglvNC)+"%");
        // 硬盘
        $("#zytongji-yz .zytongji-data4 .zytongji-percent").find("span").text(toFixed2(datajson.data.yz.shiyonglvYP));
        $("#zytongji-yz .zytongji-data4 .bar-color").css("height",toFixed2(datajson.data.yz.shiyonglvYP)+"%");

        // 廊坊
        // CPU
        $("#zytongji-lf .zytongji-data2 .zytongji-percent").find("span").text(toFixed2(datajson.data.lf.shiyonglvCPU));
        $("#zytongji-lf .zytongji-data2 .bar-color").css("height",toFixed2(datajson.data.lf.shiyonglvCPU)+"%");
        //内存
        $("#zytongji-lf .zytongji-data3 .zytongji-percent").find("span").text(toFixed2(datajson.data.lf.shiyonglvNC));
        $("#zytongji-lf .zytongji-data3 .bar-color").css("height",toFixed2(datajson.data.lf.shiyonglvNC)+"%");
        // 硬盘
        $("#zytongji-lf .zytongji-data4 .zytongji-percent").find("span").text(toFixed2(datajson.data.lf.shiyonglvYP));
        $("#zytongji-lf .zytongji-data4 .bar-color").css("height",toFixed2(datajson.data.lf.shiyonglvYP)+"%");
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}


function getHost() {
    $.ajax({
        url: 'json/getHost.json',
        type: 'GET',
        dataType: 'json',
    })
    .done(function(datajson) {
        console.log("success getHost");

        $("#zytongji-sbsyl").find("u").text(toFixed2(datajson.data.zongbfb) + "%");

         $("#zytongji-yz .zytongji-data1 .zytongji-percent").find("span").text(toFixed2(datajson.data.yzbfb));
         $("#zytongji-yz .zytongji-data1 .bar-color").css("height",toFixed2(datajson.data.yzbfb)+"%");

         $("#zytongji-lf .zytongji-data1 .zytongji-percent").find("span").text(toFixed2(datajson.data.lfbfb));
         $("#zytongji-lf .zytongji-data1 .bar-color").css("height",toFixed2(datajson.data.lfbfb)+"%");

    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}



// 左右翻页

var currentPageNumber = 0;
var pageLength = $(".zytongji-div").length;
$(".change_page").click(function(){
    if($(this).attr("id") == "zytongji-left-btn"){
      currentPageNumber --;
       if(currentPageNumber <= 0) {
         currentPageNumber = 0;
       }
    } else if($(this).attr("id") == "zytongji-right-btn") {
      currentPageNumber ++;
      if(currentPageNumber >= pageLength) {
        currentPageNumber = pageLength - 1;
      }
    }
  $(".zytongji-div").css({
      "opacity" : "0",
      "z-index" : "1"
  });
  $(".zytongji-div").eq(currentPageNumber).css({
      "opacity" : "1",
      "z-index" : "99"
  });
  
})
//----------------------------------------------------------------------------------
//系统名称切换滚动
//----------------------------------------------------------------------------------
function cpinccpInit( ){
    //系统名称切换滚动
    $.ajax({
        type: "GET",
        url: "json/getxtCput.json",
        dataType: "json",
    })
        .done(function(datajson) {
            //系统名称
            var str = "<div id='pt1'>";
            $.each(datajson.data.lfcptop, function(index, val) {
                var a = index + 1
                str += "<div class='dsjpt" + a + "'>" + val.sys_name + "</div>"
            });
            str += "</div>";
            str += "<div id='pt2'>";
            $.each(datajson.data.lfcputop, function(index, val) {
                var a = index + 1
                str += "<div class='dsjpt" + a + "'>" + val.sys_name + "</div>"
            });
            str += "</div>";
            str += "<div id='pt3'>";
            $.each(datajson.data.lfnctop, function(index, val) {
                var a = index + 1
                str += "<div class='dsjpt" + a + "'>" + val.sys_name + "</div>"
            });
            str += "</div>";
            str += "<div id='pt4'>";
            $.each(datajson.data.yzcptop, function(index, val) {
                var a = index + 1
                str += "<div class='dsjpt" + a + "'>" + val.sys_name + "</div>"
            });
            str += "</div>";
            str += "<div id='pt5'>";
            $.each(datajson.data.yzcputop, function(index, val) {
                var a = index + 1
                str += "<div class='dsjpt" + a + "'>" + val.sys_name + "</div>"
            });
            str += "</div>";
            str += "<div id='pt6'>";
            $.each(datajson.data.yznctop, function(index, val) {
                var a = index + 1
                str += "<div class='dsjpt" + a + "'>" + val.sys_name + "</div>"
            });
            str += "</div>";
            $("#sys").html(str);

            var o0 = {
                'left': '50px',
                'transform': 'scale(0.5)',
                'z-index': '-10',
                'opacity': '0.3'
            }
            var o1 = {
                'left': '50px',
                'transform': 'scale(0.5)',
                'z-index': '0',
                'opacity': '0'
            };
            var o2 = {
                'left': '50px',
                'transform': 'scale(0.5)',
                'z-index': '0',
                'opacity': '0'
            };
            var o3 = {
                'left': '50px',
                'transform': 'scale(0.5)',
                'z-index': '0',
                'opacity': '0'
            };
            var o4 = {
                'left': '-50px',
                'transform': 'scale(0.5)',
                'z-index': '0',
                'opacity': '0.3'
            };
            var o5 = {
                'left': '0px',
                'transform': 'scale(1)',
                'z-index': '99',
                'opacity': '1'
            };
            var a = [o0, o1, o2, o3, o4, o5];
            var mycars = 0;
            a.unshift(a.pop());
            $('#pt1').css(a[0]);
            $('#pt2').css(a[1]);
            $('#pt3').css(a[2]);
            $('#pt4').css(a[3]);
            $('#pt5').css(a[4]);
            $('#pt6').css(a[5]);

            $("#cp-lf").css(a[0]);

            cpuEchartsInit(datajson.data);
            setInterval(function() {
                cpuEchartsInit(datajson.data);
                a.unshift(a.pop());
                $('#pt1').css(a[0]);
                $('#pt2').css(a[1]);
                $('#pt3').css(a[2]);
                $('#pt4').css(a[3]);
                $('#pt5').css(a[4]);
                $('#pt6').css(a[5]);
                //改变CPU磁盘内容
                $('#cp-lf').css(a[0]);
                $('#cpu-lf').css(a[1]);
                $('#nc-lf').css(a[2]);
                $('#cp-yz').css(a[3]);
                $('#cpu-yz').css(a[4]);
                $('#nc-yz').css(a[5]);
            }, 3000);
        })
}

var cpuCount = 0;

function cpuEchartsInit(data) {

    var arrCpuClock = [];
    var arrCpuValue = [];

    var eachCount = 0;
    var tempVal = ''; // 保存临时数据

    $.each(data, function(index1, val1) { // 以top字符为准建二维数组保存地域服务器
        if (index1.substring(index1.length-3, index1.length) === 'top') {
            arrCpuClock[eachCount] = new Array();
            arrCpuValue[eachCount] = new Array();

            $.each(val1, function(index2, val2) { // 以top数据为准建三维数组保存子服务
                arrCpuClock[eachCount][index2] = new Array();
                arrCpuValue[eachCount][index2] = new Array();

                $.each(tempVal, function(index3, val3) { // 匹配top的sys_name保存子服务数据
                    if (val3.sys_name === val2.sys_name) {
                        // console.log(val3.sys_name)
                        arrCpuClock[eachCount][index2].push(val3.clock.substring(11, 16));
                        arrCpuValue[eachCount][index2].push(val3.value_avg);
                    }
                });
                // console.log(val2.sys_name + "=========" +arrCpuValue[eachCount][index2].length)
            });
            eachCount++;
        } else {
            tempVal = val1;
        }
    });

    var echars = echarts.init(document.getElementById("cpu-echars"));
    var color = ['#FFFFFF'];
    var colors = ['#f100ff', '#fe5300', '#ffff01', '#2251ff', '#019bfc'];
    var option = {
        color: colors,
        title: {}, 
        tooltip: {
            show: false
        },
        legend: {
            data: []
        },
        grid: {
            width: '100%',
            left: '0',
            bottom: '0',
            containLabel: true
        },
        xAxis: {
            // name: '时间',
            nameLocation: 'start',
            type: 'category',
            boundaryGap: false,
            data: arrCpuClock[cpuCount][0],
            axisLabel: {
                    fontSize: 10,
                    // interval: 1,
                    // rotate: -15
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: color[0]
                }
            }
        },
        yAxis: {
            name: '                 平均使用率 / 时间',
            type: 'value',
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: color[0]
                }
            },
            splitLine : {
                show: true,
                lineStyle : {
                    color : 'rgba(255,255,255,0.1)'
                }
            }
        },
        series: [{
            type: 'line',
            data: arrCpuValue[cpuCount][0]
        }, {
            type: 'line',
            data: arrCpuValue[cpuCount][1]
        }, {
            type: 'line',
            data: arrCpuValue[cpuCount][2]
        }, {
            type: 'line',
            data: arrCpuValue[cpuCount][3]
        }, {
            type: 'line',
            data: arrCpuValue[cpuCount][4]
        }]
    };
    echars.clear();
    echars.setOption(option);

    cpuCount++;
    cpuCount = cpuCount % arrCpuValue.length;
}


//----------------------------------------------------------------------------------
// 机房CPU总数系统分布饼图
//----------------------------------------------------------------------------------
function jfcpuzsxtfbbtInit(host) {
    $.ajax({
        url: 'json/alarmSystemCpuCount.json',
        type: 'GET',
        dataType: 'json',
    })
        .done(function(datajson) {
            var sum = 0;
            $.each(datajson.data, function(index, val) {
                sum += val.count;
            });

            $('#jfcpuzsxtfbbt_num').text(sum+"核");

            var array_data = [];
            var lenged_name = []; // 标签名称数组

            $.each(datajson.data, function(index, val) {

                array_data.push({
                    'name': (function(s){
                        return s.system.length > 8 ? s.system.slice(0,8) + '...' + ' ' + (s.count / sum * 100).toFixed(2) + '%' : s.system + ' ' + (s.count / sum * 100).toFixed(2) + '%';
                    })(val),
                    'value': val.count
                })

            });

            // 主机数
            $.each(array_data, function(index, val) {
                lenged_name.push(val.name);
            });

            var echarts_obj = echarts.init($("#jfcpuzsxtfbbt-echarts")[0]);
            var option = {
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    left: 20,
                    textStyle: {
                        color: '#fff'
                    },
                    pageIconColor: '#fff',
                    // pageIconInactiveColor: '#fff',
                    pageTextStyle: {
                        color: '#fff'
                    },
                    data: lenged_name
                },
                tooltip : {
                    trigger: 'item',
                    formatter: '{b}'
                },
                color: ['rgb(1,237,251)','rgb(0,90,254)','rgb(0,156,252)','rgb(255, 252, 0)','rgb(255, 0, 187)','rgb(24, 255, 0)','rgb(255, 149, 0)'],
                series: [{
                    type: 'pie',

                    radius: ['40%', '60%'],
                    center: ['70%' , '50%'],

                    label: { //饼图图形上的文本标签
                        normal: {
                            show: false,
                            position: 'outer', //标签的位置
                            textStyle: {
                                fontWeight: 300,
                                fontSize: 12 //文字的字体大小
                            },
                            formatter: '{b}'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,
                            length: 10,
                            length2: 0
                        }
                    },
                    data: array_data
                }]
            }
            echarts_obj.setOption(option);
            $(".jfcpuzsxtfbbt_name").css("opacity",1);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}


//----------------------------------------------------------------------------------
// 主机状态
//----------------------------------------------------------------------------------
function zjztInit() {
    $.ajax({
        type: "GET",
        url: "json/getHost.json",
        dataType: "json",
        success: function(datajson){
            // 在线
            $(".yz-zx .status-num").text(datajson.data.zaixianyz);
            $(".lf-zx .status-num").text(datajson.data.zaixianlf);
            // 离线
            $(".yz-lx .status-num").text(datajson.data.duankaiyz);
            $(".lf-lx .status-num").text(datajson.data.duankailf);
            // 维护中
            $(".yz-whz .status-num").text(datajson.data.weihuyz);
            $(".lf-whz .status-num").text(datajson.data.weihulf);
        }
    });
}