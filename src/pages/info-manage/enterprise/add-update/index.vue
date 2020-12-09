<template>
  <a-drawer :title="title" :width="800" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose" :maskClosable="false">
    <div class="wrapper">
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
              <span v-if="disabled">{{ form.buildId }}</span>
              <!-- <a-input v-else v-model="form.buildId" placeholder="请输入" allowClear :maxLength="200"> </a-input> -->
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
              <!-- <span v-if="disabled">{{ form.floor }}</span> -->
              <!-- <a-input v-else v-model="form.floor" placeholder="请输入" allowClear :maxLength="10" addon-after="层" /> -->
              <span v-if="disabled">{{ form.floor }}</span>
              <a-select v-else v-model="form.floor" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false" @change="handleChangeFloor">
                <a-select-option v-for="item in buildingFloorList" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="房号" prop="roomNum">
              <!-- <span v-if="disabled">{{ form.roomNum }}</span> -->
              <!-- <a-input v-else v-model="form.roomNum" placeholder="请输入" allowClear :maxLength="10" /> -->
              <span v-if="disabled">{{ form.roomNum }}</span>
              <a-select v-else v-model="form.roomNum" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in buildingRoomList" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="企业性质" prop="companyType">
              <span v-if="disabled">{{ form.companyType }}</span>
              <a-select v-else v-model="form.companyType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in companyTypeList" :value="item.key" :key="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="属地性质" prop="belongType">
              <span v-if="disabled">{{ form.belongType }}</span>
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
              <span v-if="disabled">{{ form.regDate }}</span>
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
          <a-col :span="span">
            <a-form-model-item label="行业类别" prop="industryType">
              <span v-if="disabled">{{ form.industryType }}</span>
              <a-select v-else v-model="form.industryType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in industryList" :value="item.key" :key="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="法人" prop="iegalPerson">
              <span v-if="disabled">{{ form.iegalPerson }}</span>
              <a-input v-else v-model="form.iegalPerson" placeholder="请输入" allowClear :maxLength="20" />
            </a-form-model-item>
          </a-col>
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
              <!-- <span v-if="disabled">{{ form.contactJob }}</span>
              <a-select v-else v-model="form.contactJob" placeholder="请选择" allowClear :getPopupContainer="(trigger) => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in industryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option>
              </a-select> -->
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
              <span v-if="disabled">{{ form.workRoomType }}</span>
              <!-- <a-input v-else v-model="form.workRoomType" placeholder="请输入" allowClear :maxLength="200" /> -->
              <a-select v-else v-model="form.workRoomType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in workRoomTypeList" :value="item.key" :key="item.key">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="面积" prop="workRoomArea">
              <!-- <span v-if="disabled">{{ form.workRoomArea }}</span>
              <a-select v-else v-model="form.workRoomArea" placeholder="请选择" allowClear :getPopupContainer="(trigger) => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in industryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option>
              </a-select> -->
              <span v-if="disabled">{{ form.workRoomArea }}</span>
              <a-input v-else v-model="form.workRoomArea" placeholder="请输入" allowClear :maxLength="10" addon-after="平方米" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="电话" prop="workRoomPhone">
              <span v-if="disabled">{{ form.workRoomPhone }}</span>
              <a-input v-else v-model="form.workRoomPhone" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row v-if="dialogStatus === 'detail'">
          <a-col :span="24"><h3 class="title">员工情况</h3></a-col>
          <a-col :span="24" style="padding-left: 15px">
            <span>
              总人数<span style="color: red"> {{ totalCount }}</span> 人，其中
              <span v-for="(item, index) in form.educationCountList" :key="index">
                {{ item.education }} <span style="color: red">{{ item.count }}</span> 人
                <span>，</span>
              </span>
            </span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <h3 class="title">
              <span style="margin-right: 50px">入驻企业员工信息列表</span>
              <a-button type="primary" @click="handleAddEmployee">增加员工</a-button>
            </h3>
          </a-col>
          <a-col :span="24">
            <a-table :columns="columns" :data-source="form.employeeList" :rowKey="(record, index) => index" :pagination="false">
              <template slot="operation" slot-scope="record">
                <a-button type="primary" size="small" style="margin-right: 10px" @click="handleUpdate(record)">修改</a-button>
                <a-button type="danger" size="small" style="margin-right: 10px" @click="handleDel(record)">删除</a-button>
              </template>
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
    <!-- 员工 -->
    <EmployeeAdd ref="employeeAdd" @handleSuccess="handleSuccess" />
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
