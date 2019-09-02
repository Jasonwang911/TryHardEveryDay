<template>
  <div>
    <h4>Parent组件</h4>
    <div>
      父组件钱数 {{mny}}
    </div>
    <son1 :value="mny" @input="change" />
  </div>
</template>

<script>
import Son1 from './Son1'

export default {
  name: 'Parent',
  data(){
    return {
      mny: 100
    }
  },
  components:{
    Son1
  },
  methods:{
    change(value) {
      this.mny += value
    }
  },
}
</script>
