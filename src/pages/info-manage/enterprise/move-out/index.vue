<template>
  <a-modal v-model="visible" title="搬迁" :width="600" @cancel="handleClose" @ok="handleSubmit" :maskClosable="false">
    <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="搬迁至" prop="inOut">
        <a-select v-model="form.inOut" placeholder="请选择" @change="handleChangeInOut">
          <a-select-option v-for="item in inOutList" :value="item.key" :key="item.key">
            {{ item.value }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <div v-if="form.inOut === 1">
        <a-form-model-item label="办公地址" prop="buildId">
          <a-select v-model="form.buildId" placeholder="请选择" allowClear @change="handleChangeBuild">
            <a-select-option v-for="item in buildingAllList" :value="item.id" :key="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="房间类型" prop="buildType">
          <a-select v-model="form.buildType" placeholder="请选择" allowClear @change="handleChangeMain"  mode="multiple">
            <a-select-option v-for="item in buildTypeList" :value="item.key" :key="item.key">
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="楼层" prop="floor">
          <a-select
            v-model="form.floor"
            placeholder="请选择"
            allowClear
            :getPopupContainer="trigger => trigger.parentNode"
            :dropdownMatchSelectWidth="false"
            @change="handleChangeFloor"
             mode="multiple"
          >
            <a-select-option v-for="item in buildingFloorList" :value="item" :key="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="房号" prop="roomNum">
          <a-select v-model="form.roomNum" placeholder="请选择" mode="multiple" allowClear :getPopupContainer="trigger => trigger.parentNode" :dropdownMatchSelectWidth="false">
            <a-select-option v-for="item in buildingRoomList" :value="item" :key="item">
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </div>
      <a-form-model-item label="区外地址" prop="moveAddress" v-if="form.inOut === 2">
        <a-input v-model="form.moveAddress" placeholder="请填写" type="textarea" :rows="4" :maxLength="500" />
      </a-form-model-item>
      <a-form-model-item label="搬离时间" prop="moveDate">
        <a-date-picker v-model="form.moveDate" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" :allowClear="true" style="width: 100%" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script src="./index.js"></script>
