<template>
  <div id="app">
      <h1>这个是子应用应用的页面VUE1</h1>
      <A></A>
  </div>
</template>

<script>
import A from 'qiankunBase/src/components/A.vue';
export default {
    name: 'App',
    components: {A}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
