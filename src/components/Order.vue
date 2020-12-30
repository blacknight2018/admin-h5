<template>
  <div class="content">
    <div style="width: 100%;flex: 1;height: 100%;overflow-y: scroll">
      <el-table :data="table_data" v-loading="table_loading">
        <el-table-column label="ID" prop="id" width="80"></el-table-column>
        <el-table-column label="收货人" prop="nick_name" width="120"></el-table-column>
        <el-table-column label="联系电话" prop="phone" width="160"></el-table-column>
        <el-table-column label="总计金额" prop="total_price" width="160"></el-table-column>
        <el-table-column label="收货地址" prop="detail" width="320"></el-table-column>
        <el-table-column label="创建时间" prop="create_time"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">未支付</el-tag>
            <el-tag v-else-if="scope.row.status===1" type="success">已支付</el-tag>
            <el-tag v-else-if="scope.row.status===2" type="danger">未发货</el-tag>
            <el-tag v-else-if="scope.row.status===3" type="warning">已发货</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
  name: "Order",
  data() {
    return {
      limit: 11,
      offset: 0,
      total: 0,
      current_page: 0,
      table_loading: false,
      table_data: [
        {
          "id": 2,
          "user_id": 0,
          "nick_name": "吴浩东",
          "sex": "F",
          "phone": "13078255125",
          "detail": "中大南方",
          "sub_goods": "[3]",
          "status": 1,
          "total_price": 44,
          "create_time": "2020-12-18 19:38:40",
          "update_time": "2020-12-21 01:20:37",
          "delivery_code": ""
        }
      ],
    }
  },
  mounted() {
    this.get_data()
  },
  methods: {
    current_change(i) {
      this.$set(this, 'table_loading', true)
      this.$set(this, 'offset', this.limit * (Number(i - 1)))
      this.get_data();
    },
    get_data() {
      this.$set(this, 'table_data', [])
      this.$http.get(this.server + "/order", {
        params: {
          limit: this.limit,
          offset: this.offset
        }
      }).then(response => {
        for (let i = 0; i < response.body.data.order.length; i++) {
          let obj = response.body.data.order[i]
          obj.sub_goods = JSON.parse(obj.sub_goods)
        }
        this.$set(this, 'table_data', response.body.data.order)
        this.$set(this, 'total', response.body.data.total)
        this.$set(this, 'table_loading', false)
      })
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