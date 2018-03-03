<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <router-link :to="{name:'user-add',query:{name:'新增账号'}}" style="color:white;">
        <el-button type="primary" class="pri-button">新增用户</el-button>
      </router-link>
    </div>
    <div style="width: 100%;position: absolute;top:60px;bottom: 0px;overflow: auto;">
      <el-table
        :data="userList"
        height="600px">
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
          label="头像">
          <template slot-scope="scope">
            <img v-if="scope.row.photoUrl" style="width: 50px;height: 50px;" :src="url+scope.row.photoUrl"/>
          </template>
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
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button-group>
              <el-button size="mini" round type="danger" @click="confirmDeleteMenu(scope.row.id)"
                         icon="el-icon-delete"></el-button>
              <el-button size="mini" round type="success" @click="gotoConfigPage(scope.row.id)"
                         icon="el-icon-setting"></el-button>
              <el-button size="mini" round type="primary" @click="gotoEditPage(scope.row.id)"
                         icon="el-icon-edit-outline"></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script src="../../../assets/js/system/user/user.js"></script>

<style scoped>
  @import "../../../assets/css/system/user/user.css";
</style>
