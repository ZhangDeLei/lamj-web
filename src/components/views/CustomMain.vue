<template>
  <div class="content" style="padding: 10px;background: #eaedf1;">
    <div class="row org">
      <div class="col-sm-4">
        <div class="cpanel">
          <div class="title">
            <span class="name">队伍架构</span>
          </div>
          <div class="cont">
            <div id="ringCharts" class="chart" style="top:-20px;"></div>
            <div class="chart-content">
              <div>总数:{{teamTotal}}人</div>
              <div v-for="item in teamList">{{item.label}}:{{item.total}}</div>
            </div>
          </div>

        </div>
      </div>
      <div class="col-sm-4">
        <div class="cpanel">
          <div class="title">
            <span class="name">网军任务</span>
          </div>
          <div class="cont">
            <div id="pieCharts" class="chart" style="top:-50px;"></div>
            <div class="chart-content">
              <ul>
                <li v-for="item in taskList">{{item.label}}:{{item.total}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="cpanel">
          <div class="title">
            <span class="name">积分数据</span>
          </div>
          <div class="cont">
            <div id="barCharts" class="chart" style="top:-20px;"></div>
            <div class="chart-content">
              <div class="c-left">
                <div v-for="item in teamIntegralList">{{item.label}}：{{item.total}}</div>
              </div>
              <div class="c-right">
                <div v-for="item in userIntegralList">{{item.label}}：{{item.total}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row cpanel task">
      <div class="title">
        <span class="name" style="color: red">最新任务</span>
      </div>
      <div class="cont">
        <table class="table">
          <tr style="cursor: pointer" v-for="item in list">
            <td>{{item.createDate}}</td>
            <td><span class="badge" style="background: #00c1de;">{{item.total}}</span></td>
            <td><span class="badge" style="background: red">{{item.commentTotal}}</span></td>
            <td><a :href="item.url" target="_blank">{{item.title}}</a></td>
            <td>{{item.newName}}</td>
            <td>{{item.typeName}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script src="../../assets/js/custom/custom-main.js"></script>

<style scoped>
  @import "../../assets/css/custom/custom-main.css";
</style>
