<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>任务维护</h3>
      <el-form ref="proTask" :model="proTask" label-width="150px">
        <el-form-item label="任务内容" prop="content">
          <el-input v-model="proTask.content"/>
        </el-form-item>
        <el-form-item label="权重" prop="ratio">
          <el-input v-model="proTask.ratio"/>
        </el-form-item>
        <el-form-item label="截止日期" prop="deadline">
          <el-input v-model="proTask.deadline"/>
        </el-form-item>
        <el-form-item label="任务状态" prop="status">
          <el-select v-model="proTask.status">
            <el-option label="准备中" value="0"/>
            <el-option label="进行中" value="1"/>
            <el-option label="已完成" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="实施者" prop="createrid">
          <el-input v-model="proTask.createrid"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="proTask.remark"/>
        </el-form-item>
      </el-form>
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
import { editProTask, detailProTask } from '@/api/proTask'
import Editor from '@tinymce/tinymce-vue'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  name: 'ProTaskEdit',
  components: { Editor },

  data() {
    return {
      proTask: { }
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

      const proTaskId = this.$route.query.id
      detailProTask(proTaskId).then(response => {
        this.proTask = response.data.data
        // this.deadline = response.data.data.deadline
      })
    },
    handleCancel: function() {
      this.$router.push({ path: '/proTask/list' })
    },
    handlePublish: function() {
      // const finalPro = {
      //   pro: this.pro,
      //   specifications: this.specifications,
      //   products: this.products,
      //   attributes: this.attributes
      // }
      editProTask(this.proTask).then(response => {
        this.$notify.success({
          title: '成功',
          message: '更新成功'
        })
        this.$router.push({ path: '/proTask/list' })
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
