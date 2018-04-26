<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <router-link :to="{name:'submission-edit',query:{name:'新增投稿'}}">
        <el-button type="primary" class="pri-button">新增投稿</el-button>
      </router-link>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="主题">
          <el-input v-model="form.ThemeName" style="width: 150px;" clearable placeholder="主题"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.Title" style="width: 150px;" clearable placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-select v-model="form.LevelId" clearable placeholder="请选择级别">
            <el-option v-for="item in levelData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.Status" style="width: 100px;" clearable placeholder="请选择状态">
            <el-option label="已审核" value="1"/>
            <el-option label="未审核" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item class="searchBtn">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      size="mini"
      class="page-list"
      :data="submissionData.list">
      <el-table-column label="日期" prop="createTime"/>
      <el-table-column label="主题" prop="themeName"/>
      <el-table-column label="标题" prop="title"/>
      <el-table-column label="级别" prop="levelName"/>
      <el-table-column label="审核进程" prop="process.processName"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group >
            <el-button icon="el-icon-delete" round size="mini" v-if="!scope.row.status" @click="deleteItem(scope.row.id)" type="danger"></el-button>
            <el-button icon="el-icon-download" round size="mini" type="success" @click="openDoc(scope.row)"></el-button>
            <el-button icon="el-icon-edit-outline" round size="mini" v-if="!scope.row.status" @click="openDetail(scope.row.id)" type="primary"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="page"
      :page-size="submissionData.pageSize"
      layout="total, prev, pager, next"
      :total="submissionData.total"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script src="../../../assets/js/custom/comment/submission-list.js"></script>

<style scoped>
@import "../../../assets/css/custom/comment/submission-list.css";
</style>
