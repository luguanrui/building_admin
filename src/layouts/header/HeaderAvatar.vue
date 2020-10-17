<template>
  <div>
    <a-dropdown>
      <div class="header-avatar" style="cursor: pointer">
        <!-- <a-avatar class="avatar" size="small" shape="circle" :src="user.avatar"/> -->
        <!-- <span class="name">{{user.name}}</span> -->
        <span class="name">{{ user.userName }}</span>
      </div>
      <a-menu :class="['avatar-menu']" slot="overlay">
        <!-- <a-menu-item>
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-item>
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item>
      <a-menu-divider /> -->
        <a-menu-item @click="handleUpdataPwd">
          <a-icon type="setting" />
          <span>修改密码</span>
        </a-menu-item>
        <a-menu-item @click="logout">
          <a-icon style="margin-right: 8px;" type="poweroff" />
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <UpdatePwd ref="updatePwd" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { logout } from "@/services/user";
import UpdatePwd from "./update-pwd.vue";

export default {
  name: "HeaderAvatar",
  components: { UpdatePwd },
  computed: {
    ...mapGetters("account", ["user"]),
  },
  methods: {
    logout() {
      logout();
      this.$router.push("/login");
      localStorage.clear();
    },
    handleUpdataPwd() {
      this.$nextTick(() => {
        console.log(this.$refs.updatePwd, 111);
        this.$refs.updatePwd.handleVisible("edit");
      });
    },
  },
};
</script>

<style lang="less">
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
}
</style>
