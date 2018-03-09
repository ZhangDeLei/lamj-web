import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'

export default {
  name: "task-edit",
  data() {
    return {
      form: {},
      teamList: [],
      newList: [],
      taskType: [],
      execType: [],
      rules: {
        url: [{required: true, message: '请输入地址'}],
        name: [{required: true, message: '请输入名称'}],
        title: [{required: true, message: '请输入标题'}],
        integral: [{required: true, message: '请输入任务积分'}],
        teamIds: [{required: true, message: '请选择执行范围'}],
        newId: [{required: true, message: '请选择任务网站'}],
        typeId: [{required: true, message: '请选择任务类别'}],
        expireDate: [{required: true, message: '请选择任务时段'}],
        execTypeId: [{required: true, message: '请选择执行类型'}]
      }
    }
  },
  mounted() {
    this.getNewList();
    this.getDictList();
    this.getTeamList();
  },
  methods: {
    getNewList: function () {
      httpReq.get(api.url_getAllNewAuthList).then(res => {
        this.newList = res.data;
      })
    },
    getDictList: function () {
      httpReq.get(api.url_getDictListByEnName, {EnName: 'ExecType'}).then(res => {
        if (res.code == 100) {
          this.execType = res.data;
        }
      })
    },
    getTaskType: function () {
      httpReq.get(api.url_getNewAuthOperatorTypeList, {NewId: this.form.newId}).then(res => {
        this.taskType = res.data;
      })
    },
    getTeamList: function () {
      httpReq.get(api.url_getTeamListByCompanyId, {CompanyId: store.state.user.companyId}).then(res => {
        this.teamList = res.data;
      })
    },
    newChange: function () {
      var _this = this;
      var obj = this.newList.filter(function (t) {
        return t.id == _this.form.newId;
      })[0]
      this.form.newName = obj.name;
      this.getTaskType();
    },
    typeChange: function () {
      var _this = this;
      var obj = this.taskType.filter(function (t) {
        return t.oprTypeId == _this.form.typeId;
      })[0]

      this.form.typeCode = obj.oprTypeCode;
      this.form.typeName = obj.oprTypeName;
    },
    execTypeChange: function () {
      var _this = this;
      console.log(this.form.execTypeId)
      var obj = this.execType.filter(function (t) {
        return t.id == _this.form.execTypeId;
      })[0]
      console.log(obj)
      this.form.execTypeCode = obj.code;
      this.form.execTypeName = obj.label;
    },
    commitEdit: function () {
      var _this = this;
      this.$refs['form'].validate(function (v) {
        if (v) {
          _this.form.companyId = store.state.user.companyId;
          _this.form.teams = _this.convertTeamList();
          _this.form.createUserId = store.state.user.id;
          _this.form.createUserName = store.state.user.nickName;
          console.log(_this.form)
          httpReq.post(api.url_insertTask, _this.form).then(res => {
            if (res.code == 100) {
              _this.form = {};
              _this.form.teamIds = [];
              _this.$message.success('操作成功')
            } else {
              _this.$message.success(res.msg)
            }
          })
        }
      });
    },
    convertTeamList: function () {
      var list = [];
      this.form.teamIds.forEach(t => {
        list.push({id: t});
      })
      return list;
    }
  }
}
