import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'

export default {
  name: "menu-left",
  data() {
    return {
      menuList: [],
      currentMenuCode: ''
    };
  },
  mounted: function () {
    this.getMenuList();
  },
  methods: {
    sendRedirect: function (i) {
      if (i.path) {
        this.currentMenuCode = i.code;
        this.$router.push({path: i.path, query: {name: i.name}});
      }
    },
    showNav: function (e) {
      /*显示*/
      if ($(e.currentTarget).find("span:first-child").attr('class') == "title-icon glyphicon glyphicon-chevron-down") {
        $(e.currentTarget).find("span:first-child").removeClass("glyphicon-chevron-down");
        $(e.currentTarget).find("span:first-child").addClass("glyphicon-chevron-up");
        $(e.currentTarget).removeClass("sublist-down");
        $(e.currentTarget).addClass("sublist-up");
      }
      /*隐藏*/
      else {
        $(e.currentTarget).find("span:first-child").removeClass("glyphicon-chevron-up");
        $(e.currentTarget).find("span:first-child").addClass("glyphicon-chevron-down");
        $(e.currentTarget).removeClass("sublist-up");
        $(e.currentTarget).addClass("sublist-down");
      }
      // 修改数字控制速度， slideUp(500)控制卷起速度
      $(e.currentTarget).next(".navContent").slideToggle(100).siblings(".navContent").slideUp(100);
    },
    showMenu: function (e) {
      if ($(e.currentTarget).parent().attr('class') == "left-main left-full") {
        $(e.currentTarget).parent().removeClass("left-full");
        $(e.currentTarget).parent().addClass("left-off");

        $(e.currentTarget).parent().parent().find(".right-product").removeClass("right-full");
        $(e.currentTarget).parent().parent().find(".right-product").addClass("right-off");

      }
      else {
        $(e.currentTarget).parent().removeClass("left-off");
        $(e.currentTarget).parent().addClass("left-full");

        $(e.currentTarget).parent().parent().find(".right-product").removeClass("right-off");
        $(e.currentTarget).parent().parent().find(".right-product").addClass("right-full");

      }
    },
    getMenuList: function () {
      httpReq.get(api.url_getMenuListByUserId, {'UserId': store.state.user.id}).then(res => {
        if (res.code == 100) {
          this.menuList = res.data;
        }
      }).catch(err => {

      });
    },
    initMenu: function () {
      /*左侧鼠标移入提示功能*/
      $(".sBox ul li").mouseenter(function () {
        if ($(this).find("span:last-child").css("display") == "none") {
          $(this).find("div").show();
        }
      }).mouseleave(function () {
        $(this).find("div").hide();
      })
    }
  },
  updated: function () {
    this.initMenu();
  }
}
