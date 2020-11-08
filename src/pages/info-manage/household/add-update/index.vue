<template>
  <a-drawer :title="title" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose" :maskClosable="false">
    <div class="wrapper">
      <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol" :layout="'horizontal'">
        <a-row>
          <a-col :span="24">
            <h3 class="title">房产地址</h3>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="楼宇名称" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="楼层" prop="aa">
              <!-- <span v-if="disabled">{{ form.aa }}</span>
              <a-select v-else v-model="form.aa" placeholder="请选择" allowClear :getPopupContainer="(trigger) => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in industryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option>
              </a-select> -->
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="房号" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="面积" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>

          <a-col :span="24"><h3 class="title">住户</h3></a-col>
          <a-col :span="span">
            <a-form-model-item label="房屋性质" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-select v-else v-model="form.aa" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <!-- <a-select-option v-for="item in industryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option> -->
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="居主人姓名" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="证件类型" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-select v-else v-model="form.aa" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <!-- <a-select-option v-for="item in industryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option> -->
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="国籍" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-select v-else v-model="form.aa" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <!-- <a-select-option v-for="item in industryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option> -->
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="证件号" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="暂住证号" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="性别" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="年龄" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="车牌号码" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="籍贯" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-select v-else v-model="form.aa" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <!-- <a-select-option v-for="item in industryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option> -->
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="民族" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-select v-else v-model="form.aa" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <!-- <a-select-option v-for="item in industryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option> -->
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="政治面貌" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-select v-else v-model="form.aa" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <!-- <a-select-option v-for="item in industryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option> -->
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="户籍地址" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="联系电话" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="入住时间" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
               <a-date-picker
                v-model="form.aa"
                format="YYYY/MM/DD"
                valueFormat="YYYY-MM-DD"
                :allowClear="true"
                style="width: 100%"
                :getPopupContainer="trigger => trigger.parentNode"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <div style="margin: 20px 20px">
            <a-button type="primary" block @click="handleAddHousehold">新增住户</a-button>
          </div>
        </a-row>
      </a-form-model>
    </div>
    <div
      v-if="dialogStatus !== 'detail'"
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button :style="{ marginRight: '8px' }" @click="onClose">
        取消
      </a-button>
      <a-button type="primary" @click="handleSubmit" :loading="loading">
        保存
      </a-button>
    </div>
  </a-drawer>
</template>
<script src="./index"></script>
<style lang="less" scoped>
.title {
  border-left: 3px solid #1890ff;
  padding-left: 10px;
  margin: 20px 0;
}
/deep/ .ant-form-item {
  display: flex;
  .ant-form-explain {
    display: none;
  }
}

/deep/ .ant-form-item-control-wrapper {
  flex: 1;
}
</style>
