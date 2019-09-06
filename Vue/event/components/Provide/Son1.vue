<template>
  <div>
    <h4>Son1组件</h4>
    <div>
      {{this.parent.money}}--{{this.parent.smock ? '抽烟' : '不抽烟'}}
    </div>
    <son2 />
  </div>
</template>

<script>
import Son2 from './Son2.vue';

export default {
  name: 'Son1',
  inject: ['parent'],
  components: {
    Son2,
  }
};
</script>
