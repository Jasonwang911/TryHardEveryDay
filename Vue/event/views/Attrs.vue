<template>
  <div>
    <h4>$attrs传值</h4>
    <parent />
  </div>
</template>

<script>
import Parent from '../components/Attrs/Parent'

export default {
  name: 'Attrs',
  components:{
    Parent
  }
}
</script>