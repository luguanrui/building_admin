<template>
  <a-drawer :title="title" :width="800" :visible="visible" :body-style="{ paddingBottom: '53px' }" @close="onClose" :maskClosable="false">
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
            <a-form-model-item label="负责人" prop="contactUserId">
              <span v-if="disabled">{{ form.contactName }}</span>
              <a-select v-else v-model="form.contactUserId" placeholder="请选择" allowClear style="width: 100%" @change="handleContact">
                <a-select-option v-for="item in userList" :value="item.userId" :key="item.userId">
                  {{ item.realName }}
                </a-select-option>
              </a-select>
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
              <span v-if="disabled">{{ form.mainArea }}&nbsp;&nbsp;平方米</span>
              <a-input v-else v-model="form.mainArea" placeholder="请输入" allowClear :maxLength="10" addon-after="平方米" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="单身公寓" prop="singleApartmentArea">
              <span v-if="disabled">{{ form.singleApartmentArea }}&nbsp;&nbsp;平方米</span>
              <a-input v-else v-model="form.singleApartmentArea" placeholder="请输入" allowClear :maxLength="10" addon-after="平方米" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="主楼空置" prop="mainAreaLeft">
              <span v-if="disabled">{{ form.mainAreaLeft }}&nbsp;&nbsp;平方米</span>
              <a-input v-else v-model="form.mainAreaLeft" placeholder="请输入" allowClear :maxLength="10" addon-after="平方米" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="裙房" prop="viceArea">
              <span v-if="disabled">{{ form.viceArea }}&nbsp;&nbsp;平方米</span>
              <a-input v-else v-model="form.viceArea" placeholder="请输入" allowClear :maxLength="10" addon-after="平方米" />
            </a-form-model-item>
          </a-col>
          <a-col :span="span">
            <a-form-model-item label="裙房空置" prop="viceAreaLeft">
              <span v-if="disabled">{{ form.viceAreaLeft }}&nbsp;&nbsp;平方米</span>
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
              <a-button type="primary" style="margin-right: 10px" @click="handleImport" v-if="dialogStatus == 'edit'">导入</a-button>
            </h3>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-model-item
              v-for="(item, index) in form.roomList"
              :key="index"
              label=""
              :rules="{
                required: true,
                message: '必填',
                trigger: 'blur',
              }"
            >
              <div v-if="disabled" style="margin-left: 20px">
                <span style="margin-right: 18px"><span>房间类型：</span>{{ findValue(buildTypeList, item.buildType) }}</span>
                <span style="margin-right: 18px"><span>楼层：</span>{{ item.floor }}&nbsp;&nbsp;层</span>
                <span style="margin-right: 18px"><span>房号：</span>{{ item.roomNum }}&nbsp;&nbsp;号</span>
                <span style="margin-right: 18px"><span>面积：</span>{{ item.area }}&nbsp;&nbsp;平方米</span>
              </div>
              <div v-else style="margin-left: 20px">
                <span>房间类型：</span>
                <a-select v-model="item.buildType" placeholder="请选择" allowClear style="width: 100px; margin-right: 10px">
                  <a-select-option v-for="item in buildTypeList" :value="item.key" :key="item.key">
                    {{ item.value }}
                  </a-select-option>
                </a-select>
                <span>楼层：</span><a-input v-model="item.floor" placeholder="请输入" addon-after="层" style="width: 110px; margin-right: 10px" /> <span>房号：</span
                ><a-input v-model="item.roomNum" placeholder="请输入" addon-after="号" style="width: 110px; margin-right: 10px" /> <span>面积：</span
                ><a-input v-model="item.area" placeholder="请输入" addon-after="平方米" style="width: 140px; margin-right: 10px" />
                <a-icon class="dynamic-delete-button" type="minus-circle-o" :disabled="form.roomList.length === 1" @click="handleRemove(item)" />
              </div>
            </a-form-model-item>
            <a-form-model-item v-if="!disabled" style="margin-top: 20px">
              <a-button type="dashed" style="width: 100%" @click="handleAddRoom"><a-icon type="plus" />添加房间面积</a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
      <!-- 导入 -->
      <a-modal v-model="importVisible" title="导入数据" @ok="handleConfirmImport" :maskClosable="false">
        <div class="step">
          <h5>使用模板并按照要求填写</h5>
          <p>使用导入模板，可以保证所有信息统一</p>
          <a :href="templateUrl" title="点击下载模板"><a-icon type="cloud-download" />&nbsp;&nbsp;模板下载</a>
        </div>
        <div class="step" v-if="visible">
          <h5>上传文件</h5>
          <p>导入按照模板要求填写的Excel文件</p>
          <a-upload-dragger v-if="showUploadFile" name="file" :multiple="false" @change="handleChangeUpload" :customRequest="customRequest" :show-upload-list="false">
            <p class="ant-upload-drag-icon">
              <a-icon type="cloud-upload" />
            </p>
            <p class="ant-upload-text">
              点击或拖拽上传
            </p>
          </a-upload-dragger>
          <div class="file-content" v-else>
            <span>{{ fileName }}</span>
            <a-icon type="delete" class="delete" @click="handleRemoveFile" />
          </div>
        </div>
      </a-modal>
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
      <a-button type="primary" @click="onClose">
        关闭
      </a-button>
    </div>
  </a-drawer>
</template>
<script src="./index.js"></script>
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
.step {
  margin-bottom: 20px;
  h5 {
    font-size: 14px;
  }
  p {
    font-size: 12px;
  }
}
</style>
