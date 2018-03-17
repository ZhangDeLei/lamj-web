<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
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
            <el-option v-for="item in levelData" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.Status" style="width: 100px;" clearable placeholder="请选择">
            <el-option label="已审核" value="1" key="1"/>
            <el-option label="未审核" value="0" key="0"/>
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
      <el-table-column label="投稿人" prop="userName"/>
      <el-table-column label="级别" prop="levelName" width="100"/>
      <el-table-column label="当前进程" prop="process.processName"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button icon="el-icon-back" round size="mini" v-if="!scope.row.status&&scope.row.process.processCode!='0003'" @click="backConfirm(scope.row.id)" type="danger"></el-button>
            <el-button icon="el-icon-download" round size="mini" type="success" @click="openDoc(scope.row)"></el-button>
            <el-button icon="el-icon-check" round size="mini" v-if="!scope.row.status&&scope.row.process.processCode!='0003'" @click="successConfirm(scope.row.id)" type="primary"></el-button>
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

    <el-dialog :title="isSuccess?'通过':'退回'" :visible.sync="dialogConfirm" width="30%" :modal-append-to-body="false">
      <el-form ref="confirmForm" :model="confirmForm">
        <el-form-item label="备注">
          <el-input type="textarea" v-model="confirmForm.Comment" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirm = false">取 消</el-button>
        <el-button type="primary" @click="confirm">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../../assets/js/custom/comment/examine.js"></script>

<style scoped>
  @import "../../../assets/css/custom/comment/examine.css";
</style>
