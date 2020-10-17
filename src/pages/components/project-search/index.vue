<template>
  <div class="search-wrapper">
    <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-row>
        <a-col
          v-for="(item, index) in formData"
          :key="index"
          :span="8"
          :style="{ display: index < count ? 'block' : 'none' }"
        >
          <!-- 输入框 -->
          <a-form-model-item
            v-if="item.type === 'input'"
            :label="item.props.title"
            :labelCol="item.labelCol"
          >
            <a-input
              v-model="item.props.value"
              :placeholder="item.props.placeholder"
              :allowClear="item.props.allowClear"
            />
          </a-form-model-item>

          <!-- 选择器 -->
          <a-form-model-item
            v-if="item.type === 'select'"
            :label="item.props.title"
            :labelCol="item.labelCol"
          >
            <a-select
              v-model="item.props.value"
              :placeholder="item.props.placeholder"
              :allowClear="item.props.allowClear"
              :getPopupContainer="(trigger) => trigger.parentNode"
            >
              <a-select-option
                v-for="it in findList(item.listKey)"
                :value="it.key"
                :key="it.key"
              >
                {{ it.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <!-- 时间类型 -->
          <a-form-model-item
            v-if="item.type === 'time'"
            :label="item.props.title"
            :labelCol="item.labelCol"
          >
            <a-range-picker
              v-model="item.props.value"
              format="YYYY/MM/DD"
              valueFormat="YYYY-MM-DD"
              :allowClear="item.props.allowClear"
              :getPopupContainer="(trigger) => trigger.parentNode"
            />
          </a-form-model-item>
        </a-col>
        <slot name="otherInfo"></slot>
        <a-col :span="expandSpan" style="text-align: right">
          <a-form-model-item>
            <a-button type="primary" @click="onSubmit" icon="search"
              >查询</a-button
            >
            <a-button style="margin-left: 10px;" @click="handleReset"
              >重置</a-button
            >
            <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
              {{ expand ? "收起" : "展开" }}
              <a-icon :type="expand ? 'up' : 'down'" />
            </a>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { formData } from "./formData/index";
// import _ from 'lodash'

export default {
  props: {
    projectType: [String],
  },
  data() {
    return {
      formData: [],
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      expand: false,
    };
  },
  computed: {
    ...mapState("common", [
      "whetherList",
      "cooperateList",
      "investMoneyTypeList",
      "industryList",
    ]),
    count() {
      return this.expand ? this.formData.length : 6;
    },
    expandSpan() {
      if (this.expand) {
        return this.formData.length % 3 === 0 ? 24 : 8;
      } else {
        return 24;
      }
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...mapActions("common", ["getIndustryList"]),
    toggle() {
      this.expand = !this.expand;
    },
    // 初始化
    initData() {
      this.formData = formData()[this.projectType]();
      this.getIndustryList();
    },
    // 搜索
    onSubmit() {
      let data = this.handleData();
      this.$emit("handleSearch", data);
    },
    // 重置
    handleReset() {
      this.initData();
      this.onSubmit();
      this.$emit("handleReset");
    },

    // 查询key
    findList(key) {
      return this[key];
    },

    // 处理数据
    handleData() {
      let data = {};
      this.formData.forEach((item) => {
        let { key, value } = item.props;
        data[key] = value;
      });

      let timeParams = {};
       // 创建时间
      if (data.createTime && data.createTime.length) {
        timeParams.startTime = data.createTime[0];
        timeParams.endTime = data.createTime[1];
      }
      // 签约时间
      if (data.signTime && data.signTime.length) {
        timeParams.signStartTime = data.signTime[0];
        timeParams.signEndTime = data.signTime[1];
      }
      // 投产时间
      if (data.putInTime && data.putInTime.length) {
        timeParams.putInStartTime = data.putInTime[0];
        timeParams.putInEndTime = data.putInTime[1];
      }
      const { createTime, signTime, putInTime, ...other } = data;
      console.log(createTime, signTime, putInTime);

      return { ...other, ...timeParams };
    },
  },
};
</script>

<style lang="less" scoped>
.search-wrapper {
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 20px;
}
/deep/ .ant-form-item {
  display: flex;
}

/deep/ .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
