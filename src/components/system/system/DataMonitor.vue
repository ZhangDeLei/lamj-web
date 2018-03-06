<template>
  <div v-html="html"></div>
</template>

<script>
  import api from '../../../assets/plugins/http/api'
  import httpReq from '../../../assets/plugins/http/httpService'
  export default {
    name: "data-monitor",
    data() {
      return {
        html: ''
      }
    },
    mounted() {
      this.load(api.url_dataMonitor);
    },
    methods: {
      load(url) {
        if (url && url.length > 0) {
          httpReq.html(url).then(res=>{
            this.html = res.data;
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
