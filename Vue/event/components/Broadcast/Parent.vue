<template>
  <div>
    <h4>Parent组件</h4>
    <div>没有绑定say方法</div>
    <son1 />
  </div>
</template>

<script>
import Son1 from './Son1.vue';

export default {
  name: 'ParentCom',
  components: {
    Son1,
  },
  mounted() {
    this.$broadcast('handleSay');
  }
};
</script>
