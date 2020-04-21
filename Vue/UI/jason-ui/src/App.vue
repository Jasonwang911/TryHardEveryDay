<template>
  <div id="app">
    <zf-button>默认按钮</zf-button>
    <zf-button type="primary">默认按钮</zf-button>
    <zf-button type="info">默认按钮</zf-button>
    <zf-button type="success">默认按钮</zf-button>
    <zf-button type="warning">默认按钮</zf-button>
    <zf-button type="danger">默认按钮</zf-button>
    <zf-icon icon="edit"></zf-icon>
    <zf-icon icon="sousuo"></zf-icon>
    <zf-button type="success" icon="sousuo" icon-position="left">搜索</zf-button>
    <zf-button type="success" icon="sousuo" icon-position="right">搜索</zf-button>
    <zf-button type="success" loading>加载中</zf-button>
    <zf-button type="success" @click="fn">触发事件</zf-button>
  </div>
</template>

<script>
export default {
  name: "App",
  methods:{
    fn(e){
      console.log(e);
    }
  }
};
</script>

