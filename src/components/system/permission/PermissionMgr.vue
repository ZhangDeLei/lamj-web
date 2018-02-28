<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <el-button type="primary" class="pri-button" @click="showInsertDialog">新增权限</el-button>
    </div>
    <el-table
      :data="permissionList"
      style="width: 100%;position: absolute;top:60px;bottom: 0px;">
      <el-table-column
        label="权限名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="权限编码"
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
            <el-button size="mini" round type="danger" @click="showDeleteDialog(scope.row.id)">删除</el-button>
            <el-button size="mini" round type="success" @click="showConfigDialog(scope.row)">权限配置</el-button>
            <el-button size="mini" round type="primary" @click="showEditDialog(scope.row)">编辑</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="删除提示"
      :visible.sync="dialogDeleteShow"
      width="30%"
      center :modal-append-to-body="false">
      <span>确认删除选中权限吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmDeleteMenu">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增权限" :visible.sync="dialogEditShow" width="50%" :modal-append-to-body="false">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="权限名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="权限编码">
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
        <el-button type="primary" @click="confirmPermission">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="form.name+'-权限配置'" :visible.sync="dialogConfigShow" width="50%" center
               :modal-append-to-body="false" @close="closeConfigDialog">
      <el-row>
        <el-col :span="10">
          <div class="config">
            <div class="title">已选列表</div>
            <div class="list">
              <el-tree :data="getPermissionTreeList"
                       show-checkbox node-key="id" ref="checkTree" default-expand-all></el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="config button">
            <div class="center">
              <el-button icon="el-icon-arrow-left" round @click="addMenu"></el-button>
              <el-button icon="el-icon-arrow-right" round @click="removeMenu"></el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="config">
            <div class="title">未选列表</div>
            <div class="list">
              <el-tree :data="getNocheckMenuTree"
                       show-checkbox node-key="id" ref="nocheckTree" default-expand-all></el-tree>
            </div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfigShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmConfigPermission">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../../assets/js/system/permission/permission.js"></script>

<style scoped>
  @import "../../../assets/css/system/permission/permission.css";
</style>
