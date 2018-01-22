var gaojingzhanbi_echarts = echarts.init($("#gaojingzhanbi-echarts")[0]);
var option = {
    series: [{
        type: 'pie',
        radius: ' 70%',
        roseType: 'radius',
        center: ['50%', '60%'],
        labelLine: {
            normal: {
                length: -5,
                show: false
            }
        },
        color: ['rgb(236, 134, 81)', 'rgb(255, 101, 218)', 'rgb(54, 116, 233)', 'rgb(86, 207, 236)', 'rgb(194, 194, 49)'],
        data: [{value:335, name:'信息'},
            {value:310, name:'轻微'},
            {value:274, name:'一般'},
            {value:235, name:'重要'},
            {value:400, name:'紧急'}]
    }]
}
gaojingzhanbi_echarts.setOption(option);
