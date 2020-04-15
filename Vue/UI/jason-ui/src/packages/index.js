import Button from './Button'
import ButtonGroup from './ButtonGroup'
import Icon from './Icon'


const install = (Vue) => {
  // 把所有的组件设置成为全局组件
  // Vue.component(Button.name, Button)
  // Vue.component(ButtonGroup.name, ButtonGroup)
  // Vue.component(Icon.name, Icon)
  // webpack 的模块，通过 require.context()
  const requireComponent = require.context('.', true, /\.vue/)
  requireComponent.keys().forEach(fileName => {
    const config = requireComponent(fileName)
    Vue.component(config.default.name, config.default)
  })
}

// script vue是放在window下面
if(typeof window.vue !== 'undefined') {
  install(vue)
}
export default {
  install
}