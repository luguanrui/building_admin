<template>
  <div class="login-wrapper">
    <div class="bg"></div>
      <div class="login-content">
      <div class="header">
        <!-- <img alt="logo" class="logo" src="@/assets/img/logo.png" /> -->
        <span class="title">楼宇管理系统</span>
      </div>
      <div class="left-bg"></div>
      <div class="login">
        <a-form-model :model="form">
          <a-alert
            type="error"
            :closable="true"
            v-show="error"
            :message="error"
            showIcon
            style="margin-bottom: 24px;"
          />
          <div class="welcome-wrapper">
            <div class="line"></div>
            <h3 class="text">欢迎使用系统,请登录</h3>
            <div class="line"></div>
          </div>
          <a-form-model-item prop="userName">
            <a-input v-model="form.userName" autocomplete="autocomplete" size="large" placeholder="用户名">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password">
            <a-input
              v-model="form.password"
              size="large"
              placeholder="密码"
              autocomplete="autocomplete"
              type="password"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button
              :loading="logging"
              style="width: 100%;margin-top: 24px"
              size="large"
              htmlType="submit"
              type="primary"
              @click="onSubmit"
              >登录</a-button
            >
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
// import CommonLayout from '@/layouts/CommonLayout'
import { getRoutesConfig } from '@/services/user'
import { setAuthorization } from '@/utils/request'
import { loadRoutes } from '@/utils/routerUtil'
import { mapMutations } from 'vuex'
// import { login } from '@/api/common'

export default {
  name: 'Login',
  // components: { CommonLayout },
  data() {
    return {
      logging: false,
      error: '',
      form: {
        userName: '',
        password: '',
      },
    }
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName
    },
  },
  mounted() {
    localStorage.clear()
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    // async login() {
    //   const params = {
    //     userName: this.form.userName,
    //     password: this.form.password,
    //   }
    //   const { code, rs } = await login(params)
    //   if (code === 200) {
    //     localStorage.setItem('sessionId', rs.sessionId)
    //     this.setUser(rs)
    //     this.$router.push('/workplace')
    //   }
    // },
    onSubmit() {
      this.$router.push('/info-manage/building')
      // this.login()
      // this.$router.push("/workplace");
      // e.preventDefault();
      // this.form.validateFields((err) => {
      //   if (!err) {
      //     this.logging = true;
      //     // const userName = this.form.getFieldValue("userName");
      //     // const password = this.form.getFieldValue("password");
      //     // login(name, password).then(this.afterLogin);
      //     this.login()
      //   }
      // });
    },
    afterLogin(res) {
      this.logging = false
      const loginRes = res.data
      if (loginRes.code >= 0) {
        const { user, permissions, roles } = loginRes.data
        this.setUser(user)
        this.setPermissions(permissions)
        this.setRoles(roles)
        setAuthorization({
          token: loginRes.data.token,
          expireAt: new Date(loginRes.data.expireAt),
        })
        // 获取路由配置
        getRoutesConfig().then(result => {
          const routesConfig = result.data.data
          loadRoutes({ router: this.$router, store: this.$store, i18n: this.$i18n }, routesConfig)
          this.$router.push('/workplace')
          this.$message.success(loginRes.message, 3)
        })
      } else {
        this.error = loginRes.message
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-wrapper {
  position: relative;
  background-color: #2886e8;
  height: 100%;
  &::before {
    content: '';
    display: table;
  }
  &::after {
    clear: both;
  }
  .bg {
    background: url(./images/bg_sta.png) no-repeat;
    width: 100%;
    height: 494px;
    position: absolute;
    z-index: 2;
    background-size: contain;
  }
  .login-content {
    width: 100%;
    padding: 0 50px;
    &::before {
      content: '';
      display: table;
    }
    &::after {
      clear: both;
    }
    .header {
      font-size: 36px;
      color: #fff;
      font-weight: 700;
      margin-top: 50px;
    }
    .left-bg {
      background: url(./images/bg_copy.png) no-repeat;
      width: 520px;
      height: 390px;
      position: absolute;
      z-index: 1;
      background-size: contain;
      bottom: 200px;
    }
  }
  .login {
    padding: 30px;
    margin: 0 auto;
    background: #fff;
    width: 460px;
    background-color: #fff;
    box-shadow: 0px 0px 13px #fff;
    position: absolute;
    z-index: 3;
    right: 50px;
    top: 150px;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }
    .welcome-wrapper {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .line {
        width: 100px;
        height: 2px;
        background-color: #2886e8;
      }
      .text {
        display: inline-block;
        font-size: 16px;
        color: #2886e8;
        font-weight: 300;
      }
    }
    .icon {
      font-size: 24px;
      color: @text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
