<template>
  <a-card>
    <div class="opreation-wrapper">
      <a-button type="primary" @click="handleOpenSearch">综合查询</a-button>
    </div>
    <div class="table-wrapper">
      <a-table :columns="columns" :data-source="data" :rowKey="(record, index) => index" @change="handleChange" :pagination="false" :loading="loading">
        <!-- <a slot="name" slot-scope="text, record" @click="handleDetail(record)">{{ text }}</a>
        <template slot="operation" slot-scope="record">
          <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(record)" :disabled="!permissionList.includes('100042')">修改</a-button>
        </template> -->
      </a-table>
    </div>
    <a-modal v-model="visible" title="自定义查询" ok-text="搜索" cancel-text="取消" :width="700" @ok="handleSearch" :maskClosable="false">
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-checkbox-group style="width: 100%" v-model="checkValue">
          <a-row>
            <a-col :span="21">
              <a-form-model-item label="公司名称" prop="companyName">
                <a-input v-model="form.companyName" placeholder="请输入" allowClear />
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="name" disabled></a-checkbox>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="21">
              <a-form-model-item label="企业性质" prop="name">
                <a-select v-model="form.companyType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                  <a-select-option v-for="item in companyTypeList" :value="item.key" :key="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="companyType"></a-checkbox>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="21">
              <a-form-model-item label="房产地址" prop="name">
                <a-input-group compact>
                  <a-select v-model="form.buildId" placeholder="楼宇名称" @change="handleChangeBuild" style="width: 120px">
                    <a-select-option v-for="item in buildingAllList" :value="item.id" :key="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                  <a-select v-model="form.buildType" placeholder="房间类型" mode="multiple" @change="handleChangeMain" style="width: 137px">
                    <a-select-option v-for="item in buildTypeList" :value="item.key" :key="item.key">
                      {{ item.value }}
                    </a-select-option>
                  </a-select>
                  <a-select v-model="form.floor" placeholder="楼层" mode="multiple" @change="handleChangeFloor" style="width: 120px">
                    <a-select-option v-for="item in buildingFloorList" :value="item" :key="item">
                      {{ item }}
                    </a-select-option>
                  </a-select>
                  <a-select
                    v-model="form.roomNums"
                    placeholder="房号"
                    mode="multiple"
                    allowClear
                    :getPopupContainer="trigger => trigger.parentNode"
                    :dropdownMatchSelectWidth="false"
                    style="width: 90px"
                  >
                    <a-select-option v-for="item in buildingRoomList" :value="item" :key="item">
                      {{ item }}
                    </a-select-option>
                  </a-select>
                </a-input-group>
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="address"></a-checkbox>
            </a-col>
          </a-row>
          <!-- <a-row>
            <a-col :span="21">
              <a-form-model-item label="房产地址" prop="name">
                <a-select v-model="form.buildId" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                  <a-select-option v-for="item in buildingAllList" :value="item.id" :key="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="address"></a-checkbox>
            </a-col>
          </a-row> -->
          <a-row>
            <a-col :span="21">
              <a-form-model-item label="属地性质" prop="name">
                <a-select v-model="form.belongType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                  <a-select-option v-for="item in belongList" :value="item.key" :key="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="belongType"></a-checkbox>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="21">
              <a-form-model-item label="注册地址" prop="name">
                <a-input v-model="form.regAddress" placeholder="请输入" allowClear />
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="regAddress"></a-checkbox>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="21">
              <a-form-model-item label="注册时间" prop="name">
                <a-date-picker
                  v-model="form.regDate"
                  format="YYYY/MM/DD"
                  valueFormat="YYYY-MM-DD"
                  :allowClear="true"
                  style="width: 100%"
                  :getPopupContainer="trigger => trigger.parentNode"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="regDate"></a-checkbox>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="21">
              <a-form-model-item label="行业类型" prop="name">
                <a-cascader
                  placeholder="请选择"
                  allowClear
                  v-model="form.industryType"
                  :options="industryList"
                  :field-names="{ label: 'name', value: 'id', children: 'childList' }"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="industryType"></a-checkbox>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="21">
              <a-form-model-item label="企业人数" prop="name">
                <a-select v-model="form.employeeCountType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                  <a-select-option v-for="item in employeeCountList" :value="item.key" :key="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="employeeCount"></a-checkbox>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="21">
              <a-form-model-item label="党员人数" prop="name">
                <!-- <a-select v-model="form.dy" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                  <a-select-option v-for="item in whetherList" :value="item.key" :key="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select> -->
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="dy"></a-checkbox>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="21">
              <a-form-model-item label="是否有政策" prop="name">
                <a-select v-model="form.zc" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                  <a-select-option v-for="item in whetherList" :value="item.key" :key="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="zc"></a-checkbox>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="21">
              <a-form-model-item label="税收" prop="name">
                <a-input-number v-model="form.minTax" :min="0" :max="1000000" />&nbsp;&nbsp;-
                <a-input-number v-model="form.maxTax" :min="0" :max="1000000" />&nbsp;&nbsp;万元
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="taxValue"></a-checkbox>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="21">
              <a-form-model-item label="营收" prop="name">
                <a-input-number v-model="form.minIncome" :min="0" :max="1000000" />&nbsp;&nbsp;-
                <a-input-number v-model="form.maxIncome" :min="0" :max="1000000" />&nbsp;&nbsp;万元
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="incomeValue"></a-checkbox>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="21">
              <a-form-model-item label="人才类别" prop="name">
                <a-select v-model="form.human" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                  <a-select-option v-for="item in abilityList" :value="item.key" :key="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="3">
              <a-checkbox value="human"></a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-model>
    </a-modal>
  </a-card>
</template>
<script src="./index.js"></script>
<style lang="less" scope>
.opreation-wrapper {
  text-align: right;
  margin-bottom: 20px;
}
.ant-modal-body {
  height: 400px;
  overflow: auto;
}
.ant-col-3 {
  height: 32px;
  line-height: 32px;
  padding-left: 20px;
}
</style>
