import dayjs from 'dayjs'
import { mapState, mapActions } from 'vuex'
import { saveHouse, getHouse, getBuildRoomCalc } from '@/api/index'

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
        roomNum: [], // 房号
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
            carNum: '', // 车牌号码
            userFromCopy: [],
            userFrom: '', // 籍贯
            nation: undefined, // 民族
            politicalType: undefined, // 政治面貌；0-无；1-团员；2-党员
            address: '', // 户籍地址
            phone: '', // 联系电话
            liveInTime: undefined, // 入住时间
          },
        ],
      },

      rules: {
        buildId: [{ required: true, message: '必填', trigger: 'change' }],
        buildType: [{ required: true, message: '必填', trigger: 'change' }],
        floor: [{ required: true, message: '必填', trigger: 'change' }],
        roomNum: [{ required: true, message: '必填', trigger: 'change' }],
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
    dayjs,
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
      if (dialogStatus === 'detail') {
        this.rules = {}
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
      this.form.roomNum = []
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
      this.form.roomNum = []
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
      this.form.roomNum = []
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
    // 选择房号
    handleChangeRoomNum() {
      this.getBuildRoomCalc()
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
        const params = {
          ...this.form,
          roomNum: this.form.roomNum.join()
        }
        const { code } = await saveHouse(params)
        if (code === 200) {
          if (this.dialogStatus === 'add'){
            this.$message.success('住户信息新增成功！')
          }else if (this.dialogStatus === 'edit') {
            this.$message.success('住户信息编辑成功！')
          }
          this.$emit('handleSuccess')
          this.onClose()
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    // 根据房号计算面积
    async getBuildRoomCalc() {
      const params = {
        buildId: this.form.buildId,
        buildType: this.form.buildType,
        floor: this.form.floor,
        roomNums: this.form.roomNum,
      }
      const { code, rs } = await getBuildRoomCalc(params)
      if (code === 200) {
        this.form.totalArea = rs
      }
    },
    // 详情
    async getHouse() {
      const { code, rs } = await getHouse({ id: this.form.id })
      if (code === 200) {
        const { id, buildId, buildType, floor, roomNum, totalArea, userList } = rs
        let userListCopy = []
        userList.forEach(user => {
          userListCopy.push({
            houseRoomType: user.houseRoomType, // 房屋性质：所属权；1-自住；2-租赁
            houseName: user.houseName, // 居住人姓名
            cardType: user.cardType, // 证件类型
            country: user.country, // 国籍
            cardNum: user.cardNum, // 证件号码
            tempCardNum: user.tempCardNum, // 暂住证号码
            sex: user.sex, // 性别；1-男；2-女；
            age: user.age, // 年龄
            carNum: user.carNum, // 车牌号码
            userFromCopy: [user.province, user.city, user.zone],
            userFrom: user.userFrom, // 籍贯
            nation: user.nation, // 民族
            politicalType: user.politicalType, // 政治面貌；0-无；1-团员；2-党员
            address: user.address, // 户籍地址
            phone: user.phone, // 联系电话
            liveInTime: user.liveInTime, // 入住时间
          })
        })
        Object.assign(this.form, { id, buildId, buildType, floor, roomNum: roomNum.split(','), totalArea, userList: userListCopy })
      }
    },
  },
}
