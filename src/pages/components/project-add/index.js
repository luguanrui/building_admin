import ProjectDetail from "@/pages/components/project-detail/index.vue";
import { addCase } from "@/api/case";

export default {
  components: { ProjectDetail },
  data() {
    return {
      visible: false,
      loading: false,
      dialogStatus: "", // add ,edit,detail
    };
  },
  computed: {
    title() {
      switch (this.dialogStatus) {
        case "add":
          return "新增";
        case "edit":
          return "编辑";
        case "detail":
          return "详情";
      }
    },
  },
  methods: {
    // 显示
    handleVisible(id, dialogStatus) {
      this.id = id || "";
      this.visible = true;
      this.dialogStatus = dialogStatus;
      this.$nextTick(() => {
        this.$refs.projectDetail.handleVisible(id, dialogStatus);
      });
    },

    // 关闭弹窗
    onClose() {
      this.visible = false;
      this.id = "";
    },
    // 保存
    handleSubmit() {
      this.addCase();
    },
    // 新增
    async addCase() {
      try {
        this.loading = true;
        // 参数
        let params = this.$refs.projectDetail.hanldeSubmit();
        console.log(params,'params')
        if (params) {
          const { code, rs } = await addCase(params);
          if (code === 200) {
            this.industryList = rs;
            this.visible = false;
            this.$emit("handleSubmit");
            this.loading = false;
            this.id = "";
          }
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
  },
};
