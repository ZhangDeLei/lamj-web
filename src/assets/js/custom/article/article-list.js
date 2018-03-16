import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'

export default {
  name: "article-list",
  data() {
    return {
      articleData: {},
      form: {},
      pageSize: 10,
      typeData: []
    }
  },
  mounted() {
    this.getData(1)
    this.getDictList();
  },
  methods: {
    getDictList: function () {
      httpReq.get(api.url_getDictListByEnName, {EnName: 'Article_Type'}).then(res => {
        this.typeData = res.data;
      })
    },
    getData: function (pages) {
      this.form.CompanyId = store.state.user.companyId;
      this.form.PageSize = this.pageSize;
      this.form.CurPage = pages;
      httpReq.get(api.url_getArticleList, this.form).then(res => {
        this.articleData = res.data;
      })
    },
    handleCurrentChange: function (val) {
      this.getData(val)
    },
    onSearch: function () {
      this.getData(1)
    },
    deleteItem: function (id) {
      this.$confirm('确认删除当前文章吗？', '提示', {confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning'}).then(() => {
        httpReq.post(api.url_deleteArticle, {Id: id}).then(res => {
          if (res.code == 100) {
            this.$message.success('删除成功')
            this.getData(1)
          } else {
            this.$message.success(res.msg)
          }
        })
      })
    },
    openDetail: function (id) {
      this.$router.push({name: 'article-add', params: {id: id}, query: {name: '文章编辑'}})
    }
  }
}
