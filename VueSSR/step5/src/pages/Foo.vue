<template>
 <div>
   <p>Foo页面: {{username}}</p>
    <button @click="handleClick">点击事件</button>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  asyncData(store) {
    return store.dispatch('setUserName')
  },
  methods: {
    handleClick() {
      alert('点击成功')
    }
  }
};
</script>
