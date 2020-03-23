<!--
 * @Author: Jason wang
 * @Date: 2020-03-23 10:41:56
 * @Descripttion: 
 * @version: 
 -->
<template>
  <div id="app">
    <ul>
      <li v-for="item in users" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      users: []
    }
  },
  mounted() {
    axios.get('https://walnuts.wangshen.top/api/users').then(res => {
      this.users = res.data
    })
  }
}
</script>

<style>
</style>
