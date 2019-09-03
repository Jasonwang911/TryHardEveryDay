<template>
  <div>
    <h4>Son1组件</h4>
    <h5>子组件继续往下传递</h5>
    <div>
      <son2 :value="value" />
      <button @click="$emit('input', 100)">儿子中修改</button>
    </div>
  </div>
</template>

<script>
import Son2 from './Son2';

export default {
  name: 'Son1',
  components: {
    Son2,
  },
  props: {
    value: {
      type: Number,
      default: 1,
    },
  },
};
</script>
