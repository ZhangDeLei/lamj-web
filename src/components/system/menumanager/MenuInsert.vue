<template>
  <div class="menu-insert-content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <el-form ref="form" :model="form" label-width="80px" style="margin: 10px;">
      <el-form-item label="菜单名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="级别">
        <el-select v-model="form.level" placeholder="请选择菜单级别">
          <el-option label="一级" value="1"></el-option>
          <el-option label="二级" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级菜单" v-if="form.level==2">
        <el-select v-model="form.parentId" placeholder="请选择上级菜单">
          <el-option v-for="item in menuList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单编码">
        <el-input v-model="form.code" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="form.path"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{form.id>0?'保存修改':'立即创建'}}</el-button>
        <el-button>
          <router-link :to="{name:'menu',query:{name:'菜单列表'}}" style="color:#606266">取消</router-link>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="../../../assets/js/system/menu/menu-insert.js"></script>

<style scoped>
  @import "../../../assets/css/system/menu/menu-insert.css";
</style>
