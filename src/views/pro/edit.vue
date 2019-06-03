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
import { createStorage, uploadPath } from '@/api/storage'
import Editor from '@tinymce/tinymce-vue'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  name: 'ProEdit',
  components: { Editor },

  data() {
    return {
      uploadPath,
      newKeywordVisible: false,
      newKeyword: '',
      number: '',
      keywords: [],
      categoryList: [],
      brandList: [],
      pro: { deadline: '' },
      specVisiable: false,
      specForm: { specification: '', value: '', picUrl: '' },
      multipleSpec: false,
      specifications: [{ specification: '规格', value: '标准', picUrl: '' }],
      productVisiable: false,
      productForm: { id: 0, specifications: [], price: 0.00, number: 0, url: '' },
      products: [{ id: 0, specifications: ['标准'], price: 0.00, number: 0, url: '' }],
      attributeVisiable: false,
      attributeForm: { attribute: '', value: '' },
      attributes: [],
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
        this.pro = response.data.data
        this.deadline = response.data.data.deadline
      })
    },
    // handleCategoryChange(value) {
    //   this.goods.categoryId = value[value.length - 1]
    // },
    handleCancel: function() {
      this.$router.push({ path: '/pro/list' })
    },
    handlePublish: function() {
      // const finalPro = {
      //   pro: this.pro,
      //   specifications: this.specifications,
      //   products: this.products,
      //   attributes: this.attributes
      // }
      editPro(this.pro).then(response => {
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
