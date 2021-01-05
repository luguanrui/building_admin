<template>
  <a-drawer title="企业其他信息" :width="800" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose" :maskClosable="false">
    <div class="wrapper">
      <a-form-model ref="form" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol" :layout="'horizontal'">
        <a-row>
          <a-col :span="24">
            <h3 class="title">入驻企业基本信息</h3>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="公司名称" prop="name">
              <span v-if="disabledOther">{{ form.name }}</span>
              <a-input v-else v-model="form.name" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="办公地址" prop="buildId">
              <span v-if="disabledOther">{{ findBuildingValue(buildingAllList, form.buildId) }}({{ findValue(buildTypeList, form.buildType) }})</span>
              <a-input-group compact v-else>
                <a-select v-model="form.buildId" placeholder="请选择" allowClear style="width: 175px" @change="handleChangeBuild">
                  <a-select-option v-for="item in buildingAllList" :value="item.id" :key="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                <a-select v-model="form.buildType" placeholder="请选择" allowClear style="width: 90px" @change="handleChangeMain">
                  <a-select-option v-for="item in buildTypeList" :value="item.key" :key="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
              </a-input-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="楼层" prop="floor">
              <span v-if="disabledOther">{{ form.floor }}&nbsp;&nbsp;层</span>
              <a-select v-else v-model="form.floor" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false" @change="handleChangeFloor">
                <a-select-option v-for="item in buildingFloorList" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="房号" prop="roomNum">
              <span v-if="disabledOther">{{ form.roomNum }}&nbsp;&nbsp;号</span>
              <a-select v-else v-model="form.roomNum" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in buildingRoomList" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="企业性质" prop="companyType">
              <span v-if="disabledOther">{{ findValue(companyTypeList, form.companyType) }}</span>
              <a-select v-else v-model="form.companyType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in companyTypeList" :value="item.key" :key="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="属地性质" prop="belongType">
              <span v-if="disabledOther">{{ findValue(belongList, form.belongType) }}</span>
              <a-select v-else v-model="form.belongType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in belongList" :value="item.key" :key="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="统一信用代码" prop="creditCode">
              <span v-if="disabledOther">{{ form.creditCode }}</span>
              <a-input v-else v-model="form.creditCode" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="注册地址" prop="regAddress">
              <span v-if="disabledOther">{{ form.regAddress }}</span>
              <a-input v-else v-model="form.regAddress" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="注册时间" prop="regDate">
              <span v-if="disabledOther">{{ dayjs(form.regDate).format('YYYY年MM月DD日') }}</span>
              <a-date-picker v-else v-model="form.regDate" format="YYYY/MM/DD" valueFormat="YYYY-MM-DD" :allowClear="true" style="width: 100%" :getPopupContainer="trigger => trigger.parentNode" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="行业类别" prop="industryType">
              <span v-if="disabledOther">{{ findValue(industryList, form.industryType) }}</span>
              <a-select v-else v-model="form.industryType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in industryList" :value="item.key" :key="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="法人" prop="iegalPerson">
              <span v-if="disabledOther">{{ form.iegalPerson }}</span>
              <a-input v-else v-model="form.iegalPerson" placeholder="请输入" allowClear :maxLength="20" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="纳税人识别号" prop="taxId">
              <span v-if="disabledOther">{{ form.taxId }}</span>
              <a-input v-else v-model="form.taxId" placeholder="请输入" allowClear :maxLength="20" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="经营范围" prop="businessScope">
              <span v-if="disabledOther">{{ form.businessScope }}</span>
              <a-input v-else v-model="form.businessScope" placeholder="请输入" type="textarea" :rows="4" :maxLength="2000" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
      <a-form-model>
        <a-row>
          <a-col :span="24">
            <h3 class="title">
              <span style="margin-right: 50px">入驻企业其他信息</span>
            </h3>
          </a-col>
        </a-row>
        <a-row class="other-item" v-for="(other, index) in otherList" :key="index">
          <a-icon type="close-circle" class="close-icon" v-if="otherList.length > 1 && dialogStatus == 'add' || dialogStatus == 'edit'" @click="handleRemove(index)" />
          <a-col :span="24">
            <a-form-model-item label="年度" :prop="'otherList.' + index + '.year'" :rules="[{ required: true, validator: validChange, trigger: 'change' }]" :label-col="{ span: 5 }">
              <span v-if="disabledOther">{{ other.year }}</span>
              <a-select v-else v-model="other.year" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in yearList" :value="item.key" :key="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="营收" :prop="'otherList.' + index + '.income'" :rules="[{ required: true, validator: validChange, trigger: 'change' }]" :label-col="{ span: 5 }">
              <span v-if="disabledOther">{{ other.income }}&nbsp;&nbsp;万元</span>
              <a-input v-else v-model="other.income" placeholder="请输入" allowClear :maxLength="200" addon-after="万元" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="税收" :prop="'otherList.' + index + '.tax'" :rules="[{ required: true, validator: validChange, trigger: 'change' }]" :label-col="{ span: 5 }">
              <span v-if="disabledOther">{{ other.tax }}&nbsp;&nbsp;万元</span>
              <a-input v-else v-model="other.tax" placeholder="请输入" allowClear :maxLength="200" addon-after="万元" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="是否享受商务区政策" :prop="'otherList.' + index + '.enjoy'" :rules="[{ required: true, validator: validChange, trigger: 'change' }]" :label-col="{ span: 5 }">
              <span v-if="disabledOther">{{ findValue(whetherList, other.enjoy) }}</span>
              <a-radio-group v-else v-model="other.enjoy">
                <a-radio v-for="item in whetherList" :key="item.key" :value="item.key">
                  {{ item.value }}
                </a-radio>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="政策期限" :prop="'otherList.' + index + '.outLimitDate'" :rules="other.enjoy ? [{ required: true, validator: validChange, trigger: 'change' }] : []" :label-col="{ span: 5 }">
              <span v-if="disabledOther">{{ other.outLimitDate[0] }}~{{ other.outLimitDate[1] }}</span>
              <a-range-picker
                v-else
                v-model="other.outLimitDate"
                format="YYYY/MM/DD"
                valueFormat="YYYY-MM-DD"
                :allowClear="true"
                style="width: 100%"
                :getPopupContainer="trigger => trigger.parentNode"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="企业专利证书号" prop="" :label-col="{ span: 5 }">
              <span v-if="disabledOther">{{ other.patent }}</span>
              <a-input v-else v-model="other.patent" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="政策内容" :prop="'otherList.' + index + '.policyContent'" :rules="other.enjoy ? [{ required: true, validator: validChange, trigger: 'change' }] : []" :label-col="{ span: 5 }">
              <pre v-if="disabledOther">{{ other.policyContent }}</pre>
              <a-input v-else v-model="other.policyContent" placeholder="请输入" type="textarea" :rows="4" :maxLength="2000" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="政策兑现情况" :prop="'otherList.' + index + '.policyPayDesc'" :rules="other.enjoy ? [{ required: true, validator: validChange, trigger: 'change' }] : []" :label-col="{ span: 5 }">
              <pre v-if="disabledOther">{{ other.policyPayDesc }}</pre>
              <a-input v-else v-model="other.policyPayDesc" placeholder="请输入" type="textarea" :rows="4" :maxLength="2000" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="专利内容" prop="" :label-col="{ span: 5 }">
              <pre v-if="disabledOther">{{ other.patentContent }}</pre>
              <a-input v-else v-model="other.patentContent" placeholder="请输入" type="textarea" :rows="4" :maxLength="2000" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row v-if="dialogStatus == 'add' || dialogStatus == 'edit'">
          <a-button type="primary" block @click="handleAddOtherInfo">
            新增入驻企业其他信息
          </a-button>
        </a-row>
      </a-form-model>
    </div>
    <div
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
      <div v-if="dialogStatus == 'add' || dialogStatus == 'edit'">
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          取消
        </a-button>
        <a-button type="primary" @click="handleSubmit" :loading="loading">
          保存
        </a-button>
      </div>

      <div v-if="dialogStatus == 'detail'">
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          关闭
        </a-button>
        <a-button type="primary" @click="dialogStatus = 'edit'" :loading="loading">
          编辑
        </a-button>
      </div>
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
.other-item {
  border: 1px solid #d9d9d9;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  .close-icon {
    cursor: pointer;
    position: absolute;
    font-size: 28px;
    top: -14px;
    right: -14px;
  }
}
</style>
