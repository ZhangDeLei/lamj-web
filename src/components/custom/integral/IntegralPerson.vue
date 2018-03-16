<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="form.Title" style="width: 150px;" clearable placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="积分来源">
          <el-select v-model="form.NewId" clearable placeholder="请选择积分来源">
            <el-option v-for="item in newData" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
      :data="articleData.list">
      <el-table-column label="积分" prop="integral"/>
      <el-table-column label="来源" prop="sourceName"/>
      <el-table-column label="新增时间" prop="createTime"/>
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

<script src="../../../assets/js/custom/integral/integral-person.js"></script>

<style scoped>
@import "../../../assets/css/custom/integral/integral-person.css";
</style>
