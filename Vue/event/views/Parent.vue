<template>
  <div>
    <h4>$parent传值</h4>
    <parent />
  </div>
</template>

<script>
import Parent from '../components/Parent/Parent'

export default {
  name: 'ParentView',
  components:{
    Parent
  }
}
</script>