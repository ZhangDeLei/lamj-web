<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <div class="searchContent">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="form.Title" style="width: 150px;" clearable placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            style="width: 150px;"
            v-model="form.BegDate"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始时间">
          </el-date-picker>
          -
          <el-date-picker
            style="width: 150px;"
            v-model="form.EndDate"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="站点">
          <el-select v-model="form.NewId" style="width: 100px;" clearable placeholder="请选择站点">
            <el-option v-for="item in newData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="form.StageId" style="width: 100px;" clearable placeholder="请选择阶段">
            <el-option v-for="item in stageData" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="searchBtn">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      size="mini"
      :data="taskData.list"
      class="page-list">
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
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{scope.row.userComplated?scope.row.stageName:'已完成'}}
        </template>
      </el-table-column>
      <el-table-column label="操作员" prop="createUserName"/>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button round icon="el-icon-document" @click="openPage(scope.row.url)" type="success" size="mini"/>
            <el-button round icon="el-icon-circle-check-outline" type="primary" size="mini"
                       @click="showConfirmDialog(scope.row)"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="page"
      :page-size="taskData.pageSize"
      layout="total, prev, pager, next"
      :total="taskData.total"
      @current-change="getData">
    </el-pagination>

    <el-dialog title="完成任务" :visible.sync="dialogEditShow" :modal-append-to-body="false">
      <el-form ref="editForm" :model="editForm" size="mini" label-width="100px">
        <el-form-item label="标题">
          {{taskInfo.title}}
        </el-form-item>
        <el-form-item label="站点">
          {{taskInfo.newName}}
        </el-form-item>
        <el-form-item label="任务地址">
          <a :href="taskInfo.url" target="_blank">{{taskInfo.url}}</a>
        </el-form-item>
        <el-form-item label="状态">
          {{taskInfo.userComplated?taskInfo.stageName:'已完成'}}
        </el-form-item>
        <el-form-item label="图片" v-if="!taskInfo.userComplated">
          <img :src="taskInfo.imageUrl" style="width: 200px;height: 200px;" @mouseover="mouseOver()" @mouseout="mouseOut()"/>
          <img :src="taskInfo.imageUrl" style="position: absolute;top:-200px;left:-0px;transform: scale(0.5,0.5)" v-if="imageShow"/>
        </el-form-item>
        <el-form-item label="选择图片" v-if="taskInfo.userComplated">
          <div>
            <label class="selectImage" for="articleFile">选择文件</label>
            <input type="file" id="articleFile" @change="changeFile"/>
            <span class="tip">只能上传png/jpg/jpeg文件</span>
          </div>
          <div class="fileinfo" v-if="taskFile.name">
            {{taskFile.name}}<i class="el-icon-circle-close-outline" @click="removeFile"></i>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="taskInfo.userComplated">
        <el-button @click="dialogEditShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="../../../assets/js/custom/task/person-task.js"></script>

<style scoped>
  @import "../../../assets/css/custom/task/person-task.css";
</style>
