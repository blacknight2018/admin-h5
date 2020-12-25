<template>
  <div class="content">
    <el-card>
      <div style="display: flex;flex-direction: row">
        <e-charts :options="polar" :autoresize="true" style="flex-shrink: 0;flex-grow: 0;"></e-charts>
        <div style="flex:1">
          <div><i class="el-icon-s-data"></i> 总共订单 <span class="title">{{ total }}</span></div>
          <br>
          <div><i class="el-icon-news"></i> 今日新增 <span class="title">1</span></div>
          <br>
          <div><i class="el-icon-money"></i> 已经支付 <span class="title">{{ pay_count }}</span></div>
          <br>
          <div><i class="el-icon-receiving"> 还未发货 <span class="title">{{ unDelivery_count }}</span></i></div>
          <br>
          <el-progress :percentage="50"></el-progress>
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
    this.$http.get(this.server + "/order/query").then(
        response => {
          console.log(response)
          this.$set(this, 'delivery_count', response.body.data.delivery_count)
          this.$set(this, 'pay_count', response.body.data.pay_count)
          this.$set(this, 'total', response.body.data.total)
          this.$set(this, 'unDelivery_count', response.body.data.unDelivery_count)
          this.$set(this, 'unPay_count', response.body.data.unPay_count)


          this.$set(this.polar.series[0].data[0], 'value', this.unPay_count)
          this.$set(this.polar.series[0].data[1], 'value', this.pay_count)
          this.$set(this.polar.series[0].data[2], 'value', this.unDelivery_count)
          this.$set(this.polar.series[0].data[3], 'value', this.delivery_count)
        }
    )
  },
  data() {
    return {
      "total": 0,
      "pay_count": 0,
      "unPay_count": 0,
      "delivery_count": 0,
      "unDelivery_count": 0,
      polar: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
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
              {value: 335, name: '未支付'},
              {value: 310, name: '已支付'},
              {value: 234, name: '未发货'},
              {value: 135, name: '已发货'}
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