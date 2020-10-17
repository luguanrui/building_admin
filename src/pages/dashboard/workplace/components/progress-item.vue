<template>
  <div ref="progressItem" class="progress-item"></div>
</template>
<script>
import { Chart } from "@antv/g2";

export default {
  props: {
    name: String,
    value: Number,
  },
  data() {
    return {};
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      const data = [{ item: this.name, percent: this.value }];
      const chart = new Chart({
        container: this.$refs.progressItem,
        autoFit: true,
      });
      chart.data(data);
      chart.legend({
        visible: false,
      });
      chart.tooltip(false);

      chart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.6,
      });

      // 辅助文本
      chart.annotation().text({
        position: ["50%", "50%"],
        content: this.value,
        style: {
          fontSize: 12,
          fill: "#fff",
          textAlign: "center",
          fontWeight: 400
        },
        offsetY: 0,
      });
      chart
        .interval()
        .position("percent")
        .color("item");

      chart.render();
    },
  },
};
</script>
<style lang="less" scoped>
.progress-item {
  width: 100%;
  height: 100%;
}
</style>
