<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <el-form ref="form" :rules="rules" :model="form" style="margin: 10px;" label-width="80px">
      <el-form-item label="用户选择" prop="userId">
        <el-select placeholder="请选择用户" clearable filterable v-model="form.userId" @change="changeUser">
          <el-option v-for="item in userData" :key="item.id" :value="item.id" :label="item.nickName"/>
        </el-select>
      </el-form-item>
      <el-form-item label="积分" prop="integral">
        <el-input placeholder="请输入积分" v-model="form.integral" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" placeholder="请输入备注" v-model="form.comment" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="../../../assets/js/custom/integral/integral-edit.js"></script>

<style scoped>
@import "../../../assets/css/custom/integral/integral-edit.css";
</style>
