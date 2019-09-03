<template>
  <div>
    <h4>Son1组件</h4>
    <div>没有绑定say方法</div>
    <son2 />
  </div>
</template>

<script>
import Son2 from './Son2.vue';

export default {
  name: 'Son1',
  components: {
    Son2,
  },
};
</script>
