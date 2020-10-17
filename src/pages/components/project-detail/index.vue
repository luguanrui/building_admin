<template>
  <a-form-model ref="form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <h3 class="title">基本信息</h3>
    <a-form-model-item label="初建项目名称" prop="projectShowName">
      <span v-if="disabled">{{ form.projectShowName }}</span>
      <a-input v-else v-model="form.projectShowName" placeholder="请输入" allowClear />
    </a-form-model-item>
    <a-form-model-item label="产业类别">
      <span v-if="disabled">{{ form.industryTypeName }}</span>
      <a-select v-else v-model="form.industryType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode">
        <a-select-option v-for="item in industryList" :value="item.key" :key="item.item">
          {{ item.value }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="投资方名称" prop="investName">
      <span v-if="disabled">{{ form.investName }}</span>
      <a-input v-else v-model="form.investName" placeholder="请输入" allowClear />
    </a-form-model-item>
    <a-form-model-item label="投资方所属">
      <span v-if="disabled">{{ form.investFromText }}</span>
      <a-cascader
        v-else
        placeholder="请选择"
        allowClear
        change-on-select
        v-model="form.investFrom"
        :options="regionList"
        :field-names="{ label: 'name', value: 'id', children: 'childList' }"
      />
    </a-form-model-item>
    <a-form-model-item label="总投资" prop="investMoney">
      <div style="display: flex;">
        <span v-if="disabled">{{ form.investMoney }}</span>
        <a-input v-else v-model="form.investMoney" placeholder="请输入" allowClear style="flex: 1;margin-right: 5px" />
        <span v-if="disabled">{{ moneyTypeList.find((item) => item.key === form.moneyType).value }}</span>
        <a-select v-else v-model="form.moneyType" placeholder="请选择" style="width: 80px" :getPopupContainer="trigger => trigger.parentNode">
          <a-select-option v-for="item in moneyTypeList" :value="item.key" :key="item.key">
            {{ item.value }}
          </a-select-option>
        </a-select>
      </div>
    </a-form-model-item>
    <a-form-model-item label="投资方联系人" prop="investContactName">
      <span v-if="disabled">{{ form.investContactName }}</span>
      <a-input v-else v-model="form.investContactName" placeholder="请输入" allowClear/>
    </a-form-model-item>
    <a-form-model-item label="投资方电话" prop="investContactPhone">
      <span v-if="disabled">{{ form.investContactPhone }}</span>
      <a-input v-else v-model="form.investContactPhone" placeholder="请输入" allowClear :maxLength="11"/>
    </a-form-model-item>
    <a-form-model-item label="项目概况">
      <span v-if="disabled" v-html="textarea(form.projectDesc)"></span>
      <a-input v-else v-model="form.projectDesc" placeholder="请输入" type="textarea" :rows="8" />
    </a-form-model-item>
    <a-form-model-item label="是否打算合作招商">
      <span v-if="disabled">{{ whetherList.find((item) => item.key === form.cooperate).value }}</span>
      <a-radio-group v-model="form.cooperate" v-else>
        <a-radio v-for="item in whetherList" :key="item.key" :value="item.key">{{ item.value }}</a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="建设性质" prop="constructionType">
      <span v-if="disabled">{{ form.constructionTypeName }}</span>
      <a-select v-else v-model="form.constructionType" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode">
        <a-select-option v-for="item in constructionList" :value="item.key" :key="item.item">
          {{ item.value }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <!-- 是否重点关注项目 -->
    <slot name="isImportant"></slot>

    <a-form-model-item label="责任单位" prop="projectAreaId">  
      <span v-if="disabled">{{ form.projectAreaName }}</span>
      <a-select v-else v-model="form.projectAreaId" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode">
        <a-select-option v-for="item in permissionAreaList" :value="item.key" :key="item.item">
          {{ item.value }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="责任单位联系人" prop="contactUserId">  
      <span v-if="disabled">{{ form.createUserName}}</span>
      <a-select v-else v-model="form.contactUserId" placeholder="请选择" allowClear :getPopupContainer="trigger => trigger.parentNode">
        <a-select-option v-for="item in permissionUserList" :value="item.userId" :key="item.userId">
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="联系人电话" prop="contactPhone">
      <span v-if="disabled">{{ form.contactPhone }}</span>
      <a-input v-else v-model="form.contactPhone" placeholder="请输入" allowClear :maxLength="11"/>
    </a-form-model-item>

    <h3 class="title">项目进展信息</h3>
    <a-form-model-item label="目前进展">
      <span v-if="disabled" v-html="textarea(form.progress)"></span>
      <a-input v-else v-model="form.progress" placeholder="请输入" type="textarea" :rows="8" :disabled="true" />
      <div v-if="!disabled">
        <a-button type="primary" @click="handleProgress"><a-icon type="plus" />项目进展</a-button>
      </div>
    </a-form-model-item>

    <h3 class="title">引荐人信息</h3>
    <a-form-model-item label="是否有引荐人">
      <span v-if="disabled">{{ form.hasRecStr }}</span>
      <a-radio-group v-model="form.hasRec" v-else>
        <a-radio v-for="item in whetherList" :key="item.key" :value="item.key">{{ item.value }}</a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="引荐人" prop="recName" v-if="form.hasRec">
      <span v-if="disabled">{{ form.recName }}</span>
      <a-input v-else v-model="form.recName" placeholder="请输入" allowClear />
    </a-form-model-item>
    <a-form-model-item label="引荐人电话" prop="recNamePhone" v-if="form.hasRec">
      <span v-if="disabled">{{ form.recNamePhone }}</span>
      <a-input v-else v-model="form.recNamePhone" placeholder="请输入" allowClear />
    </a-form-model-item>
    <a-form-model-item label="引荐人佐证材料" prop="recAppendList" v-if="form.hasRec">
      <Upload ref="upload" @uploadSuccess="uploadSuccess" :fileObjList="form.recAppendList" :disabled="disabled"/>
    </a-form-model-item>
    <a-form-model-item label="材料说明" prop="usefulDetail" v-if="form.hasRec">
      <span v-if="disabled" v-html="textarea(form.usefulDetail)"></span>
      <a-input v-else v-model="form.usefulDetail" placeholder="请输入" type="textarea" :rows="8" />
    </a-form-model-item>
    <slot name="otherInfo"></slot>
    <AddProgress ref="addProgress" @handleAddProgress="handleAddProgress" />
  </a-form-model>
</template>
<script src="./index"></script>
<style lang="less" scoped>
.title {
  border-left: 3px solid #1890ff;
  padding-left: 10px;
}
</style>
