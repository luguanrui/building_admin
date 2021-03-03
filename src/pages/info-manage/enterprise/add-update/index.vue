<template>
  <a-drawer :title="title" :width="800" :visible="visible" :body-style="{ paddingBottom: '53px' }" @close="onClose" :maskClosable="false">
    <div class="wrapper" ref="printContent">
      <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol" :layout="'horizontal'">
        <a-row>
          <a-col :span="24">
            <h3 class="title">入驻企业基本信息</h3>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="公司名称" prop="name">
              <span v-if="disabled">{{ form.name }}</span>
              <a-input v-else v-model="form.name" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="办公地址" prop="buildId">
              <span v-if="disabled">{{ findBuildingValue(buildingAllList, form.buildId) }}</span>
              <a-select v-else v-model="form.buildId" placeholder="请选择" allowClear @change="handleChangeBuild">
                <a-select-option v-for="item in buildingAllList" :value="item.id" :key="item.id">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="房间类型" prop="buildType">
              <span v-if="disabled">{{ buildTypeName(buildTypeList, form.buildType) }}</span>
              <a-select v-else v-model="form.buildType" placeholder="请选择" allowClear @change="handleChangeMain" mode="multiple">
                <a-select-option v-for="item in buildTypeList" :value="item.key" :key="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="楼层" prop="floor">
              <span v-if="disabled">{{ form.floor.join() }}&nbsp;&nbsp;层</span>
              <a-select v-else v-model="form.floor" placeholder="请选择" mode="multiple" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false" @change="handleChangeFloor">
                <a-select-option v-for="item in buildingFloorList" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="房号" prop="roomNum">
              <span v-if="disabled">{{ form.roomNum && form.roomNum.join() }}&nbsp;&nbsp;号</span>
              <a-select
                v-else
                v-model="form.roomNum"
                placeholder="请选择"
                mode="multiple"
                allowClear
                :getPopupContainer="trigger => trigger.parentNode"
                :dropdownMatchSelectWidth="false"
                @change="handleChangeRoomNum"
              >
                <a-select-option v-for="item in buildingRoomList" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="企业性质" prop="companyType">
              <span v-if="disabled">{{ findValue(companyTypeList, form.companyType) }}</span>
              <a-select v-else v-model="form.companyType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in companyTypeList" :value="item.key" :key="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="属地性质" prop="belongType">
              <span v-if="disabled">{{ findValue(belongList, form.belongType) }}</span>
              <a-select v-else v-model="form.belongType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in belongList" :value="item.key" :key="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="统一信用代码" prop="creditCode">
              <span v-if="disabled">{{ form.creditCode }}</span>
              <a-input v-else v-model="form.creditCode" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="注册地址" prop="regAddress">
              <span v-if="disabled">{{ form.regAddress }}</span>
              <a-input v-else v-model="form.regAddress" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="注册时间" prop="regDate">
              <span v-if="disabled">{{ dayjs(form.regDate).format('YYYY年MM月DD日') }}</span>
              <a-date-picker v-else v-model="form.regDate" format="YYYY/MM/DD" valueFormat="YYYY-MM-DD" :allowClear="true" style="width: 100%" :getPopupContainer="trigger => trigger.parentNode" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="行业类别" prop="industryType">
              <span v-if="disabled">{{ form.industryTypeName }}</span>
              <!-- <a-select v-else v-model="form.industryType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in industryList" :value="item.key" :key="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select> -->
              <a-cascader v-else placeholder="请选择" allowClear v-model="form.industryTypeCopy" :options="industryList" :field-names="{ label: 'name', value: 'id', children: 'childList' }" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="法人" prop="iegalPerson">
              <span v-if="disabled">{{ form.iegalPerson }}</span>
              <a-input v-else v-model="form.iegalPerson" placeholder="请输入" allowClear :maxLength="20" />
            </a-form-model-item>
          </a-col>
          <!-- <a-col :span="span">
            <a-form-model-item label="纳税人识别号" prop="taxId">
              <span v-if="disabled">{{ form.taxId }}</span>
              <a-input v-else v-model="form.taxId" placeholder="请输入" allowClear :maxLength="20" />
            </a-form-model-item>
          </a-col> -->
          <a-col :span="span">
            <a-form-model-item label="经营范围" prop="businessScope">
              <span v-if="disabled">{{ form.businessScope }}</span>
              <a-input v-else v-model="form.businessScope" placeholder="请输入" type="textarea" :rows="4" :maxLength="2000" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24"><h3 class="title">联系方式</h3></a-col>
          <a-col :span="span">
            <a-form-model-item label="联系人" prop="contactName">
              <span v-if="disabled">{{ form.contactName }}</span>
              <a-input v-else v-model="form.contactName" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="职务" prop="contactJob">
              <span v-if="disabled">{{ form.contactJob }}</span>
              <a-input v-else v-model="form.contactJob" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="电话" prop="contactPhone">
              <span v-if="disabled">{{ form.contactPhone }}</span>
              <a-input v-else v-model="form.contactPhone" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24"><h3 class="title">办公场所</h3></a-col>
          <a-col :span="span">
            <a-form-model-item label="所属权" prop="workRoomType">
              <span v-if="disabled">{{ findValue(roomTypeList, form.workRoomType) }}</span>
              <a-select v-else v-model="form.workRoomType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in roomTypeList" :value="item.key" :key="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="面积" prop="workRoomArea">
              <span v-if="disabled">{{ form.workRoomArea }}平方米</span>
              <a-input v-else v-model="form.workRoomArea" placeholder="请输入" allowClear :maxLength="10" addon-after="平方米" :disabled="true" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span" v-if="form.workRoomType !== 2">
            <a-form-model-item label="搬离时间" prop="leaveDate" :rules="form.workRoomType === 3 ? [{ required: true, validator: validChange, trigger: 'change' }] : []">
              <span v-if="disabled">{{ dayjs(form.leaveDate).format('YYYY年MM月DD日') }}</span>
              <a-date-picker v-else v-model="form.leaveDate" format="YYYY/MM/DD" valueFormat="YYYY-MM-DD" :allowClear="true" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <!-- 租赁时显示 -->
          <a-col :span="span" v-if="form.workRoomType === 2">
            <a-form-model-item label="联系人" prop="ownerName" :rules="dialogStatus !== 'detail' && form.workRoomType === 2 ? [{ required: true, validator: validChange, trigger: 'change' }] : []">
              <span v-if="disabled">{{ form.ownerName }}</span>
              <a-input v-else v-model="form.ownerName" placeholder="多个联系人请以英文逗号隔开" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <!-- 租赁时显示 -->
          <a-col :span="span" v-if="form.workRoomType === 2">
            <a-form-model-item label="联系电话" prop="ownerPhone" :rules="dialogStatus !== 'detail' && form.workRoomType === 2 ? [{ required: true, validator: validChange, trigger: 'change' }] : []">
              <span v-if="disabled">{{ form.ownerPhone }}</span>
              <a-input v-else v-model="form.ownerPhone" placeholder="多个联系电话请以英文逗号隔开" allowClear :maxLength="50" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="备注" prop="remark">
              <span v-if="disabled">{{ form.remark }}</span>
              <a-input v-else v-model="form.remark" placeholder="请输入" type="textarea" :rows="4" :maxLength="2000" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row v-if="dialogStatus === 'detail'">
          <a-col :span="24"><h3 class="title">员工情况</h3></a-col>
          <a-col :span="24" style="padding: 15px">
            <span>
              总人数<span style="color: red"> {{ totalCount }}</span> 人，其中
              <span v-for="(item, index) in form.educationCountList" :key="index">
                {{ item.education }} <span style="color: red">{{ item.count }}</span> 人
                <span>，</span>
              </span>
            </span>
          </a-col>
        </a-row>
        <a-row v-if="permissionList.includes('100028')">
          <a-col :span="24">
            <h3 class="title">
              <span style="margin-right: 50px">入驻企业员工信息列表</span>
              <!-- <a-button type="primary" @click="handleAddEmployee">增加员工</a-button> -->
            </h3>
          </a-col>
          <a-col :span="24">
            <a-table :columns="columns" :data-source="form.employeeList" :rowKey="(record, index) => index" :pagination="false" style="padding: 15px">
              <!-- <template slot="operation" slot-scope="text, record, index">
                <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(index,record)">修改</a-button>
                <a-button type="danger" size="small" style="margin-right: 10px" @click="handleDel(index)">删除</a-button>
              </template> -->
            </a-table>
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
    <div
      v-else
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
      <a-button @click="handleDownLoad" :loading="downLoading" style="margin-right: 20px">下载</a-button>
      <a-button @click="handlePrint" :loading="printDisabled" style="margin-right: 20px">打印</a-button>
      <a-button type="primary" @click="onClose">
        关闭
      </a-button>
    </div>
    <!-- 员工 -->
    <EmployeeAdd ref="employeeAdd" @handleSuccess="handleSuccess" />
    <!-- 打印 -->
    <iframe width="100%" height="200px" ref="iframe" style="display: none;"></iframe>
  </a-drawer>
</template>
<script src="./index"></script>
<style lang="less" scoped>
.title {
  border-left: 3px solid #1890ff;
  padding-left: 10px;
  margin: 2px 0;
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
