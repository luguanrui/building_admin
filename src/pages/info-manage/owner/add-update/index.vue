<template>
  <a-drawer :title="title" :width="720" :visible="visible" :body-style="{ paddingBottom: '53px' }" @close="onClose" :maskClosable="false">
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

          <a-col :span="24"><h3 class="title">业主</h3></a-col>
          <a-col :span="span">
            <a-form-model-item label="产权所有人" prop="ownerName">
              <span v-if="disabled">{{ form.ownerName }}</span>
              <a-input v-else v-model="form.ownerName" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="证件类型" prop="cardType">
              <span v-if="disabled">{{ findValue(carTypeList, form.cardType) }}</span>
              <a-select v-else v-model="form.cardType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in carTypeList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="国籍" prop="country">
              <span v-if="disabled">{{ findCountryValue(countryList, form.country) }}</span>
              <a-select v-else v-model="form.country" placeholder="请选择" allowClear :show-search="true" @blur="handleBlur" @search="handleSearch">
                <a-select-option v-for="item in countryList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="证件号" prop="cardNum">
              <span v-if="disabled">{{ form.cardNum }}</span>
              <a-input v-else v-model="form.cardNum" placeholder="请输入" allowClear :maxLength="50" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="联系人" prop="ownerContact">
              <span v-if="disabled">{{ form.ownerContact }}</span>
              <a-input v-else v-model="form.ownerContact" placeholder="请输入" allowClear :maxLength="20" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="联系电话" prop="phone">
              <span v-if="disabled">{{ form.phone }}</span>
              <a-input v-else v-model="form.phone" placeholder="请输入" allowClear :maxLength="11" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="产权证号" prop="ownerCardNo">
              <span v-if="disabled">{{ form.ownerCardNo }}</span>
              <a-input v-else v-model="form.ownerCardNo" placeholder="请输入" allowClear :maxLength="50" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="车牌号码" prop="carNum">
              <span v-if="disabled">{{ form.carNum }}</span>
              <a-input v-else v-model="form.carNum" placeholder="多个车牌号码请以英文逗号隔开" allowClear :maxLength="20" />
            </a-form-model-item>
          </a-col>
          <!-- <a-col :span="span">
            <a-form-model-item label="联系人" prop="carNum">
              <span v-if="disabled">{{ form.carNum }}</span>
              <a-input v-else v-model="form.carNum" placeholder="请输入" allowClear :maxLength="20" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="联系电话" prop="carNum">
              <span v-if="disabled">{{ form.carNum }}</span>
              <a-input v-else v-model="form.carNum" placeholder="请输入" allowClear :maxLength="20" />
            </a-form-model-item>
          </a-col> -->
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
      <a-button @click="handlePrint" :loading="printDisabled" style="margin-right: 20px">打印</a-button>
      <a-button type="primary" @click="onClose">
        关闭
      </a-button>
    </div>
    <!-- 打印 -->
    <iframe width="100%" height="200px" ref="iframe" style="display: none;"></iframe>
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
