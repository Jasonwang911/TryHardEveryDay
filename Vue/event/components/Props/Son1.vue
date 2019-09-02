<template>
  <div>
    <h4>Son1组件</h4>
    <div>
      父组件传的值： {{value}}
    </div>
    <div>
      <button @click="handleEmit">点击修改</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Son1',
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods:{
    handleEmit() {
      this.$emit('input', 100)
    }
  },
}
</script>
