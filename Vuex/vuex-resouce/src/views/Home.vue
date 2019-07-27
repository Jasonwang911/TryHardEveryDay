<template>
  <div class="home">
    <div>{{$store.state.age}}</div>
    <children />
  </div>
</template>

<script>
import Children from '@/components/Children'

export default {
  name: 'parent',
  components: {
    Children
  }
}
</script>
