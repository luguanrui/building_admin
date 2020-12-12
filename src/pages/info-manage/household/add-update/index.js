import { mapState, mapActions } from 'vuex'
import { saveHouse, getHouse } from '@/api/index'

export default {
  data() {
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 24 },
      span: 12,

      visible: false,
      loading: false,
      dialogStatus: '', // add ,edit,detail

      form: {
        id: '',
        buildId: undefined, // 楼宇ID
        buildType: undefined, // 1-主楼；2-副楼
        floor: undefined, // 楼层
        roomNum: undefined, // 房号
        totalArea: '', // 根据房号计算的面积
        userList: [
          {
            houseRoomType: undefined, // 房屋性质：所属权；1-自住；2-租赁
            houseName: '', // 居住人姓名
            cardType: undefined, // 证件类型
            country: undefined, // 国籍
            cardNum: undefined, // 证件号码
            tempCardNum: undefined, // 暂住证号码
            sex: undefined, // 性别；1-男；2-女；
            age: undefined, // 年龄
            carNum: undefined, // 车牌号码
            userFromCopy: [],
            userFrom: '', // 籍贯
            nation: undefined, // 民族
            politicalType: undefined, // 政治面貌；0-无；1-团员；2-党员
            addressCopy: [],
            address: '', // 户籍地址
            phone: '', // 联系电话
            liveInTime: undefined, // 入住时间
          },
        ],
      },

      rules: {
        buildId: [{ required: true, message: '必填', trigger: 'blur' }],
        buildType: [{ required: true, message: '必填', trigger: 'blur' }],
        floor: [{ required: true, message: '必填', trigger: 'blur' }],
        roomNum: [{ required: true, message: '必填', trigger: 'blur' }],
        totalArea: [{ required: true, message: '必填', trigger: 'blur' }],
      },
    }
  },

  computed: {
    ...mapState('common', [
      'buildingAllList',
      'buildingFloorList',
      'buildingRoomList',
      'buildTypeList',
      'houseNatureList',
      'carTypeList',
      'countryList',
      'genderList',
      'regionList',
      'nationList',
      'politicalList',
    ]),
    title() {
      switch (this.dialogStatus) {
        case 'add':
          return '新建'
        case 'edit':
          return '编辑'
        case 'detail':
          return '详情'
        default:
          return '未知状态'
      }
    },
    // 显示详情
    disabled() {
      return this.dialogStatus === 'detail' ? true : false
    },
  },
  methods: {
    ...mapActions('common', [
      'getBuildAllList',
      'getBuildFloorList',
      'getBuildRoomList',
      'getCardTypeList',
      'getCountryList',
      'getRegionList',
      'getNationList',
      'getPoliticalList',
    ]),
    /**
     *
     * @param {*} id 项目id
     * @param {*} disabled 是否可编辑 true不可编辑，false可编辑
     */
    handleVisible(id, dialogStatus) {
      Object.assign(this.$data, this.$options.data())
      this.form.id = id || ''
      this.visible = true
      this.dialogStatus = dialogStatus

      this.getBuildAllList()
      this.getCardTypeList()
      this.getCountryList()
      this.getRegionList()
      this.getNationList()
      this.getPoliticalList()
      if (id) {
        this.getHouse()
      }
    },
    // 关闭弹窗
    onClose() {
      Object.assign(this.$data, this.$options.data())
    },
    // 选择地址
    handleChangeBuild() {
      this.form.buildType = undefined
      this.form.floor = undefined
      this.form.roomNum = undefined
      this.$store.commit('common/SET_BUILDING_FLOOR_LIST', [])
      this.$store.commit('common/SET_BUILDING_ROOM_LIST', [])
      if (this.form.buildId && this.form.buildType) {
        const params = {
          buildId: this.form.buildId,
          buildType: this.form.buildType,
        }
        this.getBuildFloorList(params)
      }
    },
    // 选择主楼副楼
    handleChangeMain() {
      this.form.floor = undefined
      this.form.roomNum = undefined
      this.$store.commit('common/SET_BUILDING_FLOOR_LIST', [])
      this.$store.commit('common/SET_BUILDING_ROOM_LIST', [])
      if (this.form.buildId && this.form.buildType) {
        const params = {
          buildId: this.form.buildId,
          buildType: this.form.buildType,
        }
        this.getBuildFloorList(params)
      }
    },
    // 选择楼层
    handleChangeFloor() {
      this.form.roomNum = undefined
      this.$store.commit('common/SET_BUILDING_ROOM_LIST', [])
      if (this.form.buildId && this.form.buildType && this.form.floor) {
        const params = {
          buildId: this.form.buildId,
          buildType: this.form.buildType,
          floor: this.form.floor,
        }
        this.getBuildRoomList(params)
      }
    },
    // 新增用户
    handleAddHousehold() {
      this.form.userList.push(this.$options.data().form.userList[0])
    },
    // 减少用户
    handleRemoveHousehold(index) {
      this.form.userList.splice(index, 1)
    },
    // 提交信息
    handleSubmit() {
      this.form.userList.map(item => {
        item.userFrom = item.userFromCopy.length ? item.userFromCopy.join() : ''
        item.address = item.addressCopy.length ? item.addressCopy.join() : ''
        delete item.userFromCopy
        delete item.addressCopy
        return item
      })
      this.$refs.form.validate(valid => {
        if (valid) {
          this.saveHouse()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // textarea详情处理
    textarea(str) {
      return str && str.replace(/\n|\r\n/g, '<br>')
    },

    findValue(arr, key) {
      let result = arr.find(item => item.key === key)
      if (result) {
        return result.value
      } else {
        return '未知类型'
      }
    },
    // 房地产
    findBuildingValue(arr, key) {
      let result = arr.find(item => item.id === key)
      if (result) {
        return result.name
      } else {
        return '未知类型'
      }
    },
    // 新增
    async saveHouse() {
      this.loading = true
      try {
        const { code } = await saveHouse(this.form)
        if (code === 200) {
          this.$message.success('业主信息新增成功！')
          this.$emit('handleSuccess')
          this.onClose()
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    // 详情
    async getHouse() {
      const { code, rs } = await getHouse({ id: this.form.id })
      if (code === 200) {
        const { id, buildId, buildType, floor, roomNum, totalArea, userList } = rs
        Object.assign(this.form, { id, buildId, buildType, floor, roomNum, totalArea, userList })
      }
    },
  },
}
