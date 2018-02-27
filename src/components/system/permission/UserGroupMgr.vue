<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <el-button type="primary" class="pri-button">新增权限</el-button>
    </div>
    <el-table
      :data="menuList"
      style="width: 100%;position: absolute;top:60px;bottom: 0px;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.childs">
            <el-table-column
              label="菜单名称"
              prop="name">
            </el-table-column>
            <el-table-column
              label="菜单编码"
              prop="code">
            </el-table-column>
            <el-table-column
              label="图标"
              prop="icon">
              <template slot-scope="scope">
                <i :class="scope.row.icon"></i>
              </template>
            </el-table-column>
            <el-table-column
              label="级别"
              prop="level">
            </el-table-column>
            <el-table-column
              label="路径"
              prop="path">
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
                  <el-button size="mini" round type="danger" @click="showDeleteMenuDialog(scope.row.id)">删除</el-button>
                  <el-button size="mini" round type="primary">
                    <router-link :to="{name:'menu-edit',params:{id:scope.row.id},query:{name:'菜单编辑'}}" style="color: white">编辑</router-link>
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        label="菜单名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="菜单编码"
        prop="code">
      </el-table-column>
      <el-table-column
        label="图标">
        <template slot-scope="scope">
          <i :class="scope.icon"></i>
        </template>
      </el-table-column>
      <el-table-column
        label="级别"
        prop="level">
      </el-table-column>
      <el-table-column
        label="路径"
        prop="path">
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
            <el-button size="mini" round type="danger" @click="showDeleteMenuDialog(scope.row.id)">删除</el-button>
            <el-button size="mini" round type="primary">
              <router-link :to="{name:'menu-edit',params:{id:scope.row.id},query:{name:'菜单编辑'}}" style="color: white">编辑</router-link>
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="删除提示"
      :visible.sync="dialogDeleteShow"
      width="30%"
      center :modal-append-to-body="false" @close="deleteDialogClose">
      <span>确认删除选中餐厅吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmDeleteMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../../assets/js/system/permission/usergroup.js"></script>

<style scoped>
  @import "../../../assets/css/system/permission/usergroup.css";
</style>
