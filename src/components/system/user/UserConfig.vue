<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <div class="pri-button">
        <el-button type="info" @click="selectUser(checkUser)">重置</el-button>
        <el-button type="primary" @click="confirmData">保存</el-button>
      </div>
    </div>
    <div class="left-content">
      <div class="tag_name">用户列表</div>
      <div class="search">
        <el-input clearable placeholder="请输入内容" v-model="inputValue"/>
      </div>
      <div class="left-list">
        <ul>
          <li v-for="item in searchList" :class="{'active':item.id==checkUserId}" @click="selectUser(item.id)">{{item.nickName}}</li>
        </ul>
      </div>
    </div>
    <div class="right-content">
      <div class="right-top">
        <div class="right-tag">用户组配置</div>
        <el-transfer v-model="userGroupList" :data="groupData" class="h-center transfer-cls" :titles="['未选','已选']"></el-transfer>
      </div>
      <div class="right-bottom">
        <div class="right-tag">权限配置</div>
        <el-transfer v-model="userPermissionList" :data="permissionData" class="h-center transfer-cls" :titles="['未选','已选']"></el-transfer>
      </div>
    </div>
  </div>
</template>

<script src="../../../assets/js/system/user/user-config.js"></script>

<style scoped>
  @import "../../../assets/css/system/user/user-config.css";
</style>
