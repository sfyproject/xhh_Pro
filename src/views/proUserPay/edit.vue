<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>人员维护</h3>
      <el-form ref="proUser" :model="proUser" label-width="150px">
        <el-form-item label="用户ID" prop="userid">
          <el-input v-model="proUser.userid"/>
        </el-form-item>
        <el-form-item label="用户名称" prop="user">
          <el-input v-model="proUser.user"/>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="proUser.phone"/>
        </el-form-item>
        <el-form-item label="证件号码" prop="idcard">
          <el-input v-model="proUser.idcard"/>
        </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <el-select v-model="proUser.status">
            <el-option label="启用" value="true"/>
            <el-option label="禁用" value="false"/>
          </el-select>
        </el-form-item>
        <el-form-item label="生效日期" prop="effective">
          <el-date-picker v-model="proUser.effective" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;"/>
        </el-form-item>
        <el-form-item label="有效期止" prop="deadline">
          <el-date-picker v-model="proUser.deadline" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="proUser.remark"/>
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
import { editProUser, detailProUser } from '@/api/proUser'
import Editor from '@tinymce/tinymce-vue'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  name: 'ProEdit',
  components: { Editor },

  data() {
    return {
      proUser: { }
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

      const proUserId = this.$route.query.id
      detailProUser(proUserId).then(response => {
        this.proUser = response.data.data
        this.deadline = response.data.data.deadline
      })
    },
    // handleCategoryChange(value) {
    //   this.goods.categoryId = value[value.length - 1]
    // },
    handleCancel: function() {
      this.$router.push({ path: '/proUser/list' })
    },
    handlePublish: function() {
      // const finalPro = {
      //   pro: this.pro,
      //   specifications: this.specifications,
      //   products: this.products,
      //   attributes: this.attributes
      // }
      editProUser(this.proUser).then(response => {
        this.$notify.success({
          title: '成功',
          message: '更新成功'
        })
        this.$router.push({ path: '/proUser/list' })
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
