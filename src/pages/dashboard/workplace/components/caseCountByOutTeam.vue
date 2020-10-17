<template>
  <div ref="rank" class="rank"></div>
</template>
<script>
import { Chart } from "@antv/g2";

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
    };
  },
  watch: {
    data(val) {
      console.log(val, 111);
      setTimeout(() => {
        this.render(val);
      }, 300);
    },
  },
  mounted() {
    setTimeout(() => {
      this.render(this.data);
    }, 300);
  },
  methods: {
    render(data) {
      this.chart && this.chart.destroy();

      this.chart = new Chart({
        container: this.$refs.rank,
        autoFit: true,
        height: 300,
      });

      this.chart.data(data);
      this.chart.scale("value", {
        nice: true,
      });
      this.chart.legend({
        visible: false,
      });
      this.chart.tooltip({
        showMarkers: false,
        shared: true,
      });

      this.chart
        .interval()
        .position("type*value")
        // .color("name")
        .adjust([
          {
            type: "dodge",
            marginRatio: 0,
          },
        ]);

      this.chart.interaction("active-region");

      this.chart.render();
    },
  },
};
</script>
<style lang="less" scoped>
.rank {
  width: 100%;
  height: 100%;
}
</style>
