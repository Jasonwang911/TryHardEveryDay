<template>
  <div>
    <h4>EventBus传值： 跨组件，多层级</h4>
    <parent />
  </div>
</template>

<script>
import Parent from '../components/EventBus/Parent'

export default {
  name: 'EventBus',
  components:{
    Parent
  }
}
</script>