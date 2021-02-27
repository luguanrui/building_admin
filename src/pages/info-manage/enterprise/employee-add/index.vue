<template>
  <a-modal v-model="visible" title="入驻企业员工信息" :width="900" @cancel="handleClose" @ok="handleSubmit" :maskClosable="false">
    <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol" :layout="'horizontal'">
      <a-row>
        <a-col :span="span">
          <a-form-model-item label="姓名" prop="name">
            <a-input v-model="form.name" placeholder="请输入" allowClear :maxLength="200" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="证件类型" prop="cardType">
            <a-select v-model="form.cardType" placeholder="请选择" allowClear>
              <a-select-option v-for="item in carTypeList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="国籍" prop="country">
            <a-select ref="country" v-model="form.country" placeholder="请选择" allowClear :show-search="true" @blur="handleBlur" @search="handleSearch">
              <a-select-option v-for="item in countryList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="证件号" prop="cardNum">
            <a-input v-model="form.cardNum" placeholder="请输入" allowClear :maxLength="200"  @change="handleCardNum"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="性别" prop="sex">
            <a-radio-group v-model="form.sex">
              <a-radio v-for="item in genderList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="年龄" prop="age">
            <a-input v-model="form.age" placeholder="请输入" allowClear :maxLength="200" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="籍贯" prop="employeeFromCopy" :rules="form.country == 1 ? [{ type: 'array',required: true, validator: validatorChangeCountry, trigger: 'change' }] : []">
            <a-cascader
              placeholder="请选择"
              allowClear
              v-model="form.employeeFromCopy"
              :options="regionList"
              :field-names="{ label: 'name', value: 'id', children: 'childList' }"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="民族" prop="nation" :rules="form.country == 1 ? [{ required: true, validator: validatorChange, trigger: 'change' }] : []">
            <a-select v-model="form.nation" placeholder="请选择" allowClear>
              <a-select-option v-for="item in nationList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="政治面貌" prop="politicalType" :rules="form.country == 1 ? [{ required: true, validator: validatorChange, trigger: 'change' }] : []">
            <a-select v-model="form.politicalType" placeholder="请选择" allowClear>
              <a-select-option v-for="item in politicalList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="居住地址" prop="address">
            <a-input v-model="form.address" placeholder="请输入" allowClear :maxLength="200" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="学历" prop="education">
            <a-select v-model="form.education" placeholder="请选择" allowClear>
              <a-select-option v-for="item in educationList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="span" v-if="user.roleLevel<3">
          <a-form-model-item label="人才类别" prop="abilityType">
            <a-select v-model="form.abilityType" placeholder="请选择" allowClear>
              <a-select-option v-for="item in abilityList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="span" v-if="user.roleLevel<3">
          <a-form-model-item label="有效期限" prop="outLimitDateStart">
            <a-range-picker v-model="form.outLimitDate" valueFormat="YYYY-MM-DD" allowClear />
            <!-- <a-input v-else v-model="form.outLimitDateStart" placeholder="请输入" allowClear :maxLength="200" /> -->
          </a-form-model-item>
        </a-col>
        <a-col :span="span" v-if="user.roleLevel<3">
          <a-form-model-item label="复评情况" prop="repeatCheck">
            <a-input v-model="form.repeatCheck" placeholder="请输入" type="textarea" :rows="4" :maxLength="2000" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="车牌号码" prop="carNum">
            <a-input v-model="form.carNum" placeholder="多个车牌号码请以英文逗号隔开" allowClear :maxLength="200" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="联系电话" prop="phone">
            <a-input v-model="form.phone" placeholder="请输入" allowClear :maxLength="200" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="职务" prop="job">
            <a-input v-model="form.job" placeholder="请输入" allowClear :maxLength="200" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="是否为联系人" prop="isContact">
            <a-radio-group v-model="form.isContact">
              <a-radio v-for="item in whetherList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </a-modal>
</template>
<script src="./index.js"></script>
