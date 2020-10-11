<template>
  <div id="app">
    <navbar />
    <router-view />
    <sidebar v-if="$route.path === '/'" />
  </div>
</template>
<script>
import navbar from "./components/Navbar";
import sidebar from "./components/Sidebar";

export default {
  name: "App",
  components: {
    navbar,
    sidebar
  }
};
</script>
<style>
* {
  margin: 0;
}
#app {
  display: flex;
  background-color: #190f52;
}
</style>
