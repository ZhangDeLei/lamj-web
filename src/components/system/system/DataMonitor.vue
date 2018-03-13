<template>
  <div style="width: 100%;height: 100%;">
    <iframe src="http://localhost:8080/lamj/druid" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>
  </div>

</template>

<script>
  import api from '../../../assets/plugins/http/api'

  export default {
    name: "data-monitor",
    url: api.url_host + api.url_dataMonitor
  }
</script>

<style scoped>

</style>
