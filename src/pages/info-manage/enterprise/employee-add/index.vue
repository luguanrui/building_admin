<template>
  <a-modal v-model="visible" title="入驻企业员工信息" :width="900" @cancel="handleClose" @ok="handleSubmit">
    <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol" :layout="'horizontal'">
      <a-row>
        <a-col :span="span">
          <a-form-model-item label="姓名" prop="name">
            <span v-if="disabled">{{ form.name }}</span>
            <a-input v-else v-model="form.name" placeholder="请输入" allowClear :maxLength="200" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="证件类型" prop="cardType">
            <span v-if="disabled">{{ form.cardType }}</span>
            <a-select v-else v-model="form.cardType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
              <a-select-option v-for="item in carTypeList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="国籍" prop="country">
            <span v-if="disabled">{{ form.country }}</span>
            <a-select v-else v-model="form.country" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
              <a-select-option v-for="item in countryList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="证件号" prop="cardNum">
            <span v-if="disabled">{{ form.cardNum }}</span>
            <a-input v-else v-model="form.cardNum" placeholder="请输入" allowClear :maxLength="200" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="性别" prop="sex">
            <span v-if="disabled">{{ form.sex }}</span>
            <a-radio-group v-model="form.sex">
              <a-radio v-for="item in genderList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="年龄" prop="age">
            <span v-if="disabled">{{ form.age }}</span>
            <a-input v-else v-model="form.age" placeholder="请输入" allowClear :maxLength="200" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="籍贯" prop="employeeFromCopy">
            <span v-if="disabled">{{ form.employeeFrom }}</span>
            <a-cascader
              v-else
              placeholder="请选择"
              allowClear
              v-model="form.employeeFromCopy"
              :options="regionList"
              :field-names="{ label: 'name', value: 'id', children: 'childList' }"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="民族" prop="nation">
            <span v-if="disabled">{{ form.nation }}</span>
            <a-select v-else v-model="form.nation" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
              <a-select-option v-for="item in nationList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="政治面貌" prop="politicalType">
            <span v-if="disabled">{{ form.politicalType }}</span>
            <a-select v-else v-model="form.politicalType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
              <a-select-option v-for="item in politicalList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="居住地址" prop="address">
            <span v-if="disabled">{{ form.address }}</span>
            <a-input v-else v-model="form.address" placeholder="请输入" allowClear :maxLength="200" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="学历" prop="education">
            <span v-if="disabled">{{ form.education }}</span>
            <a-select v-else v-model="form.education" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
              <a-select-option v-for="item in educationList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="span" v-if="user.roleLevel<3">
          <a-form-model-item label="人才类别" prop="abilityType">
            <span v-if="disabled">{{ form.abilityType }}</span>
            <a-select v-else v-model="form.abilityType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
              <a-select-option v-for="item in abilityList" :value="item.key" :key="item.key">
                {{ item.value }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="span" v-if="user.roleLevel<3">
          <a-form-model-item label="有效期限" prop="outLimitDateStart">
            <span v-if="disabled">{{ form.outLimitDateStart }}</span>
            <a-range-picker v-else v-model="form.outLimitDate" valueFormat="YYYY-MM-DD" allowClear />
            <!-- <a-input v-else v-model="form.outLimitDateStart" placeholder="请输入" allowClear :maxLength="200" /> -->
          </a-form-model-item>
        </a-col>
        <a-col :span="span" v-if="user.roleLevel<3">
          <a-form-model-item label="复评情况" prop="repeatCheck">
            <span v-if="disabled">{{ form.repeatCheck }}</span>
            <a-input v-else v-model="form.repeatCheck" placeholder="请输入" type="textarea" :rows="4" :maxLength="2000" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="车牌号码" prop="carNum">
            <span v-if="disabled">{{ form.carNum }}</span>
            <a-input v-else v-model="form.carNum" placeholder="多个车牌号码请以英文逗号隔开" allowClear :maxLength="200" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="联系电话" prop="phone">
            <span v-if="disabled">{{ form.phone }}</span>
            <a-input v-else v-model="form.phone" placeholder="请输入" allowClear :maxLength="200" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="职务" prop="job">
            <span v-if="disabled">{{ form.job }}</span>
            <a-input v-else v-model="form.job" placeholder="请输入" allowClear :maxLength="200" />
          </a-form-model-item>
        </a-col>
        <a-col :span="span">
          <a-form-model-item label="是否为联系人" prop="isContact">
            <span v-if="disabled">{{ form.isContact }}</span>
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
