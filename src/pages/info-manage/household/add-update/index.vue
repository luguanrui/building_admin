<template>
  <a-drawer :title="title" :width="720" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose" :maskClosable="false">
    <div class="wrapper">
      <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol" :layout="'horizontal'">
        <a-row>
          <a-col :span="24">
            <h3 class="title">房产地址</h3>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="房产地址" prop="buildId">
              <span v-if="disabled">{{ findBuildingValue(buildingAllList, form.buildId) }}({{ findValue(buildTypeList, form.buildType) }})</span>
              <a-input-group compact v-else>
                <a-select v-model="form.buildId" placeholder="请选择" allowClear style="width: 153px" @change="handleChangeBuild">
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
              <span v-if="disabled">{{ form.floor }} &nbsp;&nbsp;层</span>
              <a-select
                v-else
                v-model="form.floor"
                placeholder="请选择"
                allowClear
                :getPopupContainer="trigger => trigger.parentNode"
                :dropdownMatchSelectWidth="false"
                @change="handleChangeFloor"
              >
                <a-select-option v-for="item in buildingFloorList" :value="item" :key="item">
                  {{ item }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="房号" prop="roomNum">
              <span v-if="disabled">{{ form.roomNum && form.roomNum.join() }} &nbsp;&nbsp;号</span>
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
            <a-form-model-item label="面积" prop="totalArea">
              <span v-if="disabled">{{ form.totalArea }} &nbsp;&nbsp;平方米</span>
              <a-input v-else v-model="form.totalArea" placeholder="请输入" allowClear :maxLength="10" addon-after="平方米" :disabled="true" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-col :span="24"><h3 class="title">住户</h3></a-col>
        <a-row v-for="(user, index) in form.userList" :key="index">
          <a-col :span="24">
            <h6 style="padding-left: 10px;margin: 20px 0;">住户{{ index + 1 }}</h6>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="房屋性质" :prop="'userList.' + index + '.houseRoomType'" :rules="[{ required: true, validator: houseRoomTypeValid, trigger: 'change' }]">
              <span v-if="disabled">{{ findValue(roomTypeList, user.houseRoomType) }}</span>
              <a-select v-else v-model="user.houseRoomType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in roomTypeList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="居主人姓名" :prop="'userList.' + index + '.houseName'" :rules="[{ required: true, validator: houseRoomTypeValid, trigger: 'blur' }]">
              <span v-if="disabled">{{ user.houseName }}</span>
              <a-input v-else v-model="user.houseName" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="证件类型" :prop="'userList.' + index + '.cardType'" :rules="[{ required: true, validator: houseRoomTypeValid, trigger: 'change' }]">
              <span v-if="disabled">{{ findValue(carTypeList, user.cardType) }}</span>
              <a-select v-else v-model="user.cardType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in carTypeList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="国籍" :prop="'userList.' + index + '.country'" :rules="[{ required: true, validator: houseRoomTypeValid, trigger: 'change' }]">
              <span v-if="disabled">{{ findCountryValue(countryList,user.country) }}</span>
              <a-select
                v-else
                v-model="user.country"
                placeholder="请选择"
                allowClear
                :show-search="true"
                @blur="handleBlur($event, index)"
                @search="handleSearch($event, index)"
                :getPopupContainer="trigger => trigger.parentNode"
                :dropdownMatchSelectWidth="false"
              >
                <a-select-option v-for="item in countryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="证件号" :prop="'userList.' + index + '.cardNum'" :rules="[{ required: true, validator: houseRoomTypeValid, trigger: 'blur' }]">
              <span v-if="disabled">{{ user.cardNum }}</span>
              <a-input v-else v-model="user.cardNum" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="暂住证号" prop="aa">
              <span v-if="disabled">{{ user.tempCardNum }}</span>
              <a-input v-else v-model="user.tempCardNum" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="性别" :prop="'userList.' + index + '.sex'" :rules="[{ required: true, validator: houseRoomTypeValid, trigger: 'change' }]">
              <span v-if="disabled">{{ findValue(genderList, user.sex) }}</span>
              <a-select v-else v-model="user.sex" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in genderList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="年龄" :prop="'userList.' + index + '.age'" :rules="[{ required: true, validator: houseRoomTypeValid, trigger: 'blur' }]">
              <span v-if="disabled">{{ user.age }}</span>
              <a-input v-else v-model="user.age" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="车牌号码">
              <span v-if="disabled">{{ user.carNum }}</span>
              <a-input v-else v-model="user.carNum" placeholder="多个车牌号码请以英文逗号隔开" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="籍贯" :prop="'userList.' + index + '.userFrom'" :rules="[{ required: true, validator: houseRoomTypeValid, trigger: 'change' }]">
              <span v-if="disabled">{{ user.userFrom }}</span>
              <a-cascader
                ref="cascader"
                v-else
                placeholder="请选择"
                allowClear
                v-model="user.userFromCopy"
                :options="regionList"
                :field-names="{ label: 'name', value: 'id', children: 'childList' }"
                @change="handleChangeuserFromCopy"
              >
              </a-cascader>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="民族" :prop="'userList.' + index + '.nation'" :rules="[{ required: true, validator: houseRoomTypeValid, trigger: 'change' }]">
              <span v-if="disabled">{{ findValue(nationList, user.nation) }}</span>
              <a-select v-else v-model="user.nation" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in nationList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="政治面貌" :prop="'userList.' + index + '.politicalType'" :rules="[{ required: true, validator: houseRoomTypeValid, trigger: 'change' }]">
              <span v-if="disabled">{{ findValue(politicalList, user.politicalType) }}</span>
              <a-select v-else v-model="user.politicalType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in politicalList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="户籍地址" :prop="'userList.' + index + '.address'" :rules="[{ required: true, validator: houseRoomTypeValid, trigger: 'change' }]">
              <span v-if="disabled">{{ user.address }}</span>
              <a-input v-else v-model="user.address" placeholder="请输入" allowClear :maxLength="200" />
              <!-- <a-cascader
                v-else
                placeholder="请选择"
                allowClear
                v-model="user.addressCopy"
                :options="regionList"
                :field-names="{ label: 'name', value: 'id', children: 'childList' }"
              /> -->
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="联系电话" :prop="'userList.' + index + '.phone'" :rules="[{ required: true, validator: houseRoomTypeValid, trigger: 'blur' }]">
              <span v-if="disabled">{{ user.phone }}</span>
              <a-input v-else v-model="user.phone" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="入住时间" :prop="'userList.' + index + '.liveInTime'" :rules="[{ required: true, validator: houseRoomTypeValid, trigger: 'change' }]">
              <span v-if="disabled">{{ dayjs(user.liveInTime).format('YYYY年MM月DD日') }}</span>
              <a-date-picker
                v-else
                v-model="user.liveInTime"
                format="YYYY/MM/DD"
                valueFormat="YYYY-MM-DD"
                :allowClear="true"
                style="width: 100%"
                :getPopupContainer="trigger => trigger.parentNode"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="搬离时间" :prop="'userList.' + index + '.leaveDate'" :rules="user.houseRoomType === 3 ? [{ required: true, validator: houseRoomTypeValid, trigger: 'change' }] : []">
              <span v-if="disabled">{{ dayjs(user.leaveDate).format('YYYY年MM月DD日') }}</span>
              <a-date-picker
                v-else
                v-model="user.leaveDate"
                format="YYYY/MM/DD"
                valueFormat="YYYY-MM-DD"
                :allowClear="true"
                style="width: 100%"
                :getPopupContainer="trigger => trigger.parentNode"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="备注" :prop="'userList.' + index + '.remark'">
              <span v-if="disabled">{{ user.remark }}</span>
              <a-input v-else v-model="user.remark" placeholder="请输入" type="textarea" :rows="4" :maxLength="2000" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row v-if="!disabled">
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
