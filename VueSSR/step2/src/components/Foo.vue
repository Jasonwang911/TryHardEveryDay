<template>
 <div>
   <p>Foo组件</p>
    <button @click="handleClick">点击事件</button>
 </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleClick() {
      alert('点击成功')
    }
  }
};
</script>

<style scoped>
</style>
