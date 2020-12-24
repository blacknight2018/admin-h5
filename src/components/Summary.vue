<template>
  <div class="content">
    <el-card>
      <div style="display: flex;flex-direction: row">
        <e-charts :options="polar" :autoresize="true" style="flex-shrink: 0;flex-grow: 0;"></e-charts>
        <div>
          <div><i class="el-icon-s-data"></i> 总共订单 <span class="title">100</span></div>
          <br>
          <div><i class="el-icon-news"></i> 今日新增 <span class="title">1</span></div>
          <br>
          <div><i class="el-icon-money"></i> 已经支付 <span class="title">100</span></div>
          <br>
          <div><i class="el-icon-receiving"> 还未发货 <span class="title">1000</span></i></div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import Echarts from 'vue-echarts/components/ECharts'
import "echarts"
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'

export default {
  name: "Summary",
  components: {
    "e-charts": Echarts
  },
  mounted() {

  },
  data() {
    return {
      polar: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      }

    }
  },
  methods: {}
}
</script>

<style scoped>
.content {
  height: 96%;
}

.title {
  font-weight: bold;
  font-size: 28px;
}
</style>