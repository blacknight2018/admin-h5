<template>
  <div class="content">
    <div style="width: 380px;display: flex;flex:0">
      <el-input prefix-icon="el-icon-search" placeholder="请输入搜索内容"></el-input>
      <el-button icon="el-icon-search" style="flex:0;margin-left: 20px;"></el-button>
    </div>
    <el-table :data="goods" style="width: 100%" @row-click="open_goods">
      <el-table-column label="" width="100">
        <template slot-scope="scope">
          <el-image :src="scope.row.banner[0]" style="width: 50px;height: 50px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="80">

      </el-table-column>
      <el-table-column prop="title" label="名称" width="180">

      </el-table-column>

      <el-table-column prop="desc" label="描述" width="180">

      </el-table-column>

      <el-table-column label="创建时间" prop="create_time">

      </el-table-column>


    </el-table>
    <el-pagination
        style="flex:0"
        background
        layout="prev, pager, next"
        :total="1000">
    </el-pagination>
    <el-dialog title="商品详细" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品ID" :label-width="formLabelWidth">1</el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" style="width: 260px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细描述" :label-width="formLabelWidth">
          <el-input style="width: 360px"></el-input>
        </el-form-item>
        <el-form-item label="规格模板" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="轮播图" :label-width="formLabelWidth">
          <el-collapse>
            <el-collapse-item title="">
              <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :file-list="fileList"
                  list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-collapse-item>
          </el-collapse>
        </el-form-item>
        <el-form-item label="商品详细" :label-width="formLabelWidth">
          <el-collapse>
            <el-collapse-item title="">
              <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :file-list="fileList"
                  list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-collapse-item>
          </el-collapse>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Goods",
  methods: {
    open_goods(row, column, event) {
      console.log(row, column, event)
      this.$set(this, 'dialogFormVisible', true)
    }
  },
  data() {
    return {
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      goods: [
        {
          id: 1,
          desc: '非常好吃的死老鼠',
          title: '三只松鼠',
          banner: ["https://gd2.alicdn.com/imgextra/i2/673449915/TB2suWKXLNNTKJjSspfXXbXIFXa_!!673449915.jpg"],
          create_time: '2012-02-02',
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px'
    }
  }

}
</script>

<style scoped>
.content {
  height: 96%;
}
</style>