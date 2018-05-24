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
        label="任务名称">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank">{{scope.row.title}}</a>
        </template>
      </el-table-column>
      <el-table-column label="站点" prop="newName"/>
      <el-table-column label="执行" prop="execTypeName"/>
      <el-table-column label="操作员" prop="createUserName"/>
      <el-table-column label="任务状态" prop="stageName"></el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button round icon="el-icon-delete" type="danger" @click="commitDelete(scope.row.id)" size="mini"/>
            <el-button round icon="el-icon-search" @click="openTaskCommen(scope.row)" type="success" size="mini"/>
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

    <el-dialog title="评论列表" :visible.sync="dialogCommentShow" :modal-append-to-body="false">
      <div>

        <el-table
          size="mini"
          :data="commentData.list">
          <el-table-column label="评论时间" prop="createTime"></el-table-column>
          <el-table-column label="评论人" prop="nickName"></el-table-column>
          <el-table-column label="内容" prop="content"></el-table-column>
          <el-table-column label="截图">
            <template slot-scope="scope">
              <img :src="host+scope.row.imageUrl" style="width:40px;height: 40px;" @click="mouseOver(scope.row)"/>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-size="commentData.pageSize"
          layout="total, prev, pager, next"
          :total="commentData.total"
          @current-change="commentData">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCommentShow = false">关闭</el-button>
        <el-button type="primary" @click="confirmEdit">完成任务</el-button>
      </span>
    </el-dialog>

    <div style="position: absolute;width: 100%;height: 100%;text-align: center; z-index: 99999" v-if="showImage">
      <div style="position: absolute;width: 100%;height: 100%;background: black;opacity: 0.5;" @click="mouseOut()"></div>
      <img :src="curUrl" style="position: absolute;left: 50%;transform: translateX(-50%)" />
    </div>
  </div>
</template>

<script src="../../../assets/js/custom/task/task.js"></script>

<style scoped>
  @import "../../../assets/css/custom/task/task.css";
</style>
