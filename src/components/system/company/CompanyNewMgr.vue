<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <el-button type="primary" class="pri-button" @click="showRelatDialog">关联客户端</el-button>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="所属企业">
          <el-select v-model="searchForm.CompanyId" clearable placeholder="请选择企业">
            <el-option v-for="item in CompanyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
      :data="newData.list">
      <el-table-column
        label="所属企业"
        prop="companyName">
      </el-table-column>
      <el-table-column
        label="名称"
        prop="newName">
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" round type="danger" @click="confirmDelete(scope.row)"
                       icon="el-icon-delete"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      :page-size="newData.pageSize"
      layout="total, prev, pager, next"
      :total="newData.total"
      @current-change="handleCurrentChange">
    </el-pagination>

    <el-dialog title="新增企业新闻客户端" :visible.sync="dialogRelatShow" width="60%" :modal-append-to-body="false">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="100px">
        <el-form-item label="所属企业" prop="CompanyId">
          <el-select v-model="editForm.CompanyId" filterable placeholder="请选择企业" @change="companyChange" style="width: 100%;">
            <el-option v-for="item in CompanyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="新闻客户端">
          <el-transfer
            filterable
            :filter-method="filterMethod"
            :titles="['未选', '已选']"
            filter-placeholder="请输入城市拼音"
            v-model="editForm.Ids"
            :data="getTransData">
          </el-transfer>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRelatShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmRelat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../../assets/js/system/company/company-new-mgr.js"></script>

<style scoped>
  @import "../../../assets/css/system/company/company-new-mgr.css";
</style>
