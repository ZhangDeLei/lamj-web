<template>
  <el-table
    :data="menuList"
    style="width: 100%;position: absolute;top:0px;bottom: 0px;">
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
  </el-table>
</template>

<script src="../../assets/js/menu-mgr.js"></script>

<style scoped>
  @import "../../assets/css/menu-mgr.css";
</style>
