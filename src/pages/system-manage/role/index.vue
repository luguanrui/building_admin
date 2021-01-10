<template>
  <a-card class="role-wrapper">
    <a-table :columns="columns" :data-source="roleList" :pagination="false">
      <a slot="more" slot-scope="text">{{ text }}</a>
      <template slot="more" slot-scope="text, record">
        <a-button type="link" @click="handleSet(record)">设置</a-button>
      </template>
    </a-table>
    <Setting ref="setting" />
  </a-card>
</template>
<script>
import Setting from "./setting.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: { Setting },
  data() {
    return {
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          customRender: (text, recode, index) => index + 1,
        },
        {
          title: "角色",
          dataIndex: "value",
        },
        {
          title: "权限设置",
          scopedSlots: { customRender: "more" },
        },
      ],
    };
  },
  activated() {
    this.getRoleList();
  },
  mounted() {
    this.getRoleList();
  },
  computed: {
    ...mapState("common", ["roleList"]),
  },
  methods: {
    ...mapActions("common", ["getRoleList"]),
    // 设置
    handleSet(record) {
      this.$refs.setting.handleVisible(record.key);
    },
  },
};
</script>
