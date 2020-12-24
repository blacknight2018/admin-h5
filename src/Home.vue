<template>
  <div class="content">
    <div class="nav">
      <el-button icon="el-icon-s-fold" @click="open_menu"></el-button>
      <el-divider></el-divider>
    </div>
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
      drawer: false
    }
  }, methods: {
    open_menu() {
      this.$set(this, "drawer", true)
    }, select_menu(index) {
      if (index != null) {
        if (index === "1-1") {
          this.$set(this, "drawer", false)
          this.$router.push("/user")
        } else if (index === "0") {
          this.$router.push("/summary")
        }
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
}

.main {
  padding-left: 20px;
  padding-right: 20px;
  overflow: hidden;
}
</style>