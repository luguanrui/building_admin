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
      this.chart.axis(this.typeName, {
        tickLine: null,
        label: {
          formatter: val => {
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
        alias: '数量',
        nice: true,
      })

      this.chart.axis(this.typeName, {
        tickLine: {
          alignTick: false,
        },
      })
      this.chart.axis('value', false)

      this.chart.tooltip({
        shared: true,
        showMarkers: false,
      })
      this.chart.interval().position(`${this.typeName}*value`)
      this.chart.interaction('active-region')

      // 添加文本标注
      data.forEach(item => {
        this.chart.annotation().text({
          position: [item[this.typeName], item.value],
          content: item.value + '个',
          style: {
            textAlign: 'center',
          },
          offsetY: -10,
        })
      })
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
