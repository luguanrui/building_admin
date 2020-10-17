import AddProgress from "./add-progress";
import Upload from "@/pages/components/upload";
import {
  getRegionList,
  getPermissionAreaList,
  getPermissionUserList,
} from "@/api/common";
import { getCase } from "@/api/project";
import { mapState, mapActions } from "vuex";

export default {
  components: { AddProgress, Upload },
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      form: {
        projectShowName: "", // 项目名称
        industryType: undefined, // 产业类别
        projectAreaId: undefined, // 责任单位
        contactUserId: undefined, // 责任单位联系人
        contactPhone: "", // 责任单位联系方式
        cooperate: 0, // 是否打算合作招商
        constructionType: undefined, // 建设性质
        projectDesc: "", // 概况
        progress: "", // 进展
        investName: "", // 投资方名称
        investFrom: [], //投资方所属
        investFromText: "",
        investMoney: "", // 总投资额
        moneyType: 0, // 万元或美元
        investContactName: "", // 投资方联系人
        investContactPhone: "", // 投资方联系电话
        hasRec: 0, // 是否有引荐人
        recName: "", // 引荐人
        recNamePhone: "", // 引荐人电话
        recAppendList: "", // 引荐人佐证材料
        usefulDetail: "", // 引荐人作用
      },
      rules: {
        investName: [{ required: true, message: "必填", trigger: "blur" }],
        investMoney: [{ required: true, message: "必填", trigger: "blur" }],
        investContactName: [
          { required: true, message: "必填", trigger: "blur" },
        ],
        investContactPhone: [
          { required: true, message: "必填", trigger: "blur" },
        ],
        projectShowName: [{ required: true, message: "必填", trigger: "blur" }],
        contactPhone: [{ required: true, message: "必填", trigger: "blur" }],
        constructionType: [
          { required: true, message: "必填", trigger: "blur" },
        ],

        recName: [{ required: true, message: "必填", trigger: "blur" }],
        recNamePhone: [{ required: true, message: "必填", trigger: "blur" }],
        recAppendList: [{ required: true, message: "必填", trigger: "blur" }],
      },
      regionList: [], // 投资方所属
      permissionAreaList: [], // 责任单位
      permissionUserList: [], // 责任单位联系人
      disabled: false,
      dialogStatus: "", // add ,edit,detail
    };
  },
  watch: {
    "form.projectAreaId": {
      handler(val) {
        if (val) {
          this.form.contactUserId = undefined;
          this.permissionUserList = [];
          this.getPermissionUserList(val);
        }
      },
    },
  },
  computed: {
    ...mapState("common", [
      "whetherList",
      "moneyTypeList",
      "industryList",
      "constructionList",
    ]),
  },
  methods: {
    ...mapActions("common", ["getIndustryList", "getConstructionList"]),
    /**
     *
     * @param {*} id 项目id
     * @param {*} disabled 是否可编辑 true不可编辑，false可编辑
     */
    handleVisible(id, dialogStatus) {
      this.dialogStatus = dialogStatus;

      this.disabled = dialogStatus === "detail" ? true : false;
      this.getIndustryList();
      this.getConstructionList();
      this.getRegionList();
      this.getPermissionAreaList();
      if (id) {
        this.id = id;
        this.getCase();
      }
    },
    // 添加项目进展情况
    handleAddProgress(val) {
      this.form.progress = val;
    },
    // 添加项目进展
    handleProgress() {
      if (this.id) {
        this.$refs.addProgress.handleVisible(this.id);
      } else {
        this.$refs.addProgress.handleVisible();
      }
    },

    // 上传成功
    uploadSuccess(list) {
      this.form.recAppendList = JSON.stringify(list);
    },
    // 提交信息
    hanldeSubmit() {
      let investFrom = this.form.investFrom.length
        ? this.form.investFrom.join()
        : "";
      const params = { ...this.form, id: this.id, investFrom };
      console.log(params, "hanldeSubmit");
      return params;
      // this.$refs.form.validate((valid) => {
      //   if (valid) {
      //     let investFrom = this.form.investFrom.length
      //       ? this.form.investFrom.join()
      //       : "";
      //     const params = { ...this.form, id: this.id, investFrom };
      //     console.log(params, 'hanldeSubmit')
      //     return params;
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    // textarea详情处理
    textarea(str) {
      return str && str.replace(/\n|\r\n/g, "<br>");
    },
    // 投资方所属
    async getRegionList() {
      try {
        const { code, rs } = await getRegionList();
        if (code === 200) {
          this.regionList = rs;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 责任单位
    async getPermissionAreaList() {
      try {
        const { code, rs } = await getPermissionAreaList();
        if (code === 200) {
          this.permissionAreaList = rs;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 责任单位联系人
    async getPermissionUserList(deptId) {
      try {
        const { code, rs } = await getPermissionUserList({ deptId });
        if (code === 200) {
          this.permissionUserList = rs;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 详情接口
    async getCase() {
      try {
        const params = { id: this.id };
        const { code, rs } = await getCase(params);
        if (code === 200) {
          console.log(rs);
          rs.investFromText = rs.investFrom;
          rs.investFrom = [rs.investProvince, rs.investCity, rs.investArea];
          this.form = rs;
          console.log(rs);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
