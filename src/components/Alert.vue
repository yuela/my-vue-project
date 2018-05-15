<template>
    <div class="alertInfo" v-show="alertInfo.success">
      {{ alertInfo.msg }}
    </div>
</template>

<script>
    export default {
        name: "Alert",
      data(){
          return {
            alertInfo:this.$store.state.message
          }
      }
    }
</script>

<style scoped>
.alertInfo{
  background: rgba(0,0,0,.35);
  width:100px;
  border-radius:20px;
}
</style>
