//初始化
 $(document).ready(function(){  
     //各级别告警数量统计
	 alarmCount();
	 //告警总数走势折线图
	 gjzszsInit();
 });  

//-----------------------------------------------------------------------------------------
//各级别告警数量统计
//-----------------------------------------------------------------------------------------
function alarmCount(){
	
	 $.ajax({
        url: 'https://zxs0827.github.io/screen-show/json/gaojingcishu.json',
        type: 'GET',
        dataType: 'json',
    })
    .done(function(datajson) {
    	//var json=eval(datajson);
    	//亦庄
    	var sum=datajson.data.yz;
    	var count=parseInt(sum[0].sum)+parseInt(sum[1].sum)+parseInt(sum[2].sum)+parseInt(sum[3].sum)+parseInt(sum[4].sum);
    	$("#a_yz_sltj .a_main .a_bigfont").html(count);
        $("#a_xinxi .a_smallfont").html(sum[0].sum);
        $("#a_qingwei .a_smallfont").html(sum[1].sum);
        $("#a_yiban .a_smallfont").html(sum[2].sum);
        $("#a_zhongyao .a_smallfont").html(sum[3].sum);
        $("#a_jinji .a_smallfont").html(sum[4].sum);
        
        //廊坊
        var sum2=datajson.data.lf;
    	var count2=parseInt(sum2[0].sum)+parseInt(sum2[1].sum)+parseInt(sum2[2].sum)+parseInt(sum2[3].sum)+parseInt(sum2[4].sum);
        $("#a_lf_sltj .a_main .a_bigfont").html(count2);
        $("#b_xinxi .a_smallfont").html(sum2[0].sum);
        $("#b_qingwei .a_smallfont").html(sum2[1].sum);
        $("#b_yiban .a_smallfont").html(sum2[2].sum);
        $("#b_zhongyao .a_smallfont").html(sum2[3].sum);
        $("#b_jinji .a_smallfont").html(sum2[4].sum);
       
    })
    .fail(function() {})
    .always(function() {});
    
}

//-----------------------------------------------------------------------------------------
// 告警总数走势折线图
//-----------------------------------------------------------------------------------------
function gjzszsInit() {
    function echartsInit(data,pd) {
    	if(pd=="yz"){
			$("#gjzszs-echarts-yz").css("height","200px")
        	var gjzszs_echarts = echarts.init(document.getElementById("gjzszs-echarts-yz"));
    	}else{
			$("#gjzszs-echarts-lf").css("height","200px")
    		var gjzszs_echarts = echarts.init(document.getElementById("gjzszs-echarts-lf"));
    	}
        var data1 = [];
        var data2 = [];
        var xData = [];
        var yData = [];
        var lineCount = 0;
        var lineNum = 24;
        $.each(data, function(index, val) {
            // data1.push(val.clock);
            data1.push(val.clock.substring(11, 16));
            data2.push(val.cons);
        });
        xData = data1.slice(lineCount, lineCount + lineNum);
        // alert(xData);
        console.log(xData);
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
                    fontSize: 12,
                    interval: 0,
                    rotate: 45
                } ,
                
                data: xData
            }],
            yAxis: [{
                type: 'value',
                scale: true,
                name: '     告警数量 / 时间',
                max: maxNum,
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
        setInterval(function(){
            gjzszs_echarts.clear();
            gjzszs_echarts.setOption(option);
        }, 20000);

        // setInterval(function() {
        //     lineCount++;
        //     lineCount = lineCount % data.length;
        //     var xAxis = option.xAxis[0].data;
        //     var series = option.series[0].data;
        //     xAxis.shift();
        //     // xAxis.push(data1[lineCount + lineNum - 1] % data.length) ;
        //     xAxis.push(data1[(lineCount + lineNum - 1) % data.length]);
        //     series.shift();
        //     // series.push(data2[lineCount + lineNum - 1]);
        //     series.push(data2[(lineCount + lineNum - 1) % data.length]);
        //     gjzszs_echarts.setOption(option);
        // }, 60000);
    }
    $.ajax({
            url: 'https://zxs0827.github.io/screen-show/json/gaojingshuliangzoushitu.json',
            type: 'GET',
            dataType: 'json',
        })
        .done(function(datajson) {
        	echartsInit(datajson.data.yz,'yz');
            echartsInit(datajson.data.lf,'lf');
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}
