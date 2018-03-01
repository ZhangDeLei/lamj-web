<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <el-form enctype="multipart/form-data" ref="form" :model="form" :rules="rules" label-width="80px" style="margin: 10px;width: 50%" size="mini">
      <el-form-item label="名称" prop="nickName">
        <el-input v-model="form.nickName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="userAccount">
        <el-input v-model="form.userAccount" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="tel">
        <el-input type="number" v-model="form.tel" placeholder="请输入手机号码"/>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="form.sex" label="1">男</el-radio>
        <el-radio v-model="form.sex" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="头像">
        <div>
          <label class="selectImage" for="imageFile">选择文件</label>
          <input type="file" id="imageFile" @change="changeFile"/>
          <span class="tip">只能上传jpg/png文件，且不超过1m</span>
        </div>
        <div class="fileinfo" v-if="imageFile.name">
          {{imageFile.name}}<i class="el-icon-circle-close-outline" @click="removeFile"></i>
        </div>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="../../../assets/js/system/user/user-add.js"></script>

<style scoped>
  @import "../../../assets/css/system/user/user-add.css";
</style>
