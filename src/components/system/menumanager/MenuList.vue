<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <router-link :to="{name:'menu-add',query:{name:'菜单新增'}}">
      <el-button type="primary" class="pri-button">
        新增菜单
      </el-button></router-link>
    </div>
    <div class="table-list">
      <el-table
        :data="menuList">
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
                    v-model="scope.row.status"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button size="mini" round type="danger" @click="confirmDeleteMenu(scope.row.id)">删除</el-button>
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
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" round type="danger" @click="confirmDeleteMenu(scope.row.id)" icon="el-icon-delete"></el-button>
              <el-button size="mini" round type="primary" icon="el-icon-edit-outline" @click="gotoEditMenu(scope.row)">
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script src="../../../assets/js/system/menu/menu-mgr.js"></script>

<style scoped>
  @import "../../../assets/css/system/menu/menu-mgr.css";
</style>
