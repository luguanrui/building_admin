import {
  getIndexStepList,
  getCaseCountByArea,
  getCaseCountByOutTeam,
  getSignRankList,
  getDownRankList,
  getTodoList,
} from "@/api/common";
import dayjs from "dayjs";

export default {
  data() {
    return {
      pagination: {
        current: 1,
        total: 10,
        pageSize: 5,
      },
      projectList: [
        {
          name: "线索项目",
          link: "/project/clue",
        },
        {
          name: "在谈项目",
          link: "/project/talking-about",
        },
        {
          name: "签约项目",
          link: "/project/contracted",
        },
        {
          name: "落地项目",
          link: "/project/landing",
        },
        {
          name: "开工项目",
          link: "/project/starting",
        },
        {
          name: "投产项目",
          link: "/project/invest",
        },
      ],
      prol: [], // 相关目
      todoList: [],
      caseCountByArea: [], // 线索项目排行榜-各乡镇
      caseCountByOutTeam: [
        // { name: "London", type: "小分队1", value: 18.9 }, // 如果需要展示分队各区，直接加name属性
      ],
      signRankList: [
        // { name: "石家庄", type: "水果", value: 14500 },
      ],
      downRankList: [],
    };
  },
  activated() {
    this.getIndexStepList();
    this.getCaseCountByArea();
    this.getCaseCountByOutTeam();
    this.getSignRankList();
    this.getDownRankList();
    this.getTodoList();
  },
  mounted() {
    this.getIndexStepList();
    this.getCaseCountByArea();
    this.getCaseCountByOutTeam();
    this.getSignRankList();
    this.getDownRankList();
    this.getTodoList();
  },
  methods: {
    dayjs,
    itemRender(current, type, originalElement) {
      if (type === "prev") {
        return<a-icon type="left" style="color: #fff"/>;
      } else if (type === "next") {
        return<a-icon type="right" style="color: #fff"/>;
      }
      return originalElement;
    },
    // 分页
    handlePagination(page) {
      console.log(page, 111);
      this.pagination.current = page;
      this.getTodoList()
    },
    // 跳转
    handleToUrl(link) {
      this.$router.push({ path: link });
    },
    // 待办中心
    handleDetail(obj) {
      console.log(obj);
    },
    async getIndexStepList() {
      const { code, rs } = await getIndexStepList();
      if (code === 200) {
        this.projectList.forEach((prol) => {
          rs.forEach((r) => {
            if (prol.name === r.name) {
              r.link = prol.link;
            }
          });
        });
        this.prol = rs;
      }
    },
    // 线索项目排行榜-各乡镇
    async getCaseCountByArea() {
      const { code, rs } = await getCaseCountByArea();
      if (code === 200) {
        this.caseCountByArea = rs || [];
      }
    },
    // 线索项目排行榜-各驻点分队
    async getCaseCountByOutTeam() {
      const { code, rs } = await getCaseCountByOutTeam();
      if (code === 200) {
        this.caseCountByOutTeam = rs || [];
      }
    },
    // 签约项目排行榜
    async getSignRankList() {
      const { code, rs } = await getSignRankList();
      if (code === 200) {
        this.signRankList = rs || [];
      }
    },
    // 落地项目排行榜
    async getDownRankList() {
      const { code, rs } = await getDownRankList();
      if (code === 200) {
        this.downRankList = rs || [];
      }
    },
    // 待办中心
    async getTodoList() {
      let params = {
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.current,
      };
      this.todoList = []
      const { code, rs } = await getTodoList(params);
      if (code === 200) {
        this.todoList = rs.data || [];
      }
    },
  },
};
