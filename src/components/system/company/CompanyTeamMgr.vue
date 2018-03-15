<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <el-button type="primary" class="pri-button" @click="showInsertDialog">新增队伍</el-button>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="searchForm.Name" clearable placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="所属企业">
          <el-select v-model="searchForm.CompanyId" placeholder="请选择企业">
            <el-option label="" value=""></el-option>
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
      :data="teamData.list">
      <el-table-column
        label="所属企业"
        prop="companyName">
      </el-table-column>
      <el-table-column
        label="名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="描述"
        prop="description">
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" round type="danger" @click="confirmDelete(scope.row.id)"
                       icon="el-icon-delete"></el-button>
            <el-button size="mini" round type="primary" @click="showEditDialog(scope.row)"
                       icon="el-icon-edit-outline"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      :page-size="teamData.pageSize"
      layout="total, prev, pager, next"
      :total="teamData.total"
      @current-change="handleCurrentChange">
    </el-pagination>

    <el-dialog title="新增队伍" :visible.sync="dialogEditShow" width="50%" :modal-append-to-body="false">
      <el-form ref="editForm" :model="editForm" size="mini" :rules="rules" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="所属企业" prop="companyId">
          <el-select v-model="editForm.companyId" filterable placeholder="请选择企业" @change="companyChange">
            <el-option v-for="item in CompanyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            disabled
            v-model="editForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editForm.description" type="textarea" placeholder="描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../../assets/js/system/company/company-team-mgr.js"></script>

<style scoped>
  @import "../../../assets/css/system/company/company-team-mgr.css";
</style>
