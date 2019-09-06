<template>
  <div>
    <h4>Son1组件</h4>
    <son2 v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import Son2 from './Son2.vue';

export default {
  name: 'Son1',
  inheritAttrs: false,
  components: {
    Son2,
  }
};
</script>
