<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="form.Title" style="width: 150px;" clearable placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="form.TypeId" style="width: 100px;" clearable placeholder="请选择类别">
            <el-option v-for="item in newData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            style="width: 150px;"
            v-model="form.BegDate"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始时间">
          </el-date-picker>
          -
          <el-date-picker
            style="width: 150px;"
            v-model="form.EndDate"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="searchBtn">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      size="mini"
      class="page-list"
      :data="articleData.list">
      <el-table-column label="标题" prop="title"/>
      <el-table-column label="链接" prop="url"/>
      <el-table-column label="类别" prop="typeName"/>
      <el-table-column label="创建人" prop="createUserName"/>
      <el-table-column label="创建时间" prop="createTime"/>
    </el-table>

    <el-pagination
      class="page"
      :page-size="articleData.pageSize"
      layout="total, prev, pager, next"
      :total="articleData.total"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script src="../../../assets/js/custom/article/article-browse.js"></script>

<style scoped>
  @import "../../../assets/css/custom/article/article-browse.css";
</style>
