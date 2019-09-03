<template>
  <div>
    <h4>Son2组件</h4>
    <div>
      孙子组件中的金钱： {{value}}
    </div>
    <div>
      <button @click="handleChange">修改</button>
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
    handleChange() {
      this.$dispatch('input', 100);
    },
  },
};
</script>
