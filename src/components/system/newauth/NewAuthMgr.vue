<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <el-button type="primary" class="pri-button" @click="showInsertDialog">新增新闻客户端</el-button>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="form.Name" clearable placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.Status" clearable placeholder="状态">
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
      size="mini"
      :data="newData.list"
      class="page-list">
      <el-table-column
        label="名称"
        prop="name">
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank">打开</a>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-switch
            disabled
            v-model="scope.row.status"
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
      :page-size="newData.pageSize"
      layout="total, prev, pager, next"
      :total="newData.total"
      @current-change="getData">
    </el-pagination>

    <el-dialog title="新增客户端" :visible.sync="dialogEditShow" width="50%" :modal-append-to-body="false">
      <el-form ref="editForm" :model="editForm" size="mini" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-switch v-model="editForm.status"></el-switch>
            </el-form-item>
            <el-form-item label="新闻地址">
              <el-input v-model="editForm.url"></el-input>
            </el-form-item>
            <el-form-item label="授权地址">
              <el-input v-model="editForm.authUrl"></el-input>
            </el-form-item>
            <el-form-item label="重定向地址">
              <el-input v-model="editForm.redirectUrl"></el-input>
            </el-form-item>
            <el-form-item label="操作">
              <el-select v-model="checkOprs" multiple placeholder="请选择">
                <el-option
                  v-for="item in Oprs"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应用ID">
              <el-input v-model="editForm.appId"></el-input>
            </el-form-item>
            <el-form-item label="应用Key">
              <el-input v-model="editForm.appKey"></el-input>
            </el-form-item>
            <el-form-item label="应用Secret">
              <el-input v-model="editForm.appSecret"></el-input>
            </el-form-item>
            <el-form-item label="授权编码">
              <el-input v-model="editForm.authCode"></el-input>
            </el-form-item>
            <el-form-item label="工厂类">
              <el-input v-model="editForm.cls"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../../assets/js/system/newauth/newauth.js"></script>

<style scoped>
  @import "../../../assets/css/system/newauth/newauth.css";
</style>
