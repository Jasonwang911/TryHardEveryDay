<template>
  <div>
    <h4>Parent组件</h4>
    <div>
      父组件钱数 {{mny}}
    </div>
    <!-- v-model是   :value="value" @input="(value) => this.value = value"  的语法糖 -->
    <son1 :value="mny" @input="value => this.mny = value" />
    <son1 v-model="mny" />
  </div>
</template>

<script>
import Son1 from './Son1';

export default {
  name: 'Parent',
  data() {
    return {
      mny: 100,
    };
  },
  components: {
    Son1,
  },
};
</script>
