<template>
  <div>
    <h4>Son2组件</h4>
    <div>
      子组件中的金钱： {{value}}
    </div>
    <div>
      <button @click="handleEmit">点击修改</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Son2',
  props: {
    value: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    handleEmit() {
      this.$emit('input:value', 200);
    },
  },
};
</script>
