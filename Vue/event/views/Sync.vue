<template>
  <div>
    <h4>sync传值</h4>
    <parent />
  </div>
</template>

<script>
import Parent from '../components/Sync/Parent'

export default {
  name: 'Sync',
  components:{
    Parent
  }
}
</script>