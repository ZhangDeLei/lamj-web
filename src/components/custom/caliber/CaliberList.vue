<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="form.Name" clearable placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.Status" clearable placeholder="状态">
            <el-option label="" value=""></el-option>
            <el-option label="可用" value="1"></el-option>
            <el-option label="不可用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="searchBtn">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="caliberData.list"
      class="page-list">
      <el-table-column
        label="名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-switch
            disabled
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="page"
      :page-size="caliberData.pageSize"
      layout="total, prev, pager, next"
      :total="caliberData.total"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script src="../../../assets/js/custom/caliber/caliber.js"></script>

<style scoped>
  @import "../../../assets/css/custom/caliber/caliber.css";
</style>
