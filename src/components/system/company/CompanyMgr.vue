<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <el-button type="primary" class="pri-button" @click="showInsertDialog">新增企业</el-button>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="searchForm.Name" clearable placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="searchForm.BegDate" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center;">-</el-col>
          <el-col :span="11">
            <el-date-picker type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss" v-model="searchForm.EndDate" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="searchBtn">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      class="page-list"
      :data="companyData.list">
      <el-table-column
        label="名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="简称"
        prop="shortName">
      </el-table-column>
      <el-table-column
        label="地址"
        prop="address">
      </el-table-column>
      <el-table-column
        label="联系人" prop="concatUserName">
      </el-table-column>
      <el-table-column
        label="联系方式" prop="concatUserPhone">
      </el-table-column>
      <el-table-column
        label="地址" prop="address">
      </el-table-column>
      <el-table-column
        label="创建时间" prop="createDate">
      </el-table-column>
      <el-table-column
        label="有效期" prop="expiredDate">
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
      :page-size="companyData.pageSize"
      layout="total, prev, pager, next"
      :total="companyData.total"
      @current-change="handleCurrentChange">
    </el-pagination>

    <el-dialog title="新增企业" :visible.sync="dialogEditShow" width="50%" :modal-append-to-body="false">
      <el-form ref="editForm" :model="editForm" size="mini" :rules="rules" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="简称" prop="shortName">
          <el-input v-model="editForm.shortName" placeholder="简称"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="concatUserName">
          <el-input v-model="editForm.concatUserName" placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系人号码" prop="concatUserPhone">
          <el-input v-model="editForm.concatUserPhone" placeholder="联系人号码"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item label="最大用户数" prop="maxNumUser">
          <el-input type="number" v-model="editForm.maxNumUser" placeholder="最大用户数"></el-input>
        </el-form-item>
        <el-form-item label="有效期" prop="expiredDate">
          <el-date-picker type="datetime" placeholder="有效期" value-format="yyyy-MM-dd HH:mm:ss" v-model="editForm.expiredDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../../assets/js/system/company/company-mgr.js"></script>

<style scoped>
  @import "../../../assets/css/system/company/company-mgr.css";
</style>
