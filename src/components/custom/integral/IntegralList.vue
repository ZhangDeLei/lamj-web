<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="用户">
          <el-select v-model="form.UserId" clearable placeholder="请选择用户">
            <el-option v-for="item in userList" :key="item.id" :label="item.nickName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
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
      <el-table-column label="用户名称" prop="userName"/>
      <el-table-column label="总积分" prop="totalIntegral"/>
      <!--<el-table-column label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button round size="mini" type="primary" @click="showDetail(scope.row.id)">查看</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
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

<script src="../../../assets/js/custom/integral/integral-list.js"></script>

<style scoped>
@import "../../../assets/css/custom/integral/integral-list.css";
</style>
