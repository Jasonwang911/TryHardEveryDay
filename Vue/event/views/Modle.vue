<template>
  <div>
    <h4>v-module传值</h4>
    <parent />
  </div>
</template>

<script>
import Parent from '../components/Module/Parent'

export default {
  name: 'Module',
  components: {
    Parent
  }
}
</script>