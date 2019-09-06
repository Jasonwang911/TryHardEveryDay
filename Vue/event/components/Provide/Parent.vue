<template>
  <div>
    <h4>Parent组件</h4>
    <son1 />
  </div>
</template>

<script>
import Son1 from './Son1.vue';

export default {
  name: 'ParentCom',
  provide() {
    return {parent: this}
  },
  components: {
    Son1,
  },
  data() {
    return {
      money: 100,
      smock: true
    }
  }
};
</script>
