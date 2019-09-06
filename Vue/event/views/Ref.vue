<template>
  <div>
    <h4>Ref传值，子组件可以拿到父组件的数据</h4>
    <parent /> 
  </div>
</template>

<script>
import Parent from '../components/Ref/Parent'

export default {
  name: 'Ref',
  components:{
    Parent
  }
}
</script>