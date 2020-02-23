<template>
  <el-card>
    <div slot="header"
         class="clearfix">
      <h2>概览</h2>
    </div>
    <div id="main" ref="main" style="height:400px;"></div>
  </el-card>
</template>

<script>
import { getArticeAmout } from '../../api/article'
import echarts from 'echarts'

export default {
  name: 'Dashboard',
  data () {
    return {

    }
  },
  created () {
    getArticeAmout().then(resp => {
      // document.getElementById('main')
      this.myChart = echarts.init(this.$refs.main)
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: resp.data.amout.map(item => item.month)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: resp.data.amout.map(item => item.value),
          type: 'line',
          areaStyle: {}
        }]
      }
      this.myChart.setOption(option)
    })
  }
}
</script>
<style lang="less" scoped>
.el-card,
.el-card__body {
  height: 100%;
}
</style>
