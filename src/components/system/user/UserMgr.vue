<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <router-link to="/user/user-add" style="color:white;">
        <el-button type="primary" class="pri-button">新增用户</el-button>
      </router-link>
    </div>
    <el-table
      :data="userList"
      style="width: 100%;position: absolute;top:60px;bottom: 0px;">
      <el-table-column
        label="名称"
        prop="nickName">
      </el-table-column>
      <el-table-column
        label="账号"
        prop="userAccount">
      </el-table-column>
      <el-table-column
        label="手机号码"
        prop="tel">
      </el-table-column>
      <el-table-column
        label="性别">
        <template slot-scope="scope">
          {{scope.row.sex==1?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column
        label="头像"
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
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" round type="danger" @click="showDeleteDialog(scope.row.id)" icon="el-icon-delete"></el-button>
            <el-button size="mini" round type="success" @click="gotoConfigPage(scope.row.id)" icon="el-icon-setting"></el-button>
            <el-button size="mini" round type="primary" @click="gotoEditPage(scope.row.id)" icon="el-icon-edit-outline"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="删除提示"
      :visible.sync="dialogDeleteShow"
      width="30%"
      center :modal-append-to-body="false">
      <span>确认删除选中用户吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmDeleteMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../../assets/js/system/user/user.js"></script>

<style scoped>
  @import "../../../assets/css/system/user/user.css";
</style>
