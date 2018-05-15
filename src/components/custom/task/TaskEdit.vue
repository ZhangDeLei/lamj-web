<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules" style="margin: 10px;" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="地址" prop="url">
            <el-input placeholder="请输入地址" v-model="form.url" @keyup.enter.native="getArticleTitle()"/>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input placeholder="请输入标题" v-model="form.title"/>
          </el-form-item>
          <el-form-item label="任务要求">
            <el-input type="textarea" placeholder="请输入任务要求" v-model="form.comment"/>
          </el-form-item>
          <el-form-item label="任务积分" prop="integral">
            <el-input placeholder="请输入积分" type="number" v-model="form.integral"/>
          </el-form-item>
          <el-form-item label="执行范围" prop="teamIds">
            <el-select placeholder="请选择执行范围" v-model="form.teamIds" multiple>
              <el-option v-for="item in teamList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="任务网站" prop="newId">
            <el-select placeholder="请选择网站" clearable v-model="form.newId" @change="newChange">
              <el-option v-for="item in newList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="任务类别" prop="typeId" @change="typeChange">
            <el-select placeholder="请选择任务类别" clearable v-model="form.typeId" @change="typeChange">
              <el-option v-for="item in taskType" :key="item.oprTypeId" :label="item.oprTypeName" :value="item.oprTypeId"/>
            </el-select>
          </el-form-item>
          <el-form-item label="完成时段" prop="expireDate">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="form.expireDate"
              type="datetime"
              placeholder="选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="执行类型" prop="execTypeId">
            <el-select placeholder="请选择执行类型" clearable v-model="form.execTypeId" @change="execTypeChange">
              <el-option v-for="item in execType" :key="item.id" :label="item.label" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="commitEdit">{{form.id?'立即保存':'立即创建'}}</el-button>
        <router-link :to="{name:'task-list',query:{name:'已发布任务'}}">
          <el-button>取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="../../../assets/js/custom/task/task-edit.js"></script>

<style scoped>
  @import "../../../assets/css/custom/task/task-edit.css";
</style>
