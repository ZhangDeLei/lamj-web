<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <el-button type="primary" class="pri-button" @click="showInsertDialog">新增应用</el-button>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="searchForm.Name" clearable placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select placeholder="请选择类别" clearable v-model="searchForm.TypeId">
            <el-option v-for="item in dictList" :key="item.id" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="searchBtn">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      size="mini"
      class="page-list"
      :data="appData.list">
      <el-table-column label="类别" prop="typeName"/>
      <el-table-column
        label="名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="版本号"
        prop="version">
      </el-table-column>
      <el-table-column
        label="版本编码"
        prop="versionCode">
      </el-table-column>
      <el-table-column
        label="更新内容" prop="comment">
      </el-table-column>
      <el-table-column
        label="下载地址" prop="url">
      </el-table-column>
      <el-table-column
        label="上传时间" prop="uploadTime">
      </el-table-column>
      <el-table-column
        label="上传人" prop="uploadUserName">
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
    <el-pagination
      class="page"
      :page-size="appData.pageSize"
      layout="total, prev, pager, next"
      :total="appData.total"
      @current-change="handleCurrentChange">
    </el-pagination>

    <el-dialog title="新增应用" :visible.sync="dialogEditShow" width="50%" :modal-append-to-body="false">
      <el-form ref="editForm" :model="editForm" size="mini" :rules="rules" label-width="100px">
        <el-form-item label="应用名称" prop="name">
          <el-input v-model="editForm.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="editForm.version" placeholder="版本号"></el-input>
        </el-form-item>
        <el-form-item label="版本编码" prop="versionCode">
          <el-input v-model="editForm.versionCode" placeholder="版本编码"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="typeId">
          <el-select placeholder="请选择类别" clearable v-model="editForm.typeId" @change="typeChange">
            <el-option v-for="item in dictList" :key="item.id" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更新内容" prop="comment">
          <el-input v-model="editForm.comment" placeholder="更新内容" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="App文件">
          <div>
            <label class="selectImage" for="appFile">选择文件</label>
            <input type="file" id="appFile" @change="changeFile"/>
          </div>
          <div class="fileinfo" v-if="appFile.name">
            {{appFile.name}}<i class="el-icon-circle-close-outline" @click="removeFile"></i>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../../assets/js/system/appmanager/app-manager.js"></script>

<style scoped>
  @import "../../../assets/css/system/appmanager/app-manager.css";
</style>
