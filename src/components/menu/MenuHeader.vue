<template>
  <nav class="nav navbar-default navbar-mystyle navbar-fixed-top">
    <div class="navbar-header">
      <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand mystyle-brand"><span class="glyphicon glyphicon-home"></span></a></div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li class="li-border nav-title" @click="gotoMain">网评管理系统</li>
        <!--<li class="dropdown li-border"><a href="#" class="dropdown-toggle mystyle-color"-->
                                          <!--data-toggle="dropdown">产品与服务<span-->
          <!--class="caret"></span></a>-->
          <!--&lt;!&ndash;下拉框选项&ndash;&gt;-->
          <!--<div class="dropdown-menu topbar-nav-list">-->
            <!--<div class="topbar-nav-col">-->
              <!--<div class="topbar-nav-item">-->
                <!--<p class="topbar-nav-item-title">弹性计算</p>-->
                <!--<ul>-->
                  <!--<li><a href="#">-->
                    <!--<span class="glyphicon glyphicon-road"></span>-->
                    <!--<span class="">云服务器 ECS</span>-->
                  <!--</a>-->
                  <!--</li>-->
                  <!--<li><a href="#">-->
                    <!--<span class="glyphicon glyphicon-picture"></span>-->
                    <!--<span class="">云服务器 ECS</span>-->
                  <!--</a>-->
                  <!--</li>-->
                  <!--<li><a href="#">-->
                    <!--<span class="glyphicon glyphicon-gift"></span>-->
                    <!--<span class="">云服务器 ECS</span>-->
                  <!--</a>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</div>-->

              <!--<div class="">-->
                <!--<p class="topbar-nav-item-title">弹性计算</p>-->
                <!--<ul>-->
                  <!--<li><a href="#">-->
                    <!--<span class="glyphicon glyphicon-road"></span>-->
                    <!--<span class="">云服务器 ECS</span>-->
                  <!--</a>-->
                  <!--</li>-->
                  <!--<li><a href="#">-->
                    <!--<span class="glyphicon glyphicon-picture"></span>-->
                    <!--<span class="">云服务器 ECS</span>-->
                  <!--</a>-->
                  <!--</li>-->
                  <!--<li><a href="#">-->
                    <!--<span class="glyphicon glyphicon-gift"></span>-->
                    <!--<span class="">云服务器 ECS</span>-->
                  <!--</a>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</div>-->
            <!--</div>-->


            <!--<div class="topbar-nav-col">-->
              <!--<div class="topbar-nav-item">-->
                <!--<p class="topbar-nav-item-title">弹性计算</p>-->
                <!--<ul>-->
                  <!--<li><a href="#">-->
                    <!--<span class="glyphicon glyphicon-road"></span>-->
                    <!--<span class="">云服务器 ECS</span>-->
                  <!--</a>-->
                  <!--</li>-->
                  <!--<li><a href="#">-->
                    <!--<span class="glyphicon glyphicon-picture"></span>-->
                    <!--<span class="">云服务器 ECS</span>-->
                  <!--</a>-->
                  <!--</li>-->
                  <!--<li><a href="#">-->
                    <!--<span class="glyphicon glyphicon-gift"></span>-->
                    <!--<span class="">云服务器 ECS</span>-->
                  <!--</a>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</div>-->

              <!--<div class="">-->
                <!--<p class="topbar-nav-item-title">弹性计算</p>-->
                <!--<ul>-->
                  <!--<li><a href="#">-->
                    <!--<span class="glyphicon glyphicon-road"></span>-->
                    <!--<span class="">云服务器 ECS</span>-->
                  <!--</a>-->
                  <!--</li>-->
                  <!--<li><a href="#">-->
                    <!--<span class="glyphicon glyphicon-picture"></span>-->
                    <!--<span class="">云服务器 ECS</span>-->
                  <!--</a>-->
                  <!--</li>-->
                  <!--<li><a href="#">-->
                    <!--<span class="glyphicon glyphicon-gift"></span>-->
                    <!--<span class="">云服务器 ECS</span>-->
                  <!--</a>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</div>-->

            <!--</div>-->

          <!--</div>-->
        <!--</li>-->
      </ul>

      <ul class="nav navbar-nav pull-right">
        <!--<li class="li-border">-->
          <!--<a href="#" class="mystyle-color">-->
            <!--<span class="glyphicon glyphicon-bell"></span>-->
            <!--<span class="topbar-num">0</span>-->
          <!--</a>-->
        <!--</li>-->
        <!--<li class="li-border dropdown"><a href="#" class="mystyle-color" data-toggle="dropdown">-->
          <!--<span class="glyphicon glyphicon-search"></span> 搜索</a>-->
          <!--<div class="dropdown-menu search-dropdown">-->
            <!--<div class="input-group">-->
              <!--<input type="text" class="form-control">-->
              <!--<span class="input-group-btn">-->
                   <!--<button type="button" class="btn btn-default">搜索</button>-->
                <!--</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</li>-->
        <!--<li class="dropdown li-border"><a href="#" class="dropdown-toggle mystyle-color"-->
                                          <!--data-toggle="dropdown">帮助与文档<span-->
          <!--class="caret"></span></a>-->
          <!--<ul class="dropdown-menu">-->
            <!--<li><a href="http://localhost:8080/lamj/swagger-ui.html">帮助与文档</a></li>-->
            <!--<li class="divider"></li>-->
            <!--<li><a href="#">论坛</a></li>-->
            <!--<li class="divider"></li>-->
            <!--<li><a href="#">博客</a></li>-->
          <!--</ul>-->
        <!--</li>-->
        <li class="dropdown li-border"><a href="#" class="dropdown-toggle mystyle-color" data-toggle="dropdown">{{NickName}}<span
          class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="/">退出</a></li>
          </ul>
        </li>
        <!--<li class="dropdown"><a href="#" class="dropdown-toggle mystyle-color" data-toggle="dropdown">换肤<span-->
        <!--class="caret"></span></a>-->
        <!--<ul class="dropdown-menu changecolor">-->
        <!--<li id="blue"><a href="#">蓝色</a></li>-->
        <!--<li class="divider"></li>-->
        <!--<li id="green"><a href="#">绿色</a></li>-->
        <!--<li class="divider"></li>-->
        <!--<li id="orange"><a href="#">橙色</a></li>-->
        <!--</ul>-->
        <!--</li>-->
      </ul>
    </div>
  </nav>
</template>

<script src="../../assets/js/system/menu/menu-header.js"></script>
<style scoped>
  @import "../../assets/css/system/menu/menu-header.css";
</style>
