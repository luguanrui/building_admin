import { mapState, mapActions } from 'vuex'
import { companyMove } from '@/api/index'

export default {
  data() {
    return {
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      inOutList: [
        { key: 1, value: '区内' },
        { key: 2, value: '区外' },
      ],
      form: {
        companyId: '',
        inOut: undefined, // 区内、区外
        buildId: undefined, // 楼宇ID
        buildType: undefined, // 主楼裙房
        floor: undefined, // 楼层
        roomNum: [], // 房号
        moveDate: '', // 搬离时间
        moveAddress: '', // 区外地址
      },
      rules: {
        companyId: [{ required: true, message: '必填', trigger: 'blur' }],
        inOut: [{ required: true, message: '必填', trigger: 'change' }],
        buildId: [{ required: true, message: '必填', trigger: 'change' }],
        buildType: [{ required: true, message: '必填', trigger: 'change' }],
        floor: [{ required: true, message: '必填', trigger: 'change' }],
        roomNum: [{ required: true, message: '必填', trigger: 'change' }],
      },
    }
  },
  computed: {
    ...mapState('common', ['buildingAllList', 'buildTypeList', 'buildingFloorList', 'buildingRoomList']),
  },
  methods: {
    ...mapActions('common', ['getBuildAllList', 'getBuildFloorList', 'getBuildRoomList', 'getRoomTypeList']),
    // 打开
    handleVisible(companyId) {
      Object.assign(this.$data, this.$options.data())
      this.form.companyId = companyId
      this.visible = true
      // 查询楼宇列表（分页）
      this.getBuildAllList()
    },
    // 关闭
    handleClose() {
      Object.assign(this.$data, this.$options.data())
    },
    handleChangeInOut() {
      if (this.form.inOut === 1) {
        this.rules = {
          companyId: [{ required: true, message: '必填', trigger: 'blur' }],
          inOut: [{ required: true, message: '必填', trigger: 'change' }],
          buildId: [{ required: true, message: '必填', trigger: 'change' }],
          buildType: [{ required: true, message: '必填', trigger: 'change' }],
          floor: [{ required: true, message: '必填', trigger: 'change' }],
          roomNum: [{ required: true, message: '必填', trigger: 'change' }],
        }
      } else {
        this.rules = {
          companyId: [{ required: true, message: '必填', trigger: 'blur' }],
          inOut: [{ required: true, message: '必填', trigger: 'change' }],
          moveAddress: [{ required: true, message: '必填', trigger: 'blur' }],
        }
      }
    },
    // 选择地址
    handleChangeBuild() {
      this.form.buildType = undefined
      this.form.floor = undefined
      this.form.roomNum = []
      this.form.workRoomArea = ''
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
    // 选择主楼裙房
    handleChangeMain() {
      this.form.floor = undefined
      this.form.roomNum = []
      this.form.workRoomArea = ''
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
      this.form.workRoomArea = ''
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
    // 提交
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.companyMove(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async companyMove(params) {
      const { code } = await companyMove(params)
      if (code === 200) {
        this.visible = false
        this.$emit('handleSuccess')
      }
    },
  },
}
