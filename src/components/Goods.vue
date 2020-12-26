<template>
  <div class="content">
    <div style="width: 380px;display: flex;flex:0">
      <el-input prefix-icon="el-icon-search" v-model="search_title" placeholder="请输入搜索内容"></el-input>
      <el-button @click="search" icon="el-icon-search" style="flex:0;margin-left: 20px;"
                 :loading="search_loading"></el-button>
    </div>
    <div>

    </div>
    <el-table :data="table_data" style="width: 100%" @row-click="open_goods" v-loading="table_loading">
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
        @current-change="current_change"
        style="flex:0"
        background
        layout="prev, pager, next"
        :current-page.sync="current_page"
        :total="total" :page-size="limit">
    </el-pagination>
    <el-dialog title="商品详细" :visible.sync="dialog_form_visible" @close="dialog_close">
      <el-form :model="dialog_form">
        <el-form-item label="商品ID" :label-width="dialog_form_label_width">{{ dialog_form.id }}</el-form-item>
        <el-form-item label="商品名称" :label-width="dialog_form_label_width">
          <el-input v-model="dialog_form.title" style="width: 260px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细描述" :label-width="dialog_form_label_width">
          <el-input v-model="dialog_form.desc" style="width: 360px"></el-input>
        </el-form-item>
        <el-form-item label="规格模板" :label-width="dialog_form_label_width">
          <el-input type="textarea" v-model="dialog_form.template" :rows="3">

          </el-input>

        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="轮播图" :label-width="dialog_form_label_width">
          <el-collapse>
            <el-collapse-item title="">
              <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :file-list="banner_file_list"
                  :http-request="upload_file"
                  :on-change="banner_file_change"
                  list-type="picture-card">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-collapse-item>
          </el-collapse>
        </el-form-item>
        <el-form-item label="商品详细" :label-width="dialog_form_label_width">
          <el-collapse>
            <el-collapse-item title="">
              <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :file-list="detail_file_list"
                  :http-request="upload_file"
                  :on-change="detail_file_change"
                  list-type="picture-card">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-collapse-item>
          </el-collapse>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_form_visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog_form_visible = false">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "Goods",
  methods: {
    current_change(i) {
      this.$set(this, 'table_loading', true)
      this.$set(this, 'offset', this.limit * (Number(i - 1)))
      this.get_data();
    },
    get_data() {
      this.$set(this, 'table_data', [])
      this.$http.get(this.server + "/goods", {
        params: {
          title: this.search_title,
          limit: this.limit,
          offset: this.offset
        }
      }).then(response => {
        for (let i = 0; i < response.body.data.goods.length; i++) {
          let obj = response.body.data.goods[i]
          obj.banner = JSON.parse(obj.banner)
          obj.detail_img = JSON.parse(obj.detail_img)
          // obj.template = JSON.parse(obj.template)
          this.$set(this, 'table_data', i, obj)
        }
        this.$set(this, 'table_data', response.body.data.goods)
        this.$set(this, 'total', response.body.data.total)
        this.$set(this, 'search_loading', false)
        this.$set(this, 'table_loading', false)
      })
    },
    //el-upload 回调函数
    banner_file_change(file, file_list) {
      if (file.status === "success") {
        let tmp = []
        for (let i = 0; i < file_list.length; i++) {
          if (file_list[i].raw !== undefined && file_list[i].status === "success") {
            tmp.push({url: file_list[i].raw.url})
          } else {
            tmp.push({url: file_list[i].url})
          }
        }
        this.$set(this, 'banner_upload_list', tmp)
      }
    },
    //el-upload 回调函数
    detail_file_change(file, file_list) {
      if (file.status === "success") {
        let tmp = []
        for (let i = 0; i < file_list.length; i++) {
          if (file_list[i].raw !== undefined && file_list[i].status === "success") {
            tmp.push({url: file_list[i].raw.url})
          } else {
            tmp.push({url: file_list[i].url})
          }
        }
        this.$set(this, 'detail_upload_list', tmp)
      }
    },

    //el-upload 回调函数
    upload_file(param) {
      let reader = new FileReader();
      reader.readAsDataURL(param.file)
      reader.onload = (f) => {
        let imgData = String(f.target.result)
        imgData = imgData.substring(imgData.indexOf(',') + 1)
        this.$http.post(this.upload_server + "/img", {data: imgData}).then(response => {
          param.file.url = response.body
          if (response.body.length > 10) {
            param.onSuccess()
          } else {
            param.onError()
          }
        })
      }
    },
    search() {
      this.$set(this, 'search_loading', true)
      this.$set(this, 'table_loading', true)
      this.$set(this, 'offset', 0)
      this.$set(this, 'current_page', 0)
      this.get_data()
    },
    dialog_close() {
      this.$set(this, 'banner_file_list', [])
      this.$set(this, 'detail_file_list', [])
    },
    open_goods(row) {
      let dialog_form = this.dialog_form
      dialog_form.id = row.id;
      dialog_form.title = row.title;
      dialog_form.template = row.template;
      dialog_form.desc = row.desc
      let imgList = []
      for (let i = 0; i < row.banner.length; i++) {
        imgList.push({url: row.banner[i]})
      }
      this.$set(this, 'banner_file_list', imgList)
      imgList = []
      for (let i = 0; i < row.detail_img.length; i++) {
        imgList.push({url: row.detail_img[i]})
      }
      this.$set(this, 'detail_file_list', imgList)

      this.$set(this, 'dialog_form', dialog_form)
      this.$set(this, 'dialog_form_visible', true)
    }
  },
  data() {
    return {
      search_title: '裤子零食',
      search_loading: false,
      table_loading: false,
      limit: 6,
      offset: 0,
      current_page: 0,

      //HTTP参数
      banner_upload_list: [],
      detail_upload_list: [],

      //仅用于el-upload首次加载的数组
      banner_file_list: [{
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      detail_file_list: [{
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],

      "total": 1,

      //HTTP参数
      table_data: [
        {
          "id": 3,
          "title": "裤子零食",
          "banner": ['https://img.alicdn.com/imgextra/i1/2209151972136/O1CN01EMZjGS1ReKdG2HCw8_!!2209151972136.jpg'],
          "template": "[{  'title':'大小',  'values':[10,11,12]}]",
          "create_time": "2020-12-11 18:20:02",
          "desc": "保暖好穿",
          "detail_img": ['https://img.alicdn.com/imgextra/i4/2209151972136/O1CN01T9kie31ReKdPNXBz1_!!2209151972136.jpg', 'https://img.alicdn.com/imgextra/i4/2209151972136/O1CN01ZArePy1ReKdWtmQPy_!!2209151972136.jpg', 'https://img.alicdn.com/imgextra/i2/2209151972136/O1CN01SJkm6x1ReKcUTly9g_!!2209151972136.jp']
        }
      ],
      dialog_table_visible: false,
      dialog_form_visible: false,
      dialog_form: {
        id: 0,
        title: 'title',
        desc: 'desc',
        create_time: 'create_time',
        template: 'template'
      },
      dialog_form_label_width: '80px'
    }
  }

}
</script>

<style scoped>
.content {
  height: 96%;
}
</style>