<template>
  <div>
    <h1>Son2组件</h1>
    <div>绑定了say方法</div>
  </div>
</template>

<script>
export default {
  name: 'Son2',
  methods: {
    say() {
      console.log('Grandson2绑定了say方法');
    },
  },
};
</script>
