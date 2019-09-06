<template>
  <div>
    <h4>Son2组件</h4>
  </div>
</template>

<script>
export default {
  name: 'Son2',
  mounted() {
    this.$nextTick(() => {
      this.$bus.$emit('handleBusOn', '呵呵')
    })
  }
};
</script>
