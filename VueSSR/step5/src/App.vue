<template>
 <div id="app">
  <router-link to="/">Foo页面</router-link>
  <router-link to="/bar">Bar页面</router-link>
  <router-view></router-view>
 </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    };
  }
};
</script>
