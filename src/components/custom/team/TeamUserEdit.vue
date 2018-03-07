<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <el-form enctype="multipart/form-data" ref="form" :model="form" :rules="rules" label-width="80px" style="margin: 10px;" size="mini">
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" prop="nickName">
            <el-input v-model="form.nickName" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="userAccount">
            <el-input v-model="form.userAccount" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="!isUpdate">
            <el-col :span="12">
              <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
            </el-col>
            <el-col :span="12">
              <el-form-item label="确认密码" prop="cpassword" style="margin-bottom: 0px;">
                <el-input v-model="form.cpassword" placeholder="请再次确认密码" type="password"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号码" prop="tel">
            <el-input v-model="form.tel" placeholder="请输入手机号码"/>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" placeholder="请输入邮箱"/>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio v-model="form.sex" label="1">男</el-radio>
            <el-radio v-model="form.sex" label="0">女</el-radio>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="form.status"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限">
            <el-select v-model="form.permissionId" placeholder="请选择权限">
              <el-option v-for="item in permissionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="星级">
            <el-select v-model="form.starLevelId" placeholder="请选择星级" @change="levelChange">
              <el-option v-for="item in StarList" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="队伍">
            <el-select v-model="form.teamId" placeholder="请选择队伍">
              <el-option v-for="item in TeamList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="头像" v-if="!isUpdate">
            <div>
              <label class="selectImage" for="imageFile">选择文件</label>
              <input type="file" id="imageFile" @change="changeFile"/>
              <span class="tip">只能上传jpg/png文件，且不超过1m</span>
            </div>
            <div class="fileinfo" v-if="imageFile.name">
              {{imageFile.name}}<i class="el-icon-circle-close-outline" @click="removeFile"></i>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">{{isUpdate?"保存信息":"立即创建"}}</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="../../../assets/js/custom/team/team-user-edit.js"></script>

<style scoped>
  @import "../../../assets/css/custom/team/team-user-edit.css";
</style>
