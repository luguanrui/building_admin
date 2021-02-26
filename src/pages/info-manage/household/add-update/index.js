import dayjs from 'dayjs'
import { mapState, mapActions } from 'vuex'
import { saveHouse, getHouse, getBuildRoomCalc } from '@/api/index'
import print from '@/mixins/print'

export default {
  mixins: [print],
  data() {
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 24 },
      span: 12,

      visible: false,
      loading: false,
      dialogStatus: '', // add ,edit,detail
      isRequired: true,
      form: {
        id: '',
        buildId: undefined, // 楼宇ID
        buildType: [], // 1-主楼；2-裙房
        floor: [], // 楼层
        roomNum: [], // 房号
        totalArea: '', // 根据房号计算的面积
        userList: [
          {
            houseRoomType: undefined, // 房屋性质：所属权；1-自住；2-租赁
            houseName: '', // 居住人姓名
            cardType: undefined, // 证件类型
            country: undefined, // 国籍
            countryName: '', // 国籍
            cardNum: undefined, // 证件号码
            tempCardNum: undefined, // 暂住证号码
            sex: undefined, // 性别；1-男；2-女；
            age: undefined, // 年龄
            carNum: '', // 车牌号码
            userFromCopy: [],
            userFrom: '', // 籍贯
            userFromName: '',
            nation: undefined, // 民族
            politicalType: undefined, // 政治面貌；0-无；1-团员；2-党员
            address: '', // 户籍地址
            phone: '', // 联系电话
            liveInTime: undefined, // 入住时间
            leaveDate: undefined, // 搬离日期
            remark: '', // 备注
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
      'roomTypeList',
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
    ...mapActions('common', ['getBuildAllList', 'getBuildFloorList', 'getBuildRoomList', 'getCardTypeList', 'getCountryList', 'getRegionList', 'getNationList', 'getPoliticalList', 'getRoomTypeList']),
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
      this.getRoomTypeList()
      if (id) {
        this.getHouse()
      }
      if (dialogStatus === 'detail') {
        this.rules = {}
        this.isRequired = false
      }
    },
    // 关闭弹窗
    onClose() {
      Object.assign(this.$data, this.$options.data())
    },
    // 选择地址
    handleChangeBuild() {
      this.form.buildType = []
      this.form.floor = []
      this.form.roomNum = []
      this.form.totalArea = ''
      this.$store.commit('common/SET_BUILDING_FLOOR_LIST', [])
      this.$store.commit('common/SET_BUILDING_ROOM_LIST', [])
      if (this.form.buildId && this.form.buildType.length) {
        const params = {
          buildId: this.form.buildId,
          buildType: this.form.buildType.join(),
        }
        this.getBuildFloorList(params)
      }
    },
    // 选择主楼裙房
    handleChangeMain() {
      this.form.floor = []
      this.form.roomNum = []
      this.form.totalArea = ''
      this.$store.commit('common/SET_BUILDING_FLOOR_LIST', [])
      this.$store.commit('common/SET_BUILDING_ROOM_LIST', [])
      if (this.form.buildId && this.form.buildType.length) {
        const params = {
          buildId: this.form.buildId,
          buildType: this.form.buildType.join(),
        }
        this.getBuildFloorList(params)
      }
    },
    // 选择楼层
    handleChangeFloor() {
      this.form.roomNum = []
      this.form.totalArea = ''
      this.$store.commit('common/SET_BUILDING_ROOM_LIST', [])
      if (this.form.buildId && this.form.buildType.length && this.form.floor.length) {
        const params = {
          buildId: this.form.buildId,
          buildType: this.form.buildType.join(),
          floor: this.form.floor.join(),
        }
        this.getBuildRoomList(params)
      }
    },
    // 选择房号
    handleChangeRoomNum() {
      if (this.form.roomNum.length) {
        this.getBuildRoomCalc()
      } else {
        this.form.totalArea = ''
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
    handleChangeuserFromCopy(val, select) {
      console.log(val, select)
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
    // 房间类型
    buildTypeName(arr, key) {
      let result = []
      key.forEach(id => {
        arr.forEach(item => {
          if (item.key === id) {
            result.push(item.value)
          }
        })
      })
      return result.join()
    },
    findCountryValue(arr, key) {
      let result = arr.find(item => item.key === key)
      if (result) {
        return result.value
      } else {
        return key
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
    // 校验
    houseRoomTypeValid(rule, value, callback) {
      console.log(rule, 'rule')
      if (!value) {
        callback(new Error('必填'))
      } else {
        callback()
      }
    },
    handleSearch(value, index) {
      this.form.userList[index].country = !isNaN(value) && value != '' ? this.countryList[value].value : value
    },
    handleBlur(value, index) {
      this.form.userList[index].country = value
    },
    // 新增
    async saveHouse() {
      this.loading = true
      try {
        const params = {
          ...this.form,
          roomNum: this.form.roomNum.join(),
        }
        const { code } = await saveHouse(params)
        if (code === 200) {
          if (this.dialogStatus === 'add') {
            this.$message.success('住户信息新增成功！')
          } else if (this.dialogStatus === 'edit') {
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
          // 其他国籍
          const isCountry = this.countryList.find(country => country.key == user.country)
          if (isCountry) {
            user.country = user.country * 1
          }
          userListCopy.push({
            houseRoomType: user.houseRoomType, // 房屋性质：所属权；1-自住；2-租赁
            houseName: user.houseName, // 居住人姓名
            cardType: user.cardType, // 证件类型
            country: user.country, // 国籍
            countryName: user.countryName, // 国籍
            cardNum: user.cardNum, // 证件号码
            tempCardNum: user.tempCardNum, // 暂住证号码
            sex: user.sex, // 性别；1-男；2-女；
            age: user.age, // 年龄
            carNum: user.carNum, // 车牌号码
            userFromCopy: user.userFrom ? user.userFrom.split(',').map(item => Number(item)) : [],
            userFromName: user.userFromName,
            userFrom: user.userFrom, // 籍贯
            nation: user.nation, // 民族
            politicalType: user.politicalType, // 政治面貌；0-无；1-团员；2-党员
            address: user.address, // 户籍地址
            phone: user.phone, // 联系电话
            liveInTime: user.liveInTime, // 入住时间
            leaveDate: user.leaveDate, // 搬离日期
            remark: user.remark, // 备注
          })
        })
        Object.assign(this.form, {
          id,
          buildId,
          buildType: buildType.split(',').map(item => Number(item)),
          floor: floor.split(',').map(item => Number(item)),
          roomNum: roomNum.split(','),
          totalArea,
          userList: userListCopy,
        })
      }
    },
  },
}
