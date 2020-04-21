import Button from "./Button.vue";
import Icon from "./Icon.vue";
import ButtonGroup from "./ButtonGroup.vue";
const install = (Vue) => {
    //把所有的组件设成全局组件
    // Vue.component(Button.name,Button)
    // Vue.component(Icon.name,Icon)
    // Vue.component(ButtonGroup.name,ButtonGroup)
    //require.context()
    const requireComponent = require.context(".", true, /\.vue/);
    requireComponent.keys().forEach(fileName => {
        const config = requireComponent(fileName);
        // console.log(config);
        Vue.component(config.default.name, config.default);
    })
}
//script  vue是放在window下， 放在模块内
if(typeof window.vue !=="undefined"){
    install(vue);
}
export default {
    install
}