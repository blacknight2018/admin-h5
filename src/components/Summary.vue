<template>
  <div class="content">
    <e-charts :options="polar"></e-charts>
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
        title: {
          text: '会员数据统计',
          subtext: '动态数据',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          show: true,
          orient: 'vertical',
          left: 'left',
          data: ['微信访问', '公众号访问', '扫码进入', '分享进入', '搜索访问']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '微信访问'},
              {value: 310, name: '公众号访问'},
              {value: 234, name: '扫码进入'},
              {value: 135, name: '分享进入'},
              {value: 1548, name: '搜索访问'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
</style>