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
        <el-form-item class="searchBtn">
          <el-button type="primary" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      class="page-list"
      :data="teamData">
      <el-table-column
        label="名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status" disabled
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

    <el-dialog title="新增队伍" :visible.sync="dialogEditShow" width="50%" :modal-append-to-body="false">
      <el-form ref="editForm" :model="editForm" size="mini" :rules="rules" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
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

<script src="../../../assets/js/custom/team/team-mgr.js"></script>

<style scoped>
  @import "../../../assets/css/custom/team/team-mgr.css";
</style>
