<template>
  <div class="hello">
    <div>这是子组件</div>
    <div>{{$store.getters.myAge}}</div>
    <button @click="handleAdd">点击增加</button>
    <button @click="handleminus">点击减少</button>

  </div>
</template>

<script>
export default {
  name: 'children',
  props: {
    msg: String
  },
  methods: {
    handleAdd() {
      this.$store.commit('syncAdd', 10)
    },
    handleminus() {
      this.$store.dispatch('asyncMinus', 10)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
