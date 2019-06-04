<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>项目维护</h3>
      <el-form ref="pro" :model="pro" label-width="150px">
        <el-form-item label="项目编号" prop="number">
          <el-input v-model="pro.number"/>
        </el-form-item>
        <el-form-item label="项目名称" prop="project">
          <el-input v-model="pro.project"/>
        </el-form-item>
        <el-form-item label="项目甲方" prop="buyer">
          <el-input v-model="pro.buyer"/>
        </el-form-item>
        <el-form-item label="项目简介" prop="content">
          <editor :init="editorInit" v-model="pro.content"/>
        </el-form-item>
        <el-form-item label="合同附件" prop="pact">
          <el-input v-model="pro.pact"/>
        </el-form-item>
        <el-form-item label="项目总价" prop="price">
          <el-input v-model="pro.price" placeholder="0.00">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="截止期限" prop="deadline">
          <!-- <el-input v-model="pro.deadline"/> -->
          <el-col :span="11">
            <el-date-picker v-model="pro.deadline" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;"/>
          </el-col>
        </el-form-item>
        <el-form-item label="项目附件" prop="attach">
          <el-input v-model="pro.attach"/>
        </el-form-item>
        <el-form-item label="项目状态" prop="status">
          <!-- <el-radio-group v-model="pro.status">
            <el-radio :label="0">准备中</el-radio>
            <el-radio :label="1">进行中</el-radio>
            <el-radio :label="2">已完成</el-radio>
          </el-radio-group> -->
          <el-select v-model="pro.status">
            <el-option label="准备中" value="0"/>
            <el-option label="进行中" value="1"/>
            <el-option label="已完成" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="pro.remark"/>
        </el-form-item>

      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>项目任务</h3>
      <el-button :plain="true" type="primary" @click="handleTaskShow">添加</el-button>
      <el-table :data="tasks">
        <el-table-column property="sketch" label="任务简述"/>
        <el-table-column property="content" label="任务内容"/>
        <el-table-column property="ratio" label="权重"/>
        <el-table-column property="deadline" label="截止期限"/>
        <el-table-column property="remark" label="备注"/>
        <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleTaskDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="taskVisiable" title="设置商品参数">
        <el-form
          ref="taskForm"
          :model="taskForm"
          status-icon
          label-position="left"
          label-width="100px"
          style="width: 400px; margin-left:50px;">
          <el-form-item label="任务简述" prop="sketch">
            <el-input v-model="taskForm.sketch"/>
          </el-form-item>
          <el-form-item label="任务内容" prop="content">
            <el-input v-model="taskForm.content"/>
          </el-form-item>
          <el-form-item label="权重" prop="ratio">
            <el-input v-model="taskForm.ratio"/>
          </el-form-item>
          <el-form-item label="截止期限" prop="deadline">
            <el-date-picker v-model="taskForm.deadline" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;"/>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="taskForm.remark"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="taskVisiable = false">取消</el-button>
          <el-button type="primary" @click="handleTaskAdd">确定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">更新</el-button>
    </div>

  </div>
</template>

<style>
  .el-card {
    margin-bottom: 10px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .input-new-keyword {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .avatar-uploader .el-upload {
    width: 145px;
    height: 145px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 145px;
    height: 145px;
    display: block;
  }
</style>

<script>
import { editPro, detailPro } from '@/api/pro'
import { createStorage } from '@/api/storage'
import Editor from '@tinymce/tinymce-vue'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  name: 'ProEdit',
  components: { Editor },

  data() {
    return {
      pro: { },
      tasks: [],
      taskVisiable: false,
      taskForm: { },
      editorInit: {
        language: 'zh_CN',
        convert_urls: false,
        plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
        toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
        images_upload_handler: function(blobInfo, success, failure) {
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          createStorage(formData).then(res => {
            success(res.data.data.url)
          }).catch(() => {
            failure('上传失败，请重新上传')
          })
        }
      }
    }
  },
  computed: {
    headers() {
      return {
        'X-Litemall-Admin-Token': getToken()
      }
    }
  },
  // created 方法是在页面渲染时候调用的 ；
  // method 中的方法是在页面渲染后调用的 ；
  // 在父子页面的关系中 ，如果 子页面没有渲染 就不能在父页面中调用子页面的method 中的方法 ；
  created() {
    this.init()
  },

  methods: {
    init: function() {
      if (this.$route.query.id == null) {
        return
      }

      const proId = this.$route.query.id
      detailPro(proId).then(response => {
        this.pro = response.data.data.data.proContent
        this.tasks = response.data.data.data.proTasks
      })
    },
    handleCancel: function() {
      this.$router.push({ path: '/pro/list' })
    },
    /*
     * @author: sunfy 2019-06-03 18:25:30
     * 项目任务添加按钮事件
     */
    handleTaskShow() {
      this.taskForm = {}
      this.taskVisiable = true
    },
    /*
     * @author: sunfy 2019-06-03 18:27:31
     * 项目任务逐行删除按钮
     */
    handleTaskDelete(row) {
      const index = this.tasks.indexOf(row)
      this.tasks.splice(index, 1)
    },
    /*
     * @author: sunfy 2019-06-03 18:23:07
     * 项目任务弹框后点击确定按钮事件
     */
    handleTaskAdd() {
      this.tasks.unshift(this.taskForm)
      this.taskVisiable = false
    },
    /*
     * @author: sunfy 2019-06-03 19:00:50
     * 页面保存事件
     */
    handlePublish: function() {
      const finalPro = {
        proContent: this.pro,
        proTasks: this.tasks
      }
      editPro(finalPro).then(response => {
        this.$notify.success({
          title: '成功',
          message: '更新成功'
        })
        this.$router.push({ path: '/pro/list' })
      }).catch(response => {
        MessageBox.alert('业务错误：' + response.data.errmsg, '警告', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
    }
  }
}
</script>
