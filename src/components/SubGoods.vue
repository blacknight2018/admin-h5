<template>
  <div class="content">
    <div style="flex:0">
      <el-select filterable v-model="value" value-key="id" placeholder="选择商品" @change="option_change">
        <el-option
            v-for="(item,index) in options"
            :key="item.id"
            :label="item.title"
            :value="index">
        </el-option>
      </el-select>
    </div>
    <br>
    <div>
      <el-button type="primary" icon="el-icon-circle-plus" size="medium" @click="plus_sub_goods">添加</el-button>
    </div>
    <div style="overflow-y: scroll;flex:1;">
      <el-dialog :visible.sync="dialog_visible" @close="dialog_close">
        <el-form label-width="80px" :model="dialog_form">
          <el-form-item label="规格ID" v-if="dialog_form.id!==0">
            {{ dialog_form.id }}
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input suffix-icon="el-icon-price-tag" style="width: 100px" v-model="dialog_form.price"></el-input>
          </el-form-item>
          <el-form-item label="商品库存">
            <el-input suffix-icon="el-icon-box" style="width: 100px;" v-model="dialog_form.stoke"></el-input>
          </el-form-item>
          <el-form-item label="商品销量">
            <el-input suffix-icon="el-icon-sell" style="width: 100px" v-model="dialog_form.sell"></el-input>
          </el-form-item>
          <el-form-item label="商品规格">
            <el-collapse>
              <el-collapse-item>
                <el-form label-width="50px" v-for="(item,index) in options[value].template" v-bind:key="item.title">
                  <el-form-item :label="item.title">
                    <el-select v-model="template_option[index]">
                      <el-option v-for="(item2,index2) in item.values" :label="item2" :key="item2"
                                 :value="index2">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <br>
                </el-form>
              </el-collapse-item>
            </el-collapse>

          </el-form-item>
          <el-form-item label="创建时间" v-if="dialog_form.id!==0">
            {{ dialog_form.create_time }}
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
                :file-list="img_file_list"
                :on-remove="img_file_remove"
                :on-change="img_file_change"
                :limit="1"
                :http-request="upload_file"
                list-type="picture-card">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialog_form_visible = false" v-if="dialog_form.id!==0"
                     @click.native="btn_save">保 存
          </el-button>
          <el-button type="primary" @click="dialog_form_visible = false" v-if="dialog_form.id===0"
                     @click.native="btn_add">添 加
          </el-button>
        </div>
      </el-dialog>
      <el-table
          @row-click="open_detail"
          v-loading="table_loading"
          :data="table_data"
          style="width: 100%">
        <el-table-column
            prop="id"
            label="ID"
            width="80">
        </el-table-column>
        <el-table-column
            prop="price"
            label="价格"
            width="180">
        </el-table-column>
        <el-table-column
            prop="create_time"
            label="日期"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubGoods",
  methods: {
    btn_add() {
      let param = {
        goods_id: this.options[this.value].id,
        img: this.img_upload_list[0],
        price: Number(this.dialog_form.price),
        stoke: Number(this.dialog_form.stoke),
        sell: Number(this.dialog_form.sell),
        template: this.template_option
      }
      this.$http.post(this.server + "/sub_goods", param).then(response => {
        console.log(response)
        if (response.body.code === 0) {
          this.$message({
            message: "添加成功",
            type: "success"
          })
          this.$set(this, 'dialog_visible', false)
          this.option_change(this.value)
        }
      })
    },
    btn_save() {
      let param = {
        id: this.dialog_form.id,
        img: this.img_upload_list[0],
        price: Number(this.dialog_form.price),
        stoke: Number(this.dialog_form.stoke),
        sell: Number(this.dialog_form.sell),
        template: this.template_option
      }
      this.$http.put(this.server + "/sub_goods", param).then(response => {
        console.log(response)
        if (response.body.code === 0) {
          this.$message({
            message: "保存成功",
            type: "success"
          })
          this.$set(this, 'dialog_visible', false)
        }
      })
    },
    open_detail(row) {
      this.dialog_form.id = row.id;
      this.dialog_form.price = row.price;
      this.dialog_form.img = row.img;
      this.dialog_form.stoke = row.stoke;
      this.dialog_form.sell = row.sell;
      this.dialog_form.create_time = row.create_time;
      this.dialog_form.template = row.template;
      this.$set(this, 'template_option', this.dialog_form.template)
      this.$set(this, 'img_file_list', [{url: this.dialog_form.img}]);
      this.$set(this, 'img_upload_list', [this.img_file_list[0].url])
      this.$set(this, 'dialog_form', this.dialog_form);
      this.$set(this, 'dialog_visible', true)

    },
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
    dialog_close() {
      this.$set(this, 'img_file_list', [])
      this.dialog_form.id = 0;
      this.dialog_form.price = 0;
      this.dialog_form.img = 0;
      this.dialog_form.stoke = 0;
      this.dialog_form.sell = 0;
      this.dialog_form.create_time = '';
      this.dialog_form.template = [];
      this.$set(this, 'dialog_form', this.dialog_form)
    },
    img_file_remove(file, file_list) {
      this.img_file_change(file, file_list)
    },
    img_file_change(file, file_list) {
      if (file.status === "success") {
        let tmp = []
        for (let i = 0; i < file_list.length; i++) {
          if (file_list[i].raw !== undefined && file_list[i].status === "success") {
            tmp.push(file_list[i].raw.url)
          } else {
            tmp.push(file_list[i].url)
          }
        }
        this.$set(this, 'img_upload_list', tmp)
      }
    },
    option_change(idx) {
      this.$set(this, 'table_loading', true)
      console.log(idx, this.options[idx])
      this.$http.get(this.server + "/sub_goods", {
        params: {
          goods_id: this.options[idx].id
        }
      }).then(response => {
        console.log(response)
        let obj = response.body.data;
        this.table_data = []
        for (let i = 0; i < obj.length; i++) {
          let tmp = {}
          tmp.id = obj[i].id;
          tmp.sell = obj[i].sell;
          tmp.stoke = obj[i].stoke;
          tmp.price = obj[i].price;
          tmp.template = JSON.parse(obj[i].template);
          tmp.create_time = obj[i].create_time;
          tmp.img = obj[i].img;
          this.table_data.push(tmp)
        }
        this.$set(this, 'table_loading', false)
        this.$set(this, 'table_data', this.table_data)
      })
    },
    plus_sub_goods() {
      this.$set(this, 'dialog_visible', true)
    }
  },
  mounted() {
    this.$http.get(this.server + "/goods/list").then(response => {
      this.options = []
      if (response.body.code === 0) {
        this.options = []
        for (let i = 0; i < response.body.data.length; i++) {
          let tmp = {}
          let obj = response.body.data[i]
          tmp.id = obj.id;
          tmp.title = obj.title
          tmp.template = JSON.parse(obj.template)
          this.options.push(tmp)
          console.log(this.options)
        }
        this.$set(this, 'options', this.options)
        this.$set(this, 'value', 0)
        this.option_change(0)
      }
    })
  },
  data() {
    return {
      dialog_visible: false,
      value: 0,
      options: [{
        id: '选项1',
        title: '黄金糕',
        template: [1,2]
      }],

      //HTTP参数
      img_upload_list: [],

      //HTTP参数
      template_option: [],

      //用于el-load展示
      img_file_list: [{
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      table_loading: false,
      table_data: [{
        id: 1,
        create_time: '2016-05-02',
        price: '100',
        sell: 0,
        stoke: 0,
        img: [],
        template: []
      }],
      dialog_form: {
        id: 0,
        price: 0,
        sell: 0,
        stoke: 0,
        create_time: "2020-20-02",
        template: [],
        img: []
      }
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