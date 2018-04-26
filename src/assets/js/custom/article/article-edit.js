import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'

export default {
  name: "article-edit",
  data() {
    return {
      form: {},
      DictData: [],
      LevelData: [],
      rules: {
        title: [{required: true, message: '请输入标题'}],
        url: [{required: true, message: '请输入文章地址'}],
        typeId: [{required: true, message: '请选择类型'}],
        levelId: [{required: true, message: '请选择级别'}]
      }
    }
  },
  mounted() {
    this.getDictList();
    this.updateUI();
    this.getLevelList();
  },
  watch: {
    "$router": "updateUI"
  },
  methods: {
    getLevelList: function () {
      httpReq.get(api.url_getArticleLevelList, {CompanyId: store.state.user.companyId, Status: true}).then(res => {
        this.LevelData = res.data;
      })
    },
    updateUI: function () {
      if (this.$route.params.id) {
        httpReq.get(api.url_getArticleById, {Id: this.$route.params.id}).then(res => {
          this.form = res.data;
        })
      }
    },
    getDictList: function () {
      httpReq.get(api.url_getDictListByEnName, {EnName: 'Article_Type'}).then(res => {
        this.DictData = res.data;
      })
    },
    changeType: function () {
      var obj = this.DictData.filter(t => {
        return t.id == this.form.typeId;
      })[0]
      this.form.typeCode = obj.code;
      this.form.typeName = obj.label;
    },
    onSubmit: function () {
      var _this = this;
      this.$refs['form'].validate(function (v) {
        if (v) {
          var url = _this.form.id ? api.url_updateArticle : api.url_insertArticle;
          _this.form.companyId = store.state.user.companyId;
          _this.form.createUserId = store.state.user.id;
          _this.form.createUserName = store.state.user.nickName;
          httpReq.post(url, _this.form).then(res => {
            if (res.code == 100) {
              _this.$message.success('操作成功')
              _this.$router.push({name: 'article-list', query: {name: '文章管理'}})
            } else {
              _this.$message.error(res.msg)
            }
          })
        }
      });
    },
    changeLevel: function () {
      var obj = this.LevelData.filter(t => {
        return t.id == this.form.levelId;
      })[0]
      this.form.levelName = obj.name;
    }
  }
}
