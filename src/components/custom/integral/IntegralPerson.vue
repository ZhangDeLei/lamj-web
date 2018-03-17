<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="来源积分">
          <el-select v-model="form.SourceId" clearable placeholder="请选择来源积分">
            <el-option v-for="item in sourceList" :key="item.id" :label="item.label" :value="item.id"></el-option>
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
      :data="integralData.list">
      <el-table-column label="积分" prop="integral">
        <template slot-scope="scope">
          <label v-if="scope.row.integral>=0" class="green">+{{scope.row.integral}}</label>
          <label v-if="scope.row.integral<0" class="danger">{{scope.row.integral}}</label>
        </template>
      </el-table-column>
      <el-table-column label="来源" prop="sourceName"/>
      <el-table-column label="新增时间" prop="createTime"/>
    </el-table>

    <el-pagination
      class="page"
      :page-size="integralData.pageSize"
      layout="total, prev, pager, next"
      :total="integralData.total"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script src="../../../assets/js/custom/integral/integral-person.js"></script>

<style scoped>
  @import "../../../assets/css/custom/integral/integral-person.css";
</style>
