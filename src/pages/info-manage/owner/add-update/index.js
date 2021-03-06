import { mapState, mapActions } from 'vuex'
import { saveOwner, getOwner, getBuildRoomCalc,exportOwner } from '@/api/index'
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

      form: {
        id: '',
        buildId: undefined, // 楼宇名称
        buildType: [], // 	0-无；1-主楼；2-裙房
        floor: [], // 楼层
        roomNum: [], // 房号
        totalArea: '', // 面积
        ownerName: '', // 产权所有人
        cardType: undefined, // 证件类型
        country: undefined, // 国籍
        cardNum: '', // 证件号码
        phone: '', // 联系电话
        ownerCardNo: '', // 产权证号
        carNum: '', // 车牌号码
        ownerContact: '',
      },

      rules: {
        buildId: [{ required: true, message: '必填', trigger: 'blur' }],
        floor: [{ required: true, message: '必填', trigger: 'blur' }],
        roomNum: [{ required: true, message: '必填', trigger: 'blur' }],
        totalArea: [{ required: true, message: '必填', trigger: 'blur' }],
        ownerName: [{ required: true, message: '必填', trigger: 'blur' }],
        cardType: [{ required: true, message: '必填', trigger: 'blur' }],
        country: [{ required: true, message: '必填', trigger: 'blur' }],
        ownerContact: [{ required: true, message: '必填', trigger: 'blur' }],
        phone: [{ required: true, message: '必填', trigger: 'blur' }],
        cardNum: [{ required: true, message: '必填', trigger: 'blur' }],
      },
      downLoading: false
    }
  },

  computed: {
    ...mapState('common', ['buildingAllList', 'buildingFloorList', 'buildingRoomList', 'buildTypeList', 'countryList', 'carTypeList']),
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
    ...mapActions('common', ['getBuildAllList', 'getBuildFloorList', 'getBuildRoomList', 'getCountryList', 'getCardTypeList']),
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
      this.getCountryList()
      this.getCardTypeList()
      if (id) {
        this.getOwner()
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
    // 提交信息
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.saveOwner()
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
    // 选择房号
    handleChangeRoomNum() {
      if (this.form.roomNum.length) {
        this.getBuildRoomCalc()
      } else {
        this.form.totalArea = ''
      }
    },
    handleSearch(value) {
      this.form.country = !isNaN(value) && value != '' ? this.countryList[value].value : value
    },
    handleBlur(value) {
      this.form.country = value
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
    // 新增
    async saveOwner() {
      this.loading = true
      try {
        const params = {
          ...this.form,
          roomNum: this.form.roomNum.join(),
        }
        const { code } = await saveOwner(params)
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
    async getOwner() {
      const { code, rs } = await getOwner({ id: this.form.id })
      if (code === 200) {
        const { id, buildId, buildType, floor, roomNum, totalArea, ownerName, cardType, country, cardNum, phone, ownerCardNo, carNum,ownerContact } = rs
        // Object.keys(this.form).forEach(key => this.form[key] = rs[key])
        // this.form.roomNum = this.form.roomNum.split(',')
        Object.assign(this.form, { id, buildId, buildType:buildType.split(',').map(item=> Number(item)), floor:floor.split(',').map(item=> Number(item)), roomNum: roomNum.split(','), totalArea, ownerName, cardType, country, cardNum, phone, ownerCardNo, carNum,ownerContact })

        // 其他国籍
        const isCountry = this.countryList.find(country => country.key == this.form.country)
        if (isCountry) {
          this.form.country = this.form.country * 1
        }
      }
    },
    handleDownLoad() {
      this.exportOwner()
    },
    // 导出
    async exportOwner() {
      try {
        this.downLoading = true
        let result = await exportOwner({id: this.form.id})
        if (result) {
          this.downLoading = false
        }

        let blob = new Blob([result], {
          type: 'application/vnd.ms-excel,charset=UTF-8',
        })

        let fileName = `${this.form.ownerName}.xlsx`
        this.downFile(blob, fileName)
      } catch (err) {
        this.downLoading = false
      }
    },
    // 下载
    downFile(blob, fileName) {
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName)
      } else {
        var link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click()
        window.URL.revokeObjectURL(link.href)
      }
    },
  },
}
