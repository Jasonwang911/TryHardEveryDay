<template>
  <div class="home">
    <div>{{$store.state.age}}</div>
      <div>{{$store.getters.myAge}}</div>
    <children />
  </div>
</template>

<script>
import Children from '@/components/Children'

export default {
  name: 'parent',
  components: {
    Children
  },
  mounted() {
    console.log(this.$store)
  }
}
</script>
