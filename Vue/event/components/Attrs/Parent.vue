<template>
  <div>
    <h4>Parent组件</h4>
    <son1 name="jason" age="18" address="河北保定" @son="son" @handleSon="handleSon" />
  </div>
</template>

<script>
import Son1 from './Son1.vue';

export default {
  name: 'ParentCom',
  components: {
    Son1,
  },
  methods: {
    son() {
      console.log('son方法')
    },
    handleSon() {
      console.log('handleSon方法')
    }
  }
};
</script>
