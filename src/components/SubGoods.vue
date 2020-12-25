<template>
  <div class="content">
    <div style="flex:0">
      <span style="margin-right: 10px;">所属商品</span>
      <el-select></el-select>
    </div>
    <el-divider></el-divider>
    <div style="overflow-y: scroll">
      <el-dialog :visible.sync="dialogVisible">
        <el-form label-width="80px">
          <el-form-item label="规格ID">
            100
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input suffix-icon="el-icon-price-tag" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="商品库存">
            <el-input suffix-icon="el-icon-box" style="width: 100px;"></el-input>
          </el-form-item>
          <el-form-item label="商品销量">
            <el-input suffix-icon="el-icon-sell" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="商品规格">


            <el-collapse>
              <el-collapse-item>
                <el-form label-width="50px">
                  <el-form-item label="大小">
                    <el-select value="0">
                      <el-option value="0">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <br>
                  <el-form-item label="重量">
                    <el-select>
                      <el-option value="0">

                      </el-option>
                      <el-option value="1">

                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-collapse-item>
            </el-collapse>


          </el-form-item>
          <el-form-item label="创建时间">
            2020/12/25 13:20
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList"
                list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
        </div>
      </el-dialog>
      <el-table
          @row-click="open_detail"
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubGoods",
  methods: {
    open_detail() {
      this.$set(this, 'dialogVisible', true)
    }
  },
  data() {
    return {
      dialogVisible: false,
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
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