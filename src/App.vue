<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}*/
/*.ivu-form-item-content {
  position: relative;
  line-height: 32px;
  font-size: 12px;
  text-align: left;
}*/
.el-form-item {
  margin-bottom: 22px;
  display: inline-flex;
}
</style>
