<template>
  <a-drawer :title="title" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose" :maskClosable="false">
    <div class="wrapper">
      <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol" :layout="'horizontal'">
        <a-row>
          <a-col :span="24">
            <h3 class="title">入驻企业基本信息</h3>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="公司名称" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="办公地址" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="企业性质" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-select v-else v-model="form.aa" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <!-- <a-select-option v-for="item in industryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option> -->
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="属地性质" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-select v-else v-model="form.aa" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <!-- <a-select-option v-for="item in industryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option> -->
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="统一信用代码" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="注册地址" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="注册时间" prop="aa">
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
          <a-col :span="span">
            <a-form-model-item label="统行业类别" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-select v-else v-model="form.aa" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <!-- <a-select-option v-for="item in industryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option> -->
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="经营范围" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" type="textarea" :rows="4" :maxLength="2000" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24"><h3 class="title">联系方式</h3></a-col>
          <a-col :span="span">
            <a-form-model-item label="联系人" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="职务" prop="aa">
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
            <a-form-model-item label="电话" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24"><h3 class="title">办公场所</h3></a-col>
          <a-col :span="span">
            <a-form-model-item label="所属权" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="面积" prop="aa">
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
            <a-form-model-item label="电话" prop="aa">
              <span v-if="disabled">{{ form.aa }}</span>
              <a-input v-else v-model="form.aa" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24"><h3 class="title">员工情况</h3></a-col>
          <a-col :span="24"><span>总人数X人，其中党员X人，大专X人，本科X人，研究生X人，博士X人，海归X人</span></a-col>
        </a-row>
        <a-row>
          <a-col :span="24"
            ><h3 class="title">入驻企业员工信息列表<a-button type="primary">增加员工</a-button></h3></a-col
          >
          <a-col :span="24">
            
          </a-col>
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
