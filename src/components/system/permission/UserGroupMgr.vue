<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <el-button type="primary" class="pri-button" @click="dialogEditShow=true">新增用户组</el-button>
    </div>
    <el-table
      :data="groupData.list"
      class="page-list">
      <el-table-column
        label="名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="编码"
        prop="code">
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
            <el-button size="mini" round type="danger" @click="confirmDeleteMenu(scope.row.id)" icon="el-icon-delete"></el-button>
            <el-button size="mini" round type="success" @click="showConfigDialog(scope.row)" icon="el-icon-setting"></el-button>
            <el-button size="mini" round type="primary" @click="showEditDialog(scope.row)" icon="el-icon-edit-outline"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      :page-size="groupData.pageSize"
      layout="total, prev, pager, next"
      :total="groupData.total"
      @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog title="新增用户组" :visible.sync="dialogEditShow" width="50%" :modal-append-to-body="false">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="form.code" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmGroup">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="form.name+'-权限配置'" :visible.sync="dialogConfigShow" width="50%" center
               :modal-append-to-body="false" @close="closeConfigDialog">
      <el-transfer
        style="position: relative;left: 56%;transform: translateX(-50%)"
        :titles="['未选','已选']"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入权限名称"
        v-model="checkList"
        :data="nocheckList">
      </el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfigShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmConfigPermission">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../../assets/js/system/permission/usergroup.js"></script>

<style scoped>
  @import "../../../assets/css/system/permission/usergroup.css";
</style>
