<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="home-breadcrumb">
            <el-breadcrumb-item>面经后台</el-breadcrumb-item>
            <el-breadcrumb-item>数据看板</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="cards" shadow="never">
                    <i class="el-icon-user"></i>
                    <h5 class="tit">活跃用户</h5>
                    <h2 class="num">802</h2>
                    <p class="tag"><i class="green">↑ 5.23%</i> 最近一个月</p>
                </el-card>
                <el-card class="cards" shadow="never">
                    <i class="el-icon-tickets"></i>
                    <h5 class="tit">平均访问量</h5>
                    <h2 class="num">1298</h2>
                    <p class="tag"><i class="red">↓ 8.56%</i> 截止最近一周</p>
                </el-card>
                <el-card shadow="never">
                    <img src="../assets/image.png" alt="">
                </el-card>

            </el-col>
            <el-col :span="16">
                <el-card>
                    <template>
                        <span>商品单日销量</span>
                    </template>
                    <div ref="chartRef" style="height: 400px;"></div>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="8">
                <el-card>
                    <template>
                        <span>用户性别分布</span>
                    </template>
                    <div ref="genderChart" style="height: 400px;"></div>
                </el-card>


            </el-col>
            <el-col :span="8">
                <el-card>
                    <template>
                        <span>浏览器分布</span>
                    </template>
                    <div ref="browserChart" style="height: 400px;"></div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <template>
                        <span>设备系统访问</span>
                    </template>
                    <img src="../assets/2.png" alt="" style="height: 400px;">
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>

export default {
    name: 'DashboardView',

    mounted() {
        // 1. 获取图表容器DOM元素（通过ref或id）
        const chartDom = this.$refs.chartRef
        // 2. 初始化echarts实例
        const myChart = this.$echarts.init(chartDom)
        // 3. 定义图表配置项（以柱状图为例）
        const option = {
            title: { text: '示例柱状图' },
            tooltip: {},
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar', // 柱状图（需确保你在echarts.js中注册了BarChart）
                    data: [5, 20, 36, 10, 15]
                }
            ]
        }
        // 4. 设置配置项，渲染图表
        myChart.setOption(option)



        const chartDom2 = this.$refs.genderChart
        const myChart2 = this.$echarts.init(chartDom2)
        const option2 = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: '男性' },
                        { value: 735, name: '女性' },
                        { value: 580, name: '未知' },
                    ]
                }
            ]
        };
        option2 && myChart2.setOption(option2);


        const chartDom3 = this.$refs.browserChart
        const myChart3 = this.$echarts.init(chartDom3);

        const option3 = {
            legend: {
                data: ['Allocated Budget', 'Actual Spending']
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: 'Chrome', max: 80 },   // 对应示例中Chrome的最大值80
                    { name: 'Firefox', max: 60 },  // 对应示例中Firefox的最大值60
                    { name: 'Safari', max: 30 },   // 对应示例中Safari的最大值30
                    { name: 'Opera', max: 20 },    // 对应示例中Opera（或你图中的“xlorer”类指标）的最大值20
                    { name: 'Edge', max: 60 }
                ]
            },
            series: [
                {
                    type: 'radar',
                    data: [
                        {
                            value: [60, 40, 10, 10, 60] // 按indicator顺序，对应各指标的数值
                        }
                    ]
                }
            ]
        };

        option3 && myChart3.setOption(option3);

    }
}
</script>

<style lang="scss" scoped>
.home-breadcrumb {
    margin-left: 20px;
    margin-bottom: 20px;

}

.tit {
    color: #6c757d;
    font-size: 14px;
    margin-bottom: 6px;

}

.num {
    color: #6c757d;
    font-size: 30px;
    margin-bottom: 6px;
}

.tag {
    color: #999;
    margin: 0;
    font-size: 14px;
    margin-bottom: 6px;
}

.cards {
    position: relative;

    .el-icon-user {
        font-size: 30px;
        color: #ccc;
        position: absolute;
        right: 25px;
        top: 30px;
        font-weight: bold;
    }

    .el-icon-tickets {
        font-size: 30px;
        color: #ccc;
        position: absolute;
        right: 25px;
        top: 30px;
        font-weight: bold;
    }
}

.green {
    color: #28a745;
}

.red {
    color: #dc3545;
}
</style>
