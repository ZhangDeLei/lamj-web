<template>
  <div class="content">
    <div class="crumb">
      <span class="title">{{this.$route.query.name}}</span>
    </div>
    <ul>
      <li v-for="i in newList"><a :href="i.url" target="_blank">{{i.newName}}</a></li>
    </ul>
  </div>
</template>

<script src="../../../assets/js/custom/patrol/patrol.js"></script>

<style scoped>
  @import "../../../assets/css/custom/patrol/patrol.css";
</style>
