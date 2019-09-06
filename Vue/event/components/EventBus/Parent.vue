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
    this.$bus.$on('handleBusOn', (data) => {
      console.log(data)
    })
  }
};
</script>
