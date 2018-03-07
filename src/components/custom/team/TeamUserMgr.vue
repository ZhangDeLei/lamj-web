<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <router-link :to="{name:'team-user-edit',query:{name:'新增账号'}}" style="color:white;">
        <el-button type="primary" class="pri-button">新增用户</el-button>
      </router-link>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="searchForm.Name" clearable placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="searchForm.UserAccount" clearable placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="searchForm.Tel" clearable placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item class="searchBtn">
          <el-button type="primary" @click="onSearch">查询<i class="el-icon-search el-icon--right"></i></el-button>
          <el-button @click="showMore">更多条件<i class="el-icon-more el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      class="page-list"
      :data="userData.list">
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
            v-model="scope.row.status"
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
            <el-button size="mini" round type="primary" @click="gotoEditPage(scope.row.id)"
                       icon="el-icon-edit-outline"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      :page-size="userData.pageSize"
      layout="total, prev, pager, next"
      :total="userData.total"
      @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog width="50%" title="查询" :modal-append-to-body="false" :visible.sync="showMoreDialog">
      <el-form ref="form" :model="searchForm" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称">
              <el-input v-model="searchForm.Name" clearable placeholder="名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号">
              <el-input v-model="searchForm.UserAccount" clearable placeholder="账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码">
              <el-input v-model="searchForm.Tel" clearable placeholder="手机号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="searchForm.Sex" clearable placeholder="性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="searchForm.Status" clearable placeholder="状态">
                <el-option label="可用" value="1"></el-option>
                <el-option label="不可用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="星级">
              <el-select v-model="searchForm.StarLevelId" clearable placeholder="星级">
                <el-option v-for="item in StarList" :key="item.id" :label="item.label" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="队伍">
              <el-select v-model="searchForm.TeamId" clearable filterable placeholder="队伍">
                <el-option v-for="item in TeamList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showMoreDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSearch">开始查询</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../../assets/js/custom/team/team-user-mgr.js"></script>

<style scoped>
  @import "../../../assets/css/custom/team/team-user-edit.css";
</style>
