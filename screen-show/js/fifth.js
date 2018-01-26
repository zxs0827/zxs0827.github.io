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

            var getNumber = datajson.data.length;
            if (maxLiNumber >= getNumber) {
                $("#xtlb_body").css("height", getNumber * singleHeight);
                setContext(datajson.data);
                swiperInit(getNumber);
            } else {
                $("#xtlb_body").css("height", maxLiNumber * singleHeight);
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
    function setContext(datajson) {
        $.each(datajson, function(index, val) {
            /* iterate through array or object */
            var htmlStr = '<span class="xtlb_xtmc">' + val.sys_name + '</span>' + '<span class="xtlb_wlj">' + val.physics + '</span>' + '<span class="xtlb_xnj">' + val.fictitious + '</span>' + '<span class="xtlb_zj">' + val.host + '</span>';
            $('<div />', {
                'class': 'xtlb_li swiper-slide',
                'html': htmlStr,
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
                delay: 5000,
                disableOnInteraction: false,
            },
            on: {
                slideChangeTransitionStart: function(){
                    
                    console.log(this.activeIndex);

                    var xtmc = $(".swiper-slide").eq(this.activeIndex).children('.xtlb_xtmc').text();
                    console.log(xtmc)
                }
            }
        });
    }

}

xtlbInit();

//----------------------------------------------------------------------------------
// 2. 机房整体资源使用率柱状图
//----------------------------------------------------------------------------------

function jfztzysylzztInit() {
    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/shiyonglv.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {
            var cpu = parseInt(datajson.data[0].CpuUsageRate);
            var neicun = parseInt(datajson.data[1].MemoryUsageRate);
            var cipan = parseInt(datajson.data[2].DiskUsageRate);

            $("#syl-cpu .syl_num").text(cpu);
            $("#syl-cpu .syl_bar_color").css("height", datajson.data[0].CpuUsageRate);

            $("#syl-neicun .syl_num").text(neicun);
            $("#syl-neicun .syl_bar_color").css("height", datajson.data[1].MemoryUsageRate);

            $("#syl-cipan .syl_num").text(cipan);
            $("#syl-cipan .syl_bar_color").css("height", datajson.data[2].DiskUsageRate);

        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

}

jfztzysylzztInit();

//----------------------------------------------------------------------------------
// 3. 系统主机数分布饼图
//----------------------------------------------------------------------------------
function xtzjfbbtInit() {
    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/xtzjsfbbt.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {
            var array_data = [];

            $.each(datajson.data, function(index, val) {
                array_data.push({
                    'name': val.attr_value,
                    'value': val.cons
                })

            });

            // 主机数
            function totalFn() {
                var sum = 0;
                $.each(array_data, function(index, val) {
                    /* iterate through array or object */
                    sum += parseInt(val.value);
                });

                $('#xtzjfbbt_num').text(sum);
                $('.xtzjfbbt_name').css('opacity','1');
            }
            totalFn();


            xtzjfbbtInit_echarts = echarts.init($("#xtzjfbbt-echarts")[0]);
            var option = {
                color: ['rgb(0,90,254)', 'rgb(0,156,252)'],
                series: [{
                    type: 'pie',
                    radius: ['40%', '60%'],
                    grid: {
                        width: '100%',
                        left: 0,
                        right: 0,
                        containLabel: true
                    },
                    label: { //饼图图形上的文本标签
                        normal: {
                            show: true,
                            position: 'outer', //标签的位置
                            textStyle: {
                                fontWeight: 300,
                                fontSize: 16 //文字的字体大小
                            },
                            formatter: '{b}' + ' ' + '{d}%'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 20,
                            length2: 0
                        }
                    },
                    data: array_data
                }]
            }
            xtzjfbbtInit_echarts.setOption(option);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

}

xtzjfbbtInit();

//----------------------------------------------------------------------------------
// 4. 机房状态列表
//----------------------------------------------------------------------------------

function jfztlbInit() {
    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/jifangzhuangtialiebao.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {

            var id_array = ['jfztlb_zaixian', 'jfztlb_lixian', 'jfztlb_weihu'];

            $.each(datajson.data, function(index, val) {
                /* iterate through array or object */
                $("#" + id_array[index]).children('.jfztlb_wlj').text(val.cons);
            });

            // 总计
            for (var i in id_array) {
                $("#" + id_array[i]).children('.jfztlb_zj').text(function() {
                    return parseInt($("#" + id_array[i]).children('.jfztlb_wlj').text()) + parseInt($("#" + id_array[i]).children('.jfztlb_xnj').text())
                })
            }

        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}

jfztlbInit();


//----------------------------------------------------------------------------------
// 5.  机房CPU总数系统分布饼图 
//----------------------------------------------------------------------------------

function jfcpuzsxtfbbtInit() {
    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/jfcpuzsxtfbbt.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {
            var array_data = [];

            $.each(datajson.data, function(index, val) {
                array_data.push({
                    'name': (function(s){
                        return s.length > 8 ? s.slice(0,8) + '...' : s;
                    })(val.system),
                    'value': val.count
                })

            });

            // 主机数
            function totalFn() {
                var sum = 0;
                $.each(array_data, function(index, val) {
                    sum += parseInt(val.value);
                });

                $('#jfcpuzsxtfbbt_num').text(sum);
                $('.jfcpuzsxtfbbt_name').css('opacity','1');
            }
            totalFn();


            var echarts_obj = echarts.init($("#jfcpuzsxtfbbt-echarts")[0]);
            var option = {
                color: ['rgb(255,255,255)','rgb(1,237,251)','rgb(0,156,252)','rgb(0,90,254)'],
                series: [{
                    type: 'pie',
                    radius: ['40%', '60%'],
                    label: { //饼图图形上的文本标签
                        normal: {
                            show: true,
                            position: 'outer', //标签的位置
                            textStyle: {
                                fontWeight: 300,
                                fontSize: 14 //文字的字体大小
                            },
                            formatter: '{b}\n' + ' ' + '{d}%'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 20,
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

jfcpuzsxtfbbtInit();


//----------------------------------------------------------------------------------
// 6.  机房内存总数系统分布饼图 
//----------------------------------------------------------------------------------

function jfnczsxtfbbtInit() {
    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/jifangneicunzongshu.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {
            var array_data = [];

            $.each(datajson.data, function(index, val) {
                array_data.push({
                    'name': (function(s){
                        return s.length > 8 ? s.slice(0,8) + '...' : s;
                    })(val.system),
                    'value': val.count
                })

            });

            // 主机数
            function totalFn() {
                var sum = 0;
                $.each(array_data, function(index, val) {
                    sum += parseInt(val.value);
                });

                $('#jfnczsxtfbbt_num').text(sum);
                $('.jfnczsxtfbbt_name').css('opacity','1');
            }
            totalFn();


            var echarts_obj = echarts.init($("#jfnczsxtfbbt-echarts")[0]);
            var option = {
                color: ['rgb(255,255,255)','rgb(1,237,251)','rgb(0,156,252)','rgb(0,90,254)'],
                series: [{
                    type: 'pie',
                    radius: ['40%', '60%'],
                    label: { //饼图图形上的文本标签
                        normal: {
                            show: true,
                            position: 'outer', //标签的位置
                            textStyle: {
                                fontWeight: 300,
                                fontSize: 14 //文字的字体大小
                            },
                            formatter: '{b}\n' + ' ' + '{d}%'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 20,
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

jfnczsxtfbbtInit();

//----------------------------------------------------------------------------------
// 7.  机房磁盘总数系统分布饼图 
//----------------------------------------------------------------------------------


function jfcpzsxtfbbtInit() {
    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/jfcpzsxtfbbt.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {
            var array_data = [];

            $.each(datajson.data, function(index, val) {
                array_data.push({
                    'name': (function(s){
                        return s.length > 8 ? s.slice(0,8) + '...' : s;
                    })(val.system),
                    'value': val.count
                })

            });

            // 主机数
            function totalFn() {
                var sum = 0;
                $.each(array_data, function(index, val) {
                    sum += parseInt(val.value);
                });

                $('#jfcpzsxtfbbt_num').text(sum);
                $('.jfcpzsxtfbbt_name').css('opacity','1');
            }
            totalFn();


            var echarts_obj = echarts.init($("#jfcpzsxtfbbt-echarts")[0]);
            var option = {
                color: ['rgb(255,255,255)','rgb(1,237,251)','rgb(0,156,252)','rgb(0,90,254)'],
                series: [{
                    type: 'pie',
                    radius: ['40%', '60%'],
                    label: { //饼图图形上的文本标签
                        normal: {
                            show: true,
                            position: 'outer', //标签的位置
                            textStyle: {
                                fontWeight: 300,
                                fontSize: 14 //文字的字体大小
                            },
                            formatter: '{b}\n' + ' ' + '{d}%'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 20,
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

jfcpzsxtfbbtInit();