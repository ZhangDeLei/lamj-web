import api from '../../plugins/http/api'
import http from '../../plugins/http/httpService'
import store from '../../../store/store'
import echarts from 'echarts'

export default {
  name: "custom-main",
  data() {
    return {
      list: [],
      teamIntegralList: [],
      userIntegralList: [],
      taskList: [],
      teamList: [],
      teamTotal: 0
    }
  },
  mounted() {
    this.getData();
    this.getIntegralTotal();
    this.getTaskTotal();
    this.getTeamTotal();
  },
  methods: {
    getData: function () {
      http.get(api.url_getTaskListByNew, {CompanyId: store.state.user.companyId}).then(res => {
        this.list = res.data;
      })
    },
    getTeamTotal: function () {
      http.get(api.url_chartTeam, {CompanyId: store.state.user.companyId}).then(res => {
        this.teamList = res.data;
        let teamList = [];
        for (let item of res.data) {
          teamList.push({value: item.total, name: item.label});
          this.teamTotal+=item.total;
        }
        this.initRingCharts(teamList);
      })
    },
    getTaskTotal: function () {
      http.get(api.url_chartTask, {CompanyId: store.state.user.companyId}).then(res => {
        this.taskList = res.data;
        let list = [];
        for (let item of res.data) {
          list.push({value: item.total, name: item.label});
        }
        this.initPieCharts(list);
      })
    },
    getIntegralTotal: function () {
      http.get(api.url_chartIntegral, {CompanyId: store.state.user.companyId}).then(res => {
        this.teamIntegralList = res.data.teamIntegral;
        this.userIntegralList = res.data.teamUserIntegral;
        let teamList = [];
        let teamIntegralList = [];
        let userIntegralList = [];
        let maxMinList = [];
        for (let item of res.data.teamIntegral) {
          teamList.push(item.label);
          teamIntegralList.push(item.total);
        }
        let max = {name: '最高', value: 0, xAxis: 0, yAxis: 0};
        let min = {name: '最低', value: 0, xAxis: 0, yAxis: 0};
        for (let idx = 0; idx < res.data.teamUserIntegral.length; idx++) {
          let item = res.data.teamUserIntegral[idx];
          userIntegralList.push(item.total);
          if (idx == 0) {
            max.value = item.total;
            max.xAxis = idx;
            max.yAxis = item.total;
            min.value = item.total;
            min.xAxis = idx;
            min.yAxis = item.total;
          }
          if (item.total > max.value) {
            max.value = item.total;
            max.xAxis = idx;
            max.yAxis = item.total;
          }
          if (item.total < min.value) {
            min.value = item.total;
            min.xAxis = idx;
            min.yAxis = item.total;
          }
        }
        maxMinList.push(max);
        maxMinList.push(min);
        this.initBarCharts(teamList, teamIntegralList, userIntegralList, maxMinList);
      });
    },
    initRingCharts: function (list) {
      let myEcharts = echarts.init(document.getElementById('ringCharts'))
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)"
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '20%'],

            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 335, name: '全国级', selected: true},
              {value: 679, name: '省级'},
              {value: 1548, name: '市级'}
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              normal: {
                formatter: '{b|{b}} {d}%',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  b: {
                    fontSize: 8,
                    lineHeight: 20
                  }
                }
              }
            },
            data: list
          }
        ]
      };
      myEcharts.setOption(option)
    },
    initPieCharts: function (list) {
      let myEcharts = echarts.init(document.getElementById('pieCharts'))
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b}: {c} ({d}%)"
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: list,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myEcharts.setOption(option)
    },
    initBarCharts: function (teamList, teamIntegralList, userIntegralList, maxMinList) {
      let myEcharts = echarts.init(document.getElementById('barCharts'))
      let option = {
        tooltip: {trigger: 'axis'},
        toolbox: {
          show: true,
          feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [{type: 'category', data: teamList}],
        yAxis: [{type: 'value'}],
        series: [
          {
            type: 'bar',
            data: teamIntegralList,
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },
          {
            type: 'bar',
            data: userIntegralList,
            markPoint: {
              data: maxMinList
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }
        ]
      };
      myEcharts.setOption(option)
    }
  }
}
