<template>
  <div class="body">
    <div class="login-form">
      <div class="head-info">
        <label class="lbl-1"> </label>
        <label class="lbl-2"> </label>
        <label class="lbl-3"> </label>
      </div>
      <div class="clear"></div>
      <div class="avtar"><img src="../assets/images/avtar.png"/></div>
      <form autocomplete="off">
        <input type="text" class="text" v-model="userAccount" placeholder="Username">
        <div class="key"><input type="password" v-model="password" placeholder="Password" autocomplete="new-password"></div>
      </form>
      <div class="signin"><input type="submit" value="Login" @click="login()"></div>
    </div>
  </div>
</template>

<script src="../assets/js/login.js"></script>

<style scoped>
  @import "../assets/css/login.css";
</style>
