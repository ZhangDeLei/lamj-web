<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
      <router-link :to="{name:'task-add',query:{name:'发布新任务'}}">
        <el-button type="primary" class="pri-button">发布新任务</el-button>
      </router-link>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="form.Name" clearable placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            style="width: 150px;"
            v-model="form.BegDate"
            type="date"
            placeholder="选择开始时间">
          </el-date-picker>
          -
          <el-date-picker
            style="width: 150px;"
            v-model="form.EndDate"
            type="date"
            placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="站点">
          <el-select v-model="form.newId" style="width: 100px;" clearable placeholder="状态">
            <el-option v-for="item in newData" :key="item.id" :label="item.name" value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="searchBtn">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="taskData.list"
      class="page-list"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="日期">
        <template slot-scope="scope">
          {{getTime(scope.row.createDate)}}
        </template>
      </el-table-column>
      <el-table-column
        label="任务名称"
        prop="title">
      </el-table-column>
      <el-table-column label="站点" prop="newName"/>
      <el-table-column label="执行" prop="execTypeName"/>
      <el-table-column label="操作员" prop="createUserName"/>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button round icon="el-icon-delete" type="danger" @click="commitDelete(scope.row.id)" size="mini"/>
            <el-button round icon="el-icon-document" @click="openPage(scope.row.url)" type="success" size="mini"/>
            <el-button round icon="el-icon-edit-outline" @click="openEditPage(scope.row.id)" type="primary"
                       size="mini"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-button class="batch-btn" @click="batchCommitDelete" type="danger" size="mini">批量删除</el-button>
    <el-pagination
      class="page"
      :page-size="taskData.pageSize"
      layout="total, prev, pager, next"
      :total="taskData.total"
      @current-change="getData">
    </el-pagination>
  </div>
</template>

<script src="../../../assets/js/custom/task/task.js"></script>

<style scoped>
  @import "../../../assets/css/custom/task/task.css";
</style>
