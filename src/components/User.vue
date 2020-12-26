<template>
  <div class="content">
    <div style="width: 380px;display: flex;flex:0">
      <el-input prefix-icon="el-icon-search" v-model="search_nick_name" placeholder="请输入搜索内容"></el-input>
      <el-button icon="el-icon-search" style="flex:0;margin-left: 20px;" @click="search"
                 :loading="search_loading"></el-button>
    </div>
    <el-table
        v-loading="table_loading"
        :data="table_data"
        style="width: 100%;flex:1">
      <el-table-column label="" width="100">
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar" style="width: 50px;height: 50px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="ID" width="80" prop="id"></el-table-column>
      <el-table-column
          prop="create_time"
          label="创建日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="nick_name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号码">
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change="current_change"
        style="flex:0"
        background
        layout="prev, pager, next"
        :current-page.sync="current_page"
        :total="total" :page-size="limit">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "User",
  methods: {
    current_change(i) {
      this.$set(this, 'table_loading', true)
      this.$set(this, 'offset', this.limit * (Number(i - 1)))
      this.get_data();
    },
    get_data() {
      this.$set(this, 'table_loading', true)
      this.$set(this, 'table_data', [])
      this.$http.get(this.server + "/user", {
        params: {
          nick_name: this.search_nick_name,
          limit: this.limit,
          offset: this.offset
        }
      }).then(response => {
        this.$set(this, 'table_data', response.body.data.user)
        this.$set(this, 'total', response.body.data.total)
        this.$set(this, 'search_loading', false)
        this.$set(this, 'table_loading', false)
      })
    },
    search() {
      this.$set(this, 'search_loading', true)
      this.$set(this, 'offset', 0)
      this.$set(this, 'current_page', 0)
      this.get_data();
    }
  },
  data() {
    return {
      search_nick_name: '',
      search_loading: false,
      table_loading: false,
      limit: 6,
      offset: 0,
      current_page: 0,
      "total": 0,
      table_data: [{
        "id": 1,
        "phone": "13078255125",
        "avatar": "https://img.alicdn.com/imgextra/i3/727807374/TB2WRIdvrZnBKNjSZFhXXc.oXXa_!!727807374-0-beehive-https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2207651980344/O1CN01DQZzo91EPatK9E2Rc_!!2207651980344.jpg_430x430q90.jpg",
        "nick_name": "Apple",
        "create_time": "2020-12-09 23:03:55",
        "update_time": "2020-12-17 11:03:42"
      }]
    }
  }
}
</script>

<style scoped>
.content {
  height: 96%;
  display: flex;
  flex-direction: column;
}
</style>