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
      console.log(val, 111)
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
      })
      this.chart.axis('type', {
        tickLine: null,
        label: {
          formatter: (val) => {
            if (val.length > 3) {
              return val.substring(0, 3) + '...'
            } else {
              return val
            }
          },
        },
      })

      this.chart.data(data)

      this.chart.scale('value', {
        alias: '数值',
        nice: true,
      })
      this.chart.legend({
        visible: false,
      })

      this.chart.tooltip({
        showMarkers: false,
      })
      this.chart.interaction('active-region')
      this.chart.interval().position('type*value')
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
