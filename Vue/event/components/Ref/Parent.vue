<template>
  <div>
    <h4>Parent组件</h4>
    <son1 ref="son" />
  </div>
</template>

<script>
import Son1 from './Son1.vue';

export default {
  name: 'ParentCom',
  components: {
    Son1,
  },
  data() {
    return {
      money: 100,
      smock: true
    }
  },
  mounted() {
    this.$refs.son.say()
  }
};
</script>
