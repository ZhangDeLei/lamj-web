<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" style="margin: 10px;">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" clearable/>
      </el-form-item>
      <el-form-item label="地址" prop="url">
        <el-input v-model="form.url" placeholder="请输入地址" clearable/>
      </el-form-item>
      <el-form-item label="类别" prop="typeId">
        <el-select placeholder="请选择类别" clearable v-model="form.typeId" @change="changeType">
          <el-option v-for="item in DictData" :key="item.id" :value="item.id" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="级别" prop="levelId">
        <el-select placeholder="请选择级别" clearable v-model="form.levelId" @change="changeLevel">
          <el-option v-for="item in LevelData" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{form.id?'立即保存':'立即创建'}}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="../../../assets/js/custom/article/article-edit.js"></script>

<style scoped>
  @import "../../../assets/css/custom/article/article-edit.css";
</style>
