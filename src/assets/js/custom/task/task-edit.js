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
    this.updateUI();
  },
  watch: {
    "$router": "updateUI"
  },
  methods: {
    updateUI: function () {
      if (this.$route.params.id) {
        this.getTaskDetail(this.$route.params.id)
      }
    },
    getTaskDetail: function (id) {
      // this.form = {};

      httpReq.get(api.url_getTaskById, {Id: id}).then(res => {
        this.form.id = res.data.id;
        this.form.url = res.data.url;
        this.form.title = res.data.title;
        this.form.comment = res.data.comment;
        this.form.integral = res.data.integral;
        this.form.newId = res.data.newId;
        this.form.newName = res.data.newName;
        this.form.typeId = res.data.typeId;
        this.form.typeCode = res.data.typeCode;
        this.form.typeName = res.data.typeName;
        this.form.expireDate = res.data.expireDate
        this.form.execTypeId = res.data.execTypeId;
        this.form.execTypeCode = res.data.execTypeCode;
        this.form.execTypeName = res.data.execTypeName;
        this.getTaskType();
        res.data.teams.forEach(t => {
          this.form.teamIds.push(t.id);
        })
      })
    },
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
      var obj = this.execType.filter(function (t) {
        return t.id == _this.form.execTypeId;
      })[0]
      this.form.execTypeCode = obj.code;
      this.form.execTypeName = obj.label;
    },
    commitEdit: function () {
      var _this = this;
      this.$refs['form'].validate(function (v) {
        if (v) {
          var url = _this.form.id ? api.url_updateTask : api.url_insertTask;
          _this.form.companyId = store.state.user.companyId;
          _this.form.teams = _this.convertTeamList();
          _this.form.createUserId = store.state.user.id;
          _this.form.createUserName = store.state.user.nickName;
          httpReq.post(url, _this.form).then(res => {
            if (res.code == 100) {
              _this.$message.success('操作成功')
              _this.$router.back();
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
