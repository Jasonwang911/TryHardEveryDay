<template>
  <div>
    <h4>Grandson1组件</h4>
    <div>
      父组件的金钱: {{money}}
    </div>
    <div>
      <son2 :value="money" @input:value="(vlaue) => this.money += vlaue" />
    </div>
  </div>
</template>

<script>
import Son2 from './Son2';

export default {
  name: 'Grandson1',
  data() {
    return {
      money: 100,
    };
  },
  components: {
    Son2,
  },
};
</script>
