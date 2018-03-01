<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <div class="pri-button">
        <el-button type="info">重置</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </div>
    <div class="left-content">
      <div class="tag_name">用户列表</div>
      <div class="search">
        <el-input clearable placeholder="请输入内容"/>
      </div>
      <div class="left-list">
        <ul>
          <li class="active">测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
          <li>测试测试</li>
        </ul>
      </div>
    </div>
    <div class="right-content">
      <div class="right-top">
        <div class="right-tag">用户组配置</div>
        <el-transfer class="h-center" :titles="['已选','未选']"></el-transfer>
      </div>
      <div class="right-bottom">
        <div class="right-tag">权限配置</div>
        <el-transfer class="h-center" :titles="['已选','未选']"></el-transfer>
      </div>
    </div>
  </div>
</template>

<script src="../../../assets/js/system/user/user-config.js"></script>

<style scoped>
  @import "../../../assets/css/system/user/user-config.css";
</style>
