const addListener = function(el, type, fn) {
  el.addEventListener(type, fn, false)
}

//去掉空格
const spaceFilter = function(el) {
  addListener(el, 'input', () => {
    el.value = el.value.replace(/\s+/, '')
  })
}

// 限制只能输入整数和小数（适用于价格类、最多两位小数）
const priceFilter = function(el) {
  addListener(el, 'input', () => {
    el.value = el.value.match(/^\d*(\.?\d{0,2})/g)[0] || null
    if (isNaN(el.value)) {
      el.value = ''
    }
  })
}

// 限制只能输入字母数字（适用于运单号）
const integerLetterFilter = function(el) {
  addListener(el, 'input', () => {
    el.value = el.value.replace(/[\W]/g, '')
    el.dispatchEvent(new Event('input'))
  })
}

export default {
  bind(el, binding) {
    if (el.tagName.toLowerCase() !== 'input') {
      el = el.getElementsByTagName('input')[0]
    }
    spaceFilter(el)
    switch (binding.arg) {
      case 'price':
        priceFilter(el)
        break
      case 'integerLetter':
        integerLetterFilter(el)
        break
      default:
        console.warn('未知指令类型', binding.arg)
        break
    }
  },
}
