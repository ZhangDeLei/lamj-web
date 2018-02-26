<template>
  <div>
    <div>asdasdf</div>
    <app-header></app-header>
    <div class="down-main">
      <app-leftmenu></app-leftmenu>
      <div class="right-product my-index right-full">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script src="../assets/js/index.js"></script>

<style scoped>
  @import "../assets/css/index.css";
</style>
