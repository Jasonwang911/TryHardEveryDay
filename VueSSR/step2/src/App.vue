<template>
 <div id="app">
   <!-- id 是客户端激活 -->
   <div>我是App.vue, {{msg}}</div>
   <bar />
   <foo />
 </div>
</template>

<script>
import Bar from "./components/Bar";
import Foo from "./components/Foo";

export default {
  data() {
    return {
      msg: "hello vue-ssr"
    };
  },
  components: {
    Bar,
    Foo
  }
};
</script>

<style scoped>
</style>
