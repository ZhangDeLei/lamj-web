<template>
  <div class="content" style="padding: 10px;background: #eaedf1;">
    <div class="row org">
      <div class="col-sm-4">
        <div class="cpanel">
          <div class="title">
            <span class="name">企业数</span>
          </div>
          <div class="cont">
            <label>{{total.companyTotal}}</label>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="cpanel">
          <div class="title">
            <span class="name">用户数</span>
          </div>
          <div class="cont">
            <label>{{total.userTotal}}</label>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="cpanel">
          <div class="title">
            <span class="name">任务数</span>
          </div>
          <div class="cont">
            <label>{{total.taskTotal}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="row cpanel task">
      <div class="title">
        <span class="name" style="color: red">将要到期企业</span>
      </div>
      <div class="cont">
        <table class="etable">
          <thead>
            <tr>
              <td>到期时间</td>
              <td>最大人数</td>
              <td>企业名称</td>
              <td>地址</td>
              <td>联系人</td>
              <td>联系号码</td>
            </tr>
          </thead>
          <tbody>
          <tr style="cursor: pointer" v-for="item in companyData">
            <td style="color: red">{{item.expiredDate}}</td>
            <td>{{item.maxNumUser}}</td>
            <td>{{item.name}}</td>
            <td>{{item.address}}</td>
            <td>{{item.concatUserName}}</td>
            <td>{{item.concatUserPhone}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script src="../../assets/js/main.js"></script>

<style scoped>
  @import "../../assets/css/main.css";
</style>
