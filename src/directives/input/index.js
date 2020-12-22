import input from './input'

const install = function(Vue) {
  Vue.directive('input', input)
}

if (window.Vue) {
  window['input'] = input
  // eslint-disable-next-line no-undef
  Vue.use(install)
}

input.install = install
export default input
