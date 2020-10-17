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
      this.render(val);
    },
  },
  mounted() {
    setTimeout(() => {
      this.render(this.data)
    }, 300)
  },
  methods: {
    render(data) {
      this.chart && this.chart.destroy();
      
      this.chart = new Chart({
        container: this.$refs.rank,
        autoFit: true,
        height: 300,
      })

      this.chart.coordinate().transpose()

      this.chart.data(data)

      this.chart.scale({
        value: {
          alias: '数量',
        },
      })

      this.chart.legend({
        visible: false,
      })

      // this.chart.axis("name", {
      //   label: {
      //     style: {
      //       fill: "#aaaaaa",
      //       fontSize: 12,
      //     },
      //   },
      //   tickLine: null,
      //   title: null,
      // });
      this.chart.axis('value', {
        label: {
          style: {
            fill: '#fff',
            fontSize: 12,
          },
        },
        title: {
          style: {
            fontSize: 12,
            fontWeight: 300,
          },
          position: 'end',
        },
      })

      this.chart.tooltip({
        shared: true,
        showMarkers: false,
      })

      this.chart
        .interval()
        .position('type*value') //    .position("name*value")
        // .color("type")
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0.3,
          },
        ])

      this.chart.interaction('active-region')
      this.chart.interaction('legend-highlight')

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
