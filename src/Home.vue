<template>
  <div class="content">
    <div class="nav">
      <el-button icon="el-icon-s-fold" @click="open_menu"></el-button>
      <el-button type="text" style="margin-right: 20px" @click="open_login">登录</el-button>
      <el-dialog title="登录" width="30%" :visible.sync="login_dialog_visible">
        <el-form :model="login_info">
          <el-form-item>
            <el-input v-model="login_info.user" style="width:100%;" placeholder="用户名"></el-input>
            <div style="height: 10px"></div>
            <el-input show-password v-model="login_info.password" style="width: 100%;" placeholder="密码"></el-input>
            <div style="height: 10px"></div>
            <div style="width: 100%;display: flex;justify-content: center">
              <el-button type="primary" icon="el-icon-user" style="width: 100px;">登录</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-divider></el-divider>
    <div class="main">
      <router-view></router-view>
    </div>
    <el-drawer :with-header="false" :visible.sync="drawer" direction="ltr" :show-close="false">
      <div style="padding: 10px;">
        <el-menu @select="select_menu">
          <el-menu-item index="0">
            <template slot="title">
              <i class="el-icon-s-data"></i>
              <span>总览</span>
            </template>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                用户管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                订单管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                所有商品
              </el-menu-item>
              <el-menu-item index="3-2">
                商品规格
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>主页设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">
                轮播图
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      drawer: false,
      login_dialog_visible: false,
      login_info: {
        user: '',
        password: '',
      }
    }
  }, methods: {
    open_login() {
      this.$set(this, 'login_dialog_visible', true)
    },
    open_menu() {
      this.$set(this, "drawer", true)
    }, select_menu(index) {
      if (index != null) {
        console.log(index)
        if (index === "1-1") {
          this.$router.push("/user")
        } else if (index === "0") {
          this.$router.push("/summary")
        } else if (index === "2-1") {
          this.$router.push("/order")
        } else if (index === "3-1") {
          this.$router.push("/goods")
        } else if (index === "3-2") {
          this.$router.push("/subGoods")
        } else if (index === "4-1") {
          this.$router.push("/banner")
        }
        this.$set(this, "drawer", false)
      }
    }
  }

}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  height: inherit;
}

.nav {
  padding: 10px;
  color: white;
  flex: 0;
  display: flex;
  justify-content: space-between;
}

.main {
  padding-left: 20px;
  padding-right: 20px;
  overflow: hidden;
  height: 100%;
}
</style>