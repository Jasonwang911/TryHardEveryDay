<template>
  <div>
    <h4>props-emit组件间通信</h4>
    <div>
      <parent />
    </div>
    <h4>@input:value</h4>
    <div>
      <grandson1 />
    </div>
  </div>
</template>

<script>
import Parent from '../components/Props/Parent'
import Grandson1 from '../components/Props/Grandson1'

export default {
  name: 'IndexView',
  components:{
    Parent,
    Grandson1
  },
}
</script>