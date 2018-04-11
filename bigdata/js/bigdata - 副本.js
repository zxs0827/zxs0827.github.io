$(document).ready(function() {
    //---------------------------------------------------------------------------------- 
    var pathName=window.document.location.pathname;
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    $(document).ready(function () {
        $('.pop-close').click(function () {
            $('.bgPop,.pop').hide();
        });
        $('.click_pop_zxy').click(function () {
            $('#bgPop_zx,#pop_zx').show();
            selectHostszxyz('yz');
        });
        $('.click_pop_zxl').click(function () {
            $('#bgPop_zx,#pop_zx').show();
            selectHostszxyz('lf');
        });
        $('.click_pop_lxy').click(function () {
            $('#bgPop_lx,#pop_lx').show();
            selectHostslxyz('yz');
        });
        $('.click_pop_lxl').click(function () {
            $('#bgPop_lx,#pop_lx').show();
            selectHostslxyz('lf');
        });
        $('.click_pop_why').click(function () {
            $('#bgPop_wh,#pop_wh').show();
            selectHostswhyz('yz');
        });
        $('.click_pop_whl').click(function () {
            $('#bgPop_wh,#pop_wh').show();
            selectHostswhyz('lf');
        });

        $(".zytongji-div").click(function(){
            var c = $(this).attr("id").split("-")[1];
            $('#bgPop_ziyuan,#pop_ziyuan').show();
            queryZiYuanZong(c);
            queryTableTwoYz(c);
        });

        // $(".zytongji-div").click(function(event) {
        //     $(".zytongji-div").
        // });
        <%--$('#cpu').click(function () {--%>
        <%--document.getElementById("queryform").action = "${ctx}/exhibitionXxSix/toXxSix";--%>
        <%--document.getElementById("queryform").submit();--%>
        <%--});--%>

        // queryTableOneYz();
        //选择机房
        $("#jfName").click(function(){
            // getJFlist();

            $("#jfList").css({
                "display":"grid"
            })

        });

    });
    $("#pop_zx_table").bootstrapTable({
        columns: [{
            field: 'hostid',
            title: '序号',
            align: 'center',
            formatter: function (value, row, index) {
                return index+1;
            }
        },{
            field: 'cputype',
            title: '状态',
            align: 'center',
            formatter: function (value, row, index) {
                return [
                   '<img src="${ctx}/static/img/pop-3.png" alt="" />'
                ].join('');
            }
        },{
            field: 'sys_name',
            title: '系统名称',
            align: 'center'
        },{
            field: 'hostip',
            title: '主机IP',
            align: 'center'
        }, {
            field: 'hostname',
            title: '主机名称',
            align: 'center'
        }, {
            field: 'cpu_user',
            title: 'CPU使用率',
            align: 'center'
        }, {
            field: 'memory_used',
            title: '内存使用情况',
            align: 'center'
        }, {
            field: 'str_vfs_used',
            title: '磁盘使用情况',
            align: 'center'
        }]
    });
    $("#pop_lx_table").bootstrapTable({
        columns: [{
            field: 'hostid',
            title: '序号',
            align: 'center',
            formatter: function (value, row, index) {
                return index+1;
            }
        },{
            field: 'total',
            title: '状态',
            align: 'center',
            formatter: function (value, row, index) {
                return [
                    '<img src="${ctx}/static/img/pop-1.png" alt="" />'
                ].join('');
            }
        },{
            field: 'sys_name',
            title: '系统名称',
            align: 'center'
        },{
            field: 'hostip',
            title: '主机IP',
            align: 'center'
        }, {
            field: 'hostname',
            title: '主机名称',
            align: 'center'
        }, {
            field: 'startclock',
            title: '离线时间',
            align: 'center'
        }, {
            field: 'longclock',
            title: '离线时长',
            align: 'center',
            formatter: function (value, row, index) {
                var date2=new Date();    //结束时间
                var date3=value*1000;  //时间差的毫秒数
                var days=Math.floor(date3/(24*3600*1000));
                var leave1=date3%(24*3600*1000);   //计算天数后剩余的毫秒数
                var hours=Math.floor(leave1/(3600*1000));
                var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
                var minutes=Math.floor(leave2/(60*1000));
                var leave3=leave2%(60*1000);    //计算分钟数后剩余的毫秒数
                var seconds=Math.round(leave3/1000);
                var values = value.split(":");
                return [
                    days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒"
                ].join('');
            }
        }]
    });
    $("#pop_wh_table").bootstrapTable({
        columns: [{
            field: 'hostid',
            title: '序号',
            align: 'center',
            formatter: function (value, row, index) {
                return index+1;
            }
        },{
            field: 'state',
            title: '状态',
            align: 'center',
            formatter: function (value, row, index) {
                return [
                    '<img src="${ctx}/static/img/poo-1.png" alt="" />'
                ].join('');
            }
        },{
            field: 'sys_name',
            title: '系统名称',
            align: 'center'
        },{
            field: 'host',
            title: '主机IP',
            align: 'center'
        }, {
            field: 'hostname',
            title: '主机名称',
            align: 'center'
        }, {
            field: 'active_sinceS',
            title: '维护开始时间',
            align: 'center'
        }, {
            field: 'active_tillS',
            title: '维护结束时间',
            align: 'center'
        }, {
            field: 'sign_name',
            title: '维护人',
            align: 'center'
        }, {
            field: 'reason',
            title: '维护描述',
            align: 'center'
        }]
    });

    function selectHostszxyz(location){
        var url = '';
        if(location == 'lf'){
            url = projectName + "/exhibitionXxFour/selectHostszxlf";
        } else {
            url = projectName + "/exhibitionXxFour/selectHostszxyz";
        }
        $('#pop_zx_table').bootstrapTable('refreshOptions', {
            pagination: true,
            dataShowToggle: true,
            sidePagination: 'server',
            url:url,
            striped:true,
            queryParams: function (params) {
                return $.extend({}, params, {});
            }
        });
    }
    function selectHostslxyz(location){
        var url = '';
        if(location == 'lf'){
            url = projectName + "/exhibitionXxFour/selectHostsdklf";
        } else {
            url = projectName + "/exhibitionXxFour/selectHostsdkyz";
        }
        $('#pop_lx_table').bootstrapTable('refreshOptions', {
            pagination: true,
            dataShowToggle: true,
            sidePagination: 'server',
            url:url,
            striped:true,
            queryParams: function (params) {
                return $.extend({}, params, {});
            }
        });
    }
    function selectHostswhyz(location){
        var url = '';
        if(location == 'lf'){
            url = projectName + "/exhibitionXxFour/selectHostswhlf";
        } else {
            url = projectName + "/exhibitionXxFour/selectHostswhyz";
        }
        $('#pop_wh_table').bootstrapTable('refreshOptions', {
            pagination: true,
            dataShowToggle: true,
            sidePagination: 'server',
            url:url,
            striped:true,
            queryParams: function (params) {
                return $.extend({}, params, {});
            }
        });
    }

    //----------------------------------------------------------------------------------
    // 主机状态
    //----------------------------------------------------------------------------------
    (function zjztInit() {
        $.ajax({
            type: "post",
            url: "${ctx}/exhibition/getHost",
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
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
    })();

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
                // data1.push(val.clock);
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
                        <%--window.location.href="${ctx}/exhibitionXxOne/toXxOne?sj="+data3[i]+"";--%>
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
            type: "post",
            url: "${ctx}/exhibition/getsygj",
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        })
            .done(function(datajson) {
                echartsInit(datajson.data);
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    }
    gjzszsInit();


    //----------------------------------------------------------------------------------
    //系统名称切换滚动
    //----------------------------------------------------------------------------------
    function  cpinccpInit( ){
        selectHostswhyz();
        //系统名称切换滚动
        $.ajax({
            type: "GET",
            <%--url: "${ctx}/exhibition/getxtCputtwo",--%>
            url: "${ctx}/exhibition/getxtCput",
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
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
                }, 20000);
            })
        <%--$.ajax({--%>
            <%--type: "post",--%>
            <%--//  url:"https://zxs0827.github.io/web-back/JSON/cpu.json",--%>
            <%--url: "${ctx}/exhibition/getxtCput",--%>
            <%--dataType: "json",--%>
            <%--contentType: 'application/x-www-form-urlencoded; charset=UTF-8'--%>
        <%--})--%>
            <%--.done(function(datajson) {--%>
                <%--console.log(datajson)--%>
                <%--cpuEchartsInit(datajson.data);--%>
        <%--})--%>
    }
    cpinccpInit();
    
    //----------------------------------------------------------------------------------
    //CPU/内存/磁盘折线图
    //----------------------------------------------------------------------------------
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


    $("#sblx-titledata").click(function(){
        var titledata=$("#sblx-titledata").html();
        $("#zh").val(titledata);
        document.getElementById("sblx-titledata2").action = "${ctx}/exhibition/fifth";
        document.getElementById("sblx-titledata2").submit();
        <%--alert($("#sblx-titledata").html());--%>
        <%--$.ajax({--%>
        <%--type: "post",--%>
        <%--url: "${ctx}/exhibition/fifth",--%>
        <%--data:{--%>
        <%--host:$("#sblx-titledata").html()--%>
        <%--},--%>
        <%--dataType: "json",--%>
        <%--contentType: 'application/x-www-form-urlencoded; charset=UTF-8',--%>
        <%--success: function(datajson) {--%>
        <%--}--%>
        <%--});--%>
    });

    $("#xtjkzt").click(function(){
        document.getElementById("xtjkzt2").action = "${ctx}/exhibition/third";
        document.getElementById("xtjkzt2").submit();
        <%--$.ajax({--%>
        <%--type: "post",--%>
        <%--url: "${ctx}/exhibition/third",--%>
        <%--dataType: "json",--%>
        <%--contentType: 'application/x-www-form-urlencoded; charset=UTF-8',--%>
        <%--success: function(datajson) {--%>
        <%--}--%>
        <%--});--%>
    });


    //----------------------------------------------------------------------------------
    // 各级别告警数量统计
    //----------------------------------------------------------------------------------
    function alarmCount(){ 
         $.ajax({
            url: projectName + '/exhibition/alarmStatistics',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {

            $("#a_jinji .a_smallfont").text(datajson.data.zjj);
            $("#a_zhongyao .a_smallfont").text(datajson.data.zzy);
            $("#a_yiban .a_smallfont").text(datajson.data.zyb);
//            $("#a_qingwei .a_smallfont").text(datajson.data.zqw);

            $("#a_yz_sltj .a_bigfont").text(datajson.data.count);
        })
            .fail(function () {
            })
            .always(function () {
            });
    }
    alarmCount();

    //----------------------------------------------------------------------------------
    // 告警主机TOP5
    //----------------------------------------------------------------------------------

    function getHostTop() {
        $.ajax({
            type: "post",
            url: "${ctx}/exhibition/hostTop",
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(datajson){
                var $li =  $("#gjdxzjtop5-items").find("li");
                // bar 长度的 分母
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

    getHostTop();

    //----------------------------------------------------------------------------------
    // 告警对象TOP5
    //----------------------------------------------------------------------------------

    function getObjectTop() {
        $.ajax({
            type: "post",
            url: "${ctx}/exhibition/ObjectTop",
            dataType: "json",
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function(datajson){
                var $li =  $("#gjdxzjtop5-items-obj").find("li");
                // bar 长度的 分母
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

    getObjectTop();


    $("#gjdxzjtop5-list > span").mouseover(function(event) {
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

    $("#ziyuan-list > span").mouseover(function(event) {
        $("#ziyuan-list > span").removeClass("active");
        $(this).addClass("active");

        if($(this).index() == 0) {
            $("#pop-content").css("display","block");
            $("#shiyonglv").css("display","none");
        }else if($(this).index() == 1){
            $("#shiyonglv").css("display","block");
            $("#pop-content").css("display","none");
        }
    });

    //----------------------------------------------------------------------------------
    // 资源统计 | 这里因为使用了两个json，所以分两个方法
    //----------------------------------------------------------------------------------
    function toFixed2(num){
        return parseInt(num).toFixed(0);
    }

    function getZiYuan() {
        $.ajax({
            url: '${ctx}/exhibition/getZiYuan',
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

    getZiYuan();

    function getHost() {
        $.ajax({
            url: '${ctx}/exhibition/getHost',
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

    getHost();


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
    // 当日告警列表
    //----------------------------------------------------------------------------------

    function getTodayAlarmlist () {

        $.ajax({
            url: '${ctx}/exhibition/TodayAlarmlist',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {
            console.log("success TodayAlarmlist");

            $("#drgjlb-ul").empty();
//            $("#drgjlb-qb > span").text(datajson.data.data.length);

            var weichuli = 0,
                yichuli = 0;

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
//                            case 2:
//                                innerString += '<div class="drgjlb-desc color9">' + '轻微' + '</div>'
//                                break;
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

                    // console.log(innerString);

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

    getTodayAlarmlist();


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
    function FBT(pri){
          $('#pri').val(pri);
    }
    // bubble 气泡图点击事件
    $("body").on('click', ".node",function(){
     var name= $(this).eq(0).find("title").text().split(":")[0].replace("告警","信息");
        $('#pop_gj_table').bootstrapTable('refreshOptions', {
                pagination: true,
                dataShowToggle: true,
                sidePagination: 'server',
                url: "${ctx}/exhibition/alarmDetailsCount",
                striped: true,
                queryParams: function (params) {
                    return $.extend({}, params, {
                        query_name: name,
                        query_pri: $('#pri').val(),
                    });
                }
            });
            $('#bgPop_gj,#pop_gj').show();

            var scrollbar_1 = new PerfectScrollbar("#scrollbar-1 .fixed-table-body");

            $("#scrollbar-1 .fixed-table-body").css("width","900px");
            $("#scrollbar-1 .fixed-table-body").css("height","406px");
            scrollbar_1.update();

    });

    // bubbles char 
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

        // d3.json("https://infovis.sjolie.se/2017/data/flare.json", function(error, root) {
        // d3.json("https://zxs0827.github.io/web-back/JSON/AlarmFBT.json", function(error, root) {
        d3.json("${ctx}/exhibition/AlarmFBT" + arg, function(error, root) {

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
    BubbleChar('');

    $("#gjbgjfbt-navigation > ul > li").click(function(){
        $("#gjbgjfbt-navigation > ul > li").removeClass("active");
        $(this).addClass('active');

        switch ($(this).index()) {
            case 0:
                BubbleChar("");
                break;
            case 1:
                BubbleChar("?priority=5");
                break;
            case 2:
                BubbleChar("?priority=4");
                break;
            case 3:
                BubbleChar("?priority=3");
                break;
            default:
                break;
        }
    })

</script>
<script>
    // $("#sys_list_one_yz").bootstrapTable({
    //     columns: [{
    //         field: 'sys_name',
    //         title: '系统名称',
    //         width: '25%',
    //         align: 'center'
    //     }, {
    //         field: 'hostip',
    //         title: '主机IP',
    //         width: '15%',
    //         align: 'center'
    //     }, {
    //         field: 'fuzeren',
    //         title: '负责人',
    //         width: '10%',
    //         align: 'center'
    //     }, {
    //         field: 'alarm_content',
    //         title: '告警描述',
    //         width: '20%',
    //         align: 'center'
    //     }, {
    //         field: 'event_time',
    //         title: '发生时间',
    //         width: '10%',
    //         align: 'center'
    //     }, {
    //         field: 'alarm_time_length',
    //         title: '告警时长',
    //         width: '12%',
    //         align: 'center',
    //         formatter: gjsc
    //     }, {
    //         field: 'diqu',
    //         title: '地区',
    //         width: '8%',
    //         align: 'center'
    //     }]
    // });

    // function queryTableOneYz() {
    //     $('#sys_list_one_yz').bootstrapTable('refreshOptions', {
    //         pagination: true,
    //         dataShowToggle: true,
    //         sidePagination: 'server',
    //         url: "${ctx}/exhibition/alarmUnconFirmed",
    //         striped: true,
    //         queryParams: function (params) {
    //             return $.extend({}, params, {});
    //         }
    //     });
    // }



    // 当前未确认告警
    
    function alarmUnconFirmedInit(){
        $.ajax({
            url: "${ctx}/exhibition/alarmUnconFirmed",
            type: 'GET',
            dataType: 'json',
        })
            .done(function(datajson) {

                console.log('当前未确认告警');

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
                    // item: '<li><h3 class="alarm_content"></h3><p class="description"></p></li>'
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

                // var hackerList = new List('sys_list_one_yz', options, values);
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

    alarmUnconFirmedInit();

    function gjsc(value, row, index) {

        //var date1=new Date();  //开始时间
        var date2 = new Date();    //结束时间
        var date3 = value * 1000;  //时间差的毫秒数
        //var date3=value*1000;
        //计算出相差月数
        //   var month=Math.floor(date3/(24*3600*1000*30))


        var days = Math.floor(date3 / (24 * 3600 * 1000))

//计算出小时数

        var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000))
//计算相差分钟数
        var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000))
//计算相差秒数
        var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000)
        // alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")


        var values = value.split(":");
        return [
            //values[0]+"小时"+values[1]+"分钟"+values[2]+"秒"
            days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
        ].join('');
    }

/*    $("#pop_gj_table").bootstrapTable({
        columns: [{
            field: 'hostip',
            title: '主机IP',
            width: '10%',
            align: 'center'
        }, {
            field: 'hostname',
            title: '主机名称',
            width: '10%',
            align: 'center'
        },
            {
                field: 'sys_name',
                title: '应用系统',
                width: '10%',
                align: 'center'
            },
            {
                field: 'event_time',
                title: '发生时间',
                width: '10%',
                align: 'center'
            },
            {
                field: 'fuzeren',
                title: '负责人',
                width: '10%',
                align: 'center'
            }, {
                field: 'alarm_content',
                title: '告警内容',
                width: '10%',
                align: 'center'
            }, {
                field: 'alarm_time_length',
                title: '告警时长',
                width: '10%',
                align: 'center',
                formatter: gjsc
            }, {
                field: 'diqu',
                title: '地区',
                width: '10%',
                align: 'center'
            }]
    });*/
    function query24Alarm(time) {
/*        $('#pop_gj_table').bootstrapTable('refreshOptions', {
            pagination: true,
            dataShowToggle: true,
            sidePagination: 'server',
            url: "${ctx}/exhibition/alarmDetails",
            striped: true,
            queryParams: function (params) {
                return $.extend({}, params, {
                    query_startTime: time
                });
            }
        });

        var scrollbar_1 = new PerfectScrollbar("#scrollbar-1 .fixed-table-body");

        $("#scrollbar-1 .fixed-table-body").css("width","900px");
        $("#scrollbar-1 .fixed-table-body").css("height","406px");
        scrollbar_1.update();*/

        $.ajax({
            url: '${ctx}/exhibition/alarmDetails',
            type: 'GET',
            dataType: 'json',
            data: {query_startTime: time},
        })
        .done(function(datajson) {
            console.log("success");
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
                    valueNames: [ 'hostip', 'hostname', 'sys_name', 'event_time','fuzeren','alarm_content','alarm_time_length','diqu'],
                    item: '<tr><td class= "hostip"></td> <td class="hostname"></td>  <td class="sys_name"></td> <td class="event_time"></td> <td class="fuzeren"></td> <td class="alarm_content"></td> <td class="alarm_time_length"></td><td class="diqu"></td></tr>',
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

                var alarmDetailsList = new List('pop_gj_table', options, values);

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

    function AlarmCount(pri){
            $('#pop_gj_table').bootstrapTable('refreshOptions', {
                pagination: true,
                dataShowToggle: true,
                sidePagination: 'server',
                url: "${ctx}/exhibition/alarmDetailsCount",
                striped: true,
                queryParams: function (params) {
                    return $.extend({}, params, {
                        query_pri: pri,
                        query_name:null,
                        query_count:null
                    });
                }
            });
        $('#bgPop_gj,#pop_gj').show();

        var scrollbar_1 = new PerfectScrollbar("#scrollbar-1 .fixed-table-body");

        $("#scrollbar-1 .fixed-table-body").css("width","900px");
        $("#scrollbar-1 .fixed-table-body").css("height","406px");
        scrollbar_1.update();
    }

    $("#pop_zong_table").bootstrapTable({
        columns: [
            {
                field: 'sys_name',
                title: '系统名称',
                // width: '10%',
                align: 'center'
            }, {
                field: 'zhuji',
                title: '主机数',
                // width: '10%',
                align: 'center'
            }, {
                field: 'wl',
                title: '物理数',
                // width: '10%',
                align: 'center'
            },
            {
                field: 'xn',
                title: '虚拟机数',
                // width: '10%',
                align: 'center'
            },
            {
                field: 'cpu',
                title: 'CPU总数',
                // width: '10%',
                align: 'center'
            }, {
                field: 'neicun',
                title: '内存总量',
                // width: '10%',
                align: 'center',
                formatter:neicun
            }, {
                field: 'cipan',
                title: '磁盘总量',
                // width: '10%',
                align: 'center',
                formatter:cipan
            }, {
                field: 'diqu',
                title: '所在地',
                // width: '10%',
                align: 'center'
            }]
    });
    function neicun (value, row, index) {
        return [
            value +'TB'
        ].join('');
    }
    function cipan (value, row, index) {
        return [
            value +'T'
        ].join('');
    }
    function queryZiYuanZong(address) {
        $('#pop_zong_table').bootstrapTable('refreshOptions', {
            pagination: true,
            dataShowToggle: true,
            sidePagination: 'server',
            url: "${ctx}/exhibition/ResourcesZong",
            striped: true,
            queryParams: function (params) {
                return $.extend({}, params, {
                    query_address:address
                });
            }
        });
    }
    //----------------------------------------------------------------------------------
    // 5.  机房CPU总数系统分布饼图
    //----------------------------------------------------------------------------------


    function jfcpuzsxtfbbtInit(host) {
        $.ajax({
            url: projectName + '/exhibitionXxFive/alarmSystemCpuCount',
            data:{
                host:host
            },
            type: 'GET',
            dataType: 'json',
        })
            .done(function(datajson) {

                // 求总和

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

    function jfnczsxtfbbtInit(host) {
        $.ajax({
            url: projectName + '/exhibitionXxFive/alarmSystemMemoryCount',
            data:{
                host:host
            },
            type: 'GET',
            dataType: 'json',
        })
            .done(function(datajson) {

                // 求总和

                var sum = 0;
                $.each(datajson.data, function(index, val) {
                    sum += val.count;
                });

                $('#jfnczsxtfbbt_num').text(sum+"核");

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

                var echarts_obj = echarts.init($("#jfnczsxtfbbt-echarts")[0]);
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
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    }

    //----------------------------------------------------------------------------------
    // 7.  机房磁盘总数系统分布饼图
    //----------------------------------------------------------------------------------

    function jfcpzsxtfbbtInit(host) {
        $.ajax({
            url: projectName + '/exhibitionXxFive/alarmSystemDiskCount',
            data:{
                host:host
            },
            type: 'GET',
            dataType: 'json',
        })
            .done(function(datajson) {

                // 求总和

                var sum = 0;
                $.each(datajson.data, function(index, val) {
                    sum += val.count;
                });

                $('#jfcpzsxtfbbt_num').text(sum+"核");

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

                var echarts_obj = echarts.init($("#jfcpzsxtfbbt-echarts")[0]);
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
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    }



    $("#sys_list_two").bootstrapTable({
        columns: [{
            field: 'sys_name',
            title: '系统名称',
            // width:'10%',
            align: 'center'

        },{
            field: 'cpu',
            title: 'CPU使用率',
            // width:'10%',
            align: 'center',
            formatter: addUnitPercent
        }, {
            field: 'nc',
            title: '内存使用率',
            // width:'10%',
            align: 'center',
            formatter: addUnitPercent
        }, {
            field: 'cp',
            title: '磁盘使用率',
            // width:'10%',
            align: 'center',
            formatter: addUnitPercent
        }, {
            field: 'qcpu',
            title: '前一小时CPU',
            // width:'10%',
            align: 'center',
            formatter: addUnitPercent
        }, {
            field: 'qnc',
            title: '前一小时内存',
            // width:'10%',
            align: 'center',
            formatter: addUnitPercent

        }, {
            field: 'qcp',
            title: '前一小时磁盘',
            // width:'10%',
            align: 'center',
            formatter: addUnitPercent
        }]
    });
    function addUnitPercent (value, row, index) {
        return [
            value +'%'
        ].join('');
    }

    function queryTableTwoYz(address){
        $('#sys_list_two').bootstrapTable('refreshOptions', {
            pagination: true,
            dataShowToggle: true,
            sidePagination: 'server',
            url:"${ctx}/exhibition/sysStatusListTwo",
            striped:true,
            queryParams: function (params) {
                return $.extend({}, params, {
                    query_address:address
                });
            }
        });
    }


    function getJFlist(){
        $.ajax({
            url: "${ctx}/exhibition/getJifangHosts",
            type: 'GET',
            dataType: 'json',
        })
            .done(function(datajson) {
                if(datajson.count<1){
                    return;
                }
                var arrylf = datajson.data.lfjfHosts ;
                var arryyz = datajson.data.yzjfHosts ;
                var html=[];
                for(var i=0;i<arrylf.length;i++){
                    html.push("<div onclick='chackJF(this)'>"+arrylf[i].jifangname+"</div>");
                }
                for(var j=0;j<arryyz.length;j++){
                    html.push("<div onclick='chackJF(this)'>"+arryyz[j].jifangname+"</div>");
                }
                $("#jfList").append(html.join(''));
                // $("#jfList").show();

                console.log('机房加载完成');

                $("#jfName").text(arrylf[0].jifangname);
                jfcpuzsxtfbbtInit(arrylf[0].jifangname);
                jfnczsxtfbbtInit(arrylf[0].jifangname);
                jfcpzsxtfbbtInit(arrylf[0].jifangname);

            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    }
    getJFlist();


    //点击机房
    function chackJF(jf){
        $("#jfList").hide();
        var host=$(jf).html();
        $("#jfName").text($(jf).text());
        jfcpuzsxtfbbtInit(host);
        jfnczsxtfbbtInit(host);
        jfcpzsxtfbbtInit(host);
    }

    $("#gjfzytjfbt-btn-box button").click(function(){
        $("#gjfzytjfbt-btn-box button").removeClass("active");
        $(this).addClass("active");
        $("#gjfzytjfbt-eachtrs-box").children().filter("[id$='-echarts']").css({"opacity":0,"z-index":0});
        $("#gjfzytjfbt-eachtrs-box").children().filter("h2").css("opacity",0);
        
        switch ($(this).index()) {
            case 0:
                $("#jfcpuzsxtfbbt-echarts").css({"opacity":1,"z-index":10});
                $(".jfcpuzsxtfbbt_name").css("opacity",1);
                break;
            case 1:
                $("#jfnczsxtfbbt-echarts").css({"opacity":1,"z-index":10});
                $(".jfnczsxtfbbt_name").css("opacity",1);
                break;
            case 2:
                $("#jfcpzsxtfbbt-echarts").css({"opacity":1,"z-index":10});
                $(".jfcpzsxtfbbt_name").css("opacity",1);
                break;
            default:
                // statements_def
                break;
        }
    });


    // bubble 气泡图点击事件
    $("body").on('click', ".node",function(){
        console.log($(this).index());
        console.log($(this).text());
    })
});