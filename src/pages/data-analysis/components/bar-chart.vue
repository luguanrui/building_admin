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
    typeName: {
      type: String,
      default: 'type',
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

      this.chart.coordinate('theta', {
        radius: 0.85,
      })

      this.chart.scale('value', {
        formatter: val => {
          val = val * 100 + '%'
          return val
        },
      })
      this.chart.tooltip({
        showTitle: false,
        showMarkers: false,
      })
      this.chart.axis(false) // 关闭坐标轴
      const interval = this.chart
        .interval()
        .adjust('stack')
        .position('value')
        .color('item')
        .label('value', {
          offset: -40,
          style: {
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
            fill: '#fff',
          },
        })
        .tooltip('item*value', (item, value) => {
          value = value * 100 + '%'
          return {
            name: item,
            value: value,
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#fff',
        })
      this.chart.interaction('element-single-selected')
      this.chart.render()

      // 默认选择
      interval.elements[0].setState('selected', true)
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
