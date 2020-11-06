<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import '@/css/global.css'
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;


    color: #2c3e50;
    margin-top: 0px;
    height: 100%;
    width: 100%;
  }
  body .el-table th.gutter{
    display: table-cell!important;
  }
</style>
