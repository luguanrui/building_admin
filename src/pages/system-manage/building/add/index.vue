<template>
  <a-drawer :title="title" :width="800" :visible="visible" :body-style="{ paddingBottom: '80px' }" @close="onClose" :maskClosable="false">
    <div class="wrapper">
      <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol" :layout="'horizontal'">
        <a-row>
          <a-col :span="24">
            <h3 class="title">楼宇信息</h3>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="楼宇名称" prop="name">
              <span v-if="disabled">{{ form.name }}</span>
              <a-input v-else v-model="form.name" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="建设单位" prop="constructCompany">
              <span v-if="disabled">{{ form.constructCompany }}</span>
              <a-input v-else v-model="form.constructCompany" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="地址" prop="address">
              <span v-if="disabled">{{ form.address }}</span>
              <a-input v-else v-model="form.address" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="物业公司" prop="propertyCompany">
              <span v-if="disabled">{{ form.propertyCompany }}</span>
              <a-input v-else v-model="form.propertyCompany" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="负责人" prop="contactName">
              <span v-if="disabled">{{ form.contactName }}</span>
              <a-input v-else v-model="form.contactName" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="联系电话" prop="contactPhone">
              <span v-if="disabled">{{ form.contactPhone }}</span>
              <a-input v-else v-model="form.contactPhone" placeholder="请输入" allowClear :maxLength="200" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24"><h3 class="title">建筑面积</h3></a-col>
          <a-col :span="span">
            <a-form-model-item label="主楼" prop="mainArea">
              <span v-if="disabled">{{ form.mainArea }}</span>
              <a-input v-else v-model="form.mainArea" placeholder="请输入" allowClear :maxLength="10" addon-after="平方米" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="单身公寓" prop="singleApartmentArea">
              <span v-if="disabled">{{ form.singleApartmentArea }}</span>
              <a-input v-else v-model="form.singleApartmentArea" placeholder="请输入" allowClear :maxLength="10" addon-after="平方米" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="主楼空置" prop="mainAreaLeft">
              <span v-if="disabled">{{ form.mainAreaLeft }}</span>
              <a-input v-else v-model="form.mainAreaLeft" placeholder="请输入" allowClear :maxLength="10" addon-after="平方米" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="副楼" prop="viceArea">
              <span v-if="disabled">{{ form.viceArea }}</span>
              <a-input v-else v-model="form.viceArea" placeholder="请输入" allowClear :maxLength="10" addon-after="平方米" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="副楼空置" prop="viceAreaLeft">
              <span v-if="disabled">{{ form.viceAreaLeft }}</span>
              <a-input v-else v-model="form.viceAreaLeft" placeholder="请输入" allowClear :maxLength="10" addon-after="平方米" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="楼宇图片上传" prop="buildingPic" :label-col="{ span: 3.5 }">
              <Upload ref="upload" @uploadSuccess="uploadSuccess" :fileObjList="form.buildingPic" :disabled="disabled" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <h3 class="title">
              <span style="margin-right: 50px">房间面积</span>
              <!-- <a-button type="primary" @click="handleAddRoom">+房间面积</a-button> -->
            </h3>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-model-item
              v-for="(item, index) in form.roomList"
              :key="index"
              label="房间类型"
              :prop="'domains.' + index + '.value'"
              :rules="{
                required: true,
                message: '必填',
                trigger: 'blur',
              }"
            >
              <a-input v-model="item.buildType" placeholder="请输入" style="width: 60%; margin-right: 8px" />
              <a-icon
                v-if="form.roomList.length > 1"
                class="dynamic-delete-button"
                type="minus-circle-o"
                :disabled="form.roomList.length === 1"
                @click="handleRemove(item)"
              />
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="dashed" style="width: 100%" @click="handleAddRoom"><a-icon type="plus" />添加房间面积</a-button>
            </a-form-model-item>
          </a-col>

          <!-- <a-col :span="7">
            <a-form-model-item label="房间类型" prop="buildType">
              <a-select v-model="item.buildType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
                <a-select-option v-for="item in roomTypeList" :value="item.key" :key="item.item">
                  {{ item.value }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="5">
            <a-form-model-item label="房号" prop="roomNum">
              <a-input v-model="item.roomNum" placeholder="请输入" allowClear :maxLength="10" />
            </a-form-model-item>
          </a-col>
          <a-col :span="7">
            <a-form-model-item label="面积" prop="area">
              <a-input v-model="item.area" placeholder="请输入" allowClear :maxLength="10" addon-after="平方米" />
            </a-form-model-item>
          </a-col>
          <a-col :span="5">
            <a-button shape="circle" icon="plus" size="small"/>
            <a-button shape="circle" icon="minus" size="small"/>
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
  </a-drawer>
</template>
<script src="./index.js"></script>
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
