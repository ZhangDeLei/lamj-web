<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <el-form ref="form" :rules="rules" :model="form" style="margin: 10px;" label-width="80px">
      <el-form-item label="主题" prop="themeName">
        <el-input v-model="form.themeName" placeholder="请输入文章主题"/>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标题"/>
      </el-form-item>
      <el-form-item label="文章地址">
        <el-input v-model="form.url" placeholder="请输入文章地址"/>
      </el-form-item>
      <el-form-item label="退回原因" v-if="form.process">
        {{form.process.comment}}
      </el-form-item>
      <el-form-item label="附件" prop="articleFile">
        <div>
          <label class="selectImage" for="articleFile">选择文件</label>
          <input type="file" id="articleFile" @change="changeFile"/>
          <span class="tip">只能上传word文件</span>
        </div>
        <div class="fileinfo" v-if="articleFile.name">
          {{articleFile.name}}<i class="el-icon-circle-close-outline" @click="removeFile"></i>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{form.id?'立即保存':'立即创建'}}</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="../../../assets/js/custom/comment/submission-edit.js"></script>

<style scoped>
  @import "../../../assets/css/custom/comment/submission-edit.css";
</style>
