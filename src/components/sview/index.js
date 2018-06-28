import Customise from './Customise.vue'
// 这里是重点
const sview = {
  install: function(Vue){
    Vue.component('Customise',Customise)
  }
}

// 导出组件
export default sview
