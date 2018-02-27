<template>
  <div class="left-main left-full">
    <div class="sidebar-fold" @click="showMenu"><span class="glyphicon glyphicon-menu-hamburger"></span></div>
    <div class="subNavBox">
      <div class="sBox" v-for="menu in menuList">
        <div class="subNav sublist-down" @click="showNav"><span class="title-icon glyphicon glyphicon-chevron-down"></span><span
          class="sublist-title">{{menu.name}}</span>
        </div>
        <ul class="navContent" style="display:block">
          <li v-bind:class="{active:currentMenuCode==item.code}" v-for="item in menu.childs">
            <div class="showtitle" style="width:100px;"><img src="../../../assets/images/leftimg.png"/>{{item.name}}</div>
            <a href="javascript:void(0)" @click="sendRedirect(item)"><span class="sublist-icon" :class="item.icon"></span><span
              class="sub-title">{{item.name}}</span></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="../../../assets/js/system/menu/menu-left.js"></script>

<style scoped>
  @import "../../../assets/css/system/menu/menu-left.css";
</style>
