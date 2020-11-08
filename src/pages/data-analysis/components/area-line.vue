<template>
  <div ref="rank" class="rank"></div>
</template>
<script>
import { Chart } from '@antv/g2'

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    data(val) {
      setTimeout(() => {
        this.render(val)
      }, 300)
    },
  },
  mounted() {
    setTimeout(() => {
      this.render(this.data)
    }, 300)
  },
  methods: {
    render(data) {
      // 已存在则销毁
      this.chart && this.chart.destroy()

      this.chart = new Chart({
        container: this.$refs.rank,
        autoFit: true,
        height: 300,
        padding: [50, 20, 50, 100],
      })
      this.chart.data(data)
      this.chart.scale({
        value: {
          min: 0,
          nice: true,
        }
      })
      this.chart.scale('value', {
        alias: '数量',
        nice: true,
      })

      this.chart.tooltip({
        shared: true,
        showMarkers: true,
      })
      this.chart.area().position('type*value')
      this.chart.line().position('type*value')

      this.chart.render()
    },
  },
}
</script>
<style lang="less" scoped>
.rank {
  width: 100%;
  height: 100%;
}
</style>
