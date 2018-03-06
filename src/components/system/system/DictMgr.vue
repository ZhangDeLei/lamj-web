<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <el-button type="primary" class="pri-button" @click="showInsertDialog">新增字典</el-button>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="form.Name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.Status" placeholder="状态">
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
      :data="dictData.list"
      class="table-list">
      <el-table-column
        label="名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="英文名称"
        prop="enName">
      </el-table-column>
      <el-table-column
        label="编码"
        prop="code">
      </el-table-column>
      <el-table-column
        label="字典值名称"
        prop="label">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="description">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status==1"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
      :page-size="dictData.pageSize"
      layout="total, prev, pager, next"
      :total="dictData.total"
      @current-change="handleCurrentChange">
    </el-pagination>

    <el-dialog title="新增字典值" :visible.sync="dialogEditShow" width="50%" :modal-append-to-body="false">
      <el-form ref="editForm" :model="editForm" size="mini" :rules="rules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name" :disabled="editForm.id!=null"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" prop="enName">
          <el-input v-model="editForm.enName" :disabled="editForm.id!=null"></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="editForm.code" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="字典值名称" prop="label">
          <el-input v-model="editForm.label" :disabled="editForm.id!=null"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="editForm.status"></el-switch>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="editForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../../assets/js/system/system/dict-mgr.js"></script>

<style scoped>
  @import "../../../assets/css/system/system/dict-mgr.css";
</style>
