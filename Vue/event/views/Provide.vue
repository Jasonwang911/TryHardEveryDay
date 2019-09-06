<template>
  <div>
    <h4>Provide传值---相当于react中的context,相当于注入数据的时候把父组件直接注入到子组件中</h4>
    <parent />
  </div>
</template>

<script>
import Parent from '../components/Provide/Parent'

export default {
  name: 'Provide',
  components:{
    Parent
  }
}
</script>