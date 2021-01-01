<template>
  <div class="content">
    <div>
      <el-button type="primary" icon="el-icon-circle-plus" size="medium" @click="plus_banner">添加</el-button>
    </div>
    <div style="flex:1;overflow-y: scroll">
      <el-table :data="table_data" style="width: 100%" v-loading="table_loading" @row-click="open_banner">
        <el-table-column label="" width="100">
          <template slot-scope="scope">
            <el-image :src="scope.row.img" style="width: 50px;height: 50px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" width="80">
        </el-table-column>
        <el-table-column label="商品规格ID" width="160" prop="sub_goods_id">
        </el-table-column>
        <el-table-column label="创建时间" width="160" prop="create_time">
        </el-table-column>
        <el-table-column label="更新时间" prop="update_time">
        </el-table-column>
        <!--        <el-table-column label="">-->
        <!--          <template>-->
        <!--            <el-button type="danger" size="medium" icon="el-icon-delete"></el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </div>
    <el-dialog title="轮播图" :visible.sync="dialog_form_visible" @close="dialog_close">
      <el-form :model="dialog_form">
        <el-form-item label="ID" :label-width="dialog_form_label_width" v-if="dialog_form.id!==0">
          {{ dialog_form.id }}
        </el-form-item>
        <el-form-item label="商品ID" :label-width="dialog_form_label_width">
          <el-input v-model="dialog_form.sub_goods_id">
          </el-input>
        </el-form-item>
        <el-form-item label="展示图片" :label-width="dialog_form_label_width">
          <el-upload
              action="#"
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
        <el-button type="primary" v-if="dialog_form.id!==0"
                   @click="btn_save">保 存
        </el-button>
        <el-button type="danger" v-if="dialog_form.id!==0" @click="btn_delete">
          删除
        </el-button>
        <el-button type="primary" v-if="dialog_form.id===0"
                   @click="btn_add">添 加
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      table_loading: false,
      dialog_form_visible: false,
      dialog_form_label_width: '80px',
      dialog_form: {
        id: 0,
        sub_goods_id: 1,
        img: 'https://www.x6d.com/uploads/allimg/201230/1609293816879036.png',
      },
      img_file_list: ['https://www.x6d.com/uploads/allimg/201230/1609293816879036.png'],
      //HTTP参数
      img_upload_list: [],

      table_data: [{
        id: 1,
        img: 'https://www.x6d.com/uploads/allimg/201230/1609293816879036.png',
        sub_goods_id: 12,
        create_time: "2020/12/30",
        update_time: "2020/12/30"
      }]
    }
  },
  mounted() {
    this.get_data()
  },
  methods: {
    btn_delete() {
      let param = {
        id: this.dialog_form.id,
      };
      this.$set(this, 'dialog_form_visible', false)
      this.$http.delete(this.server + "/home/banner", {body: param}).then(response => {
        if (response.body.code === 0) {
          this.$message({message: "删除成功"})
          this.get_data()
        }
      })
    },
    btn_save() {
      let param = {
        id: this.dialog_form.id,
        sub_goods_id: Number(this.dialog_form.sub_goods_id),
        img: this.dialog_form.img
      };
      this.$set(this, 'dialog_form_visible', false)
      this.$http.put(this.server + "/home/banner", param).then(response => {
        if (response.body.code === 0) {
          this.$message({message: "保存成功"})
          this.get_data();
        }
      })
    },
    btn_add() {
      let param = {
        sub_goods_id: Number(this.dialog_form.sub_goods_id),
        img: this.img_upload_list[0]
      };
      this.$set(this, 'dialog_form_visible', false)
      this.$http.post(this.server + "/home/banner", param).then(response => {
        if (response.body.code === 0) {
          this.$message({message: "添加成功"})
          this.get_data();
        }

      })
    },
    dialog_close() {
      this.$set(this, 'img_file_list', [])
    },
    get_data() {
      this.$http.get(this.server + "/home/banner").then(response => {
        if (response.body.code === 0) {
          this.$set(this, 'table_data', response.body.data)
        }
      })
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
        console.log(tmp)
        this.$set(this, 'img_upload_list', tmp)
      }
    },
    open_banner(row) {
      this.$set(this, 'dialog_form_visible', true)
      this.$set(this.dialog_form, 'id', row.id);
      this.$set(this.dialog_form, 'sub_goods_id', row.sub_goods_id);
      this.$set(this.dialog_form, 'img', row.img)
      this.$set(this, 'img_file_list', [{url: row.img}])
      this.$set(this, 'img_upload_list', [this.img_file_list[0].url])

    },
    plus_banner() {
      this.$set(this, 'dialog_form_visible', true)
      this.dialog_form.id = 0;
      this.dialog_form.sub_goods_id = 0;
      this.$set(this, 'dialog_form', this.dialog_form);
      this.$set(this, 'img_file_list', [])
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