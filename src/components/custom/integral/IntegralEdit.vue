<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <el-form ref="form" :rules="rules" v-model="form" style="margin: 10px;" label-width="80px">
      <el-form-item label="用户选择" prop="userId">
        <el-select placeholder="请选择用户">
          <el-option value="" label=""/>
        </el-select>
      </el-form-item>
      <el-form-item label="积分" prop="integral">
        <el-input placeholder="请输入积分" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" placeholder="请输入备注" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">立即添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="../../../assets/js/custom/integral/integral-edit.js"></script>

<style scoped>
@import "../../../assets/css/custom/integral/integral-edit.css";
</style>
