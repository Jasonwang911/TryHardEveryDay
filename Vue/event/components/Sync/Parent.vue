<template>
  <div>
    <h4>Parent组件</h4>
    <div>
      父组件钱数 {{mny}}
    </div>
    <!-- sync是   :value="value" @update:value="(value) => this.value = value"  的语法糖 -->
    <son1 :value="mny" @update:value="(value) => this.mny = value" />
    <son1 :value.sync="mny" />
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
