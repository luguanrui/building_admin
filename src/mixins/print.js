import html2canvas from 'html2canvas'

export default {
  data() {
    return {
      printDisabled: false,
    }
  },
  methods: {
    handlePrint() {
      this.printDisabled = true // 点击打印按钮禁止重复点击
      setTimeout(() => {
        // 按钮显示为禁止了再去执行截图功能
        html2canvas(this.$refs.form.$el, {
          backgroundColor: null,
          scale: 1.3,
        }).then(canvas => {
          let dataURL = canvas.toDataURL('image/png')
          this.$refs.iframe.contentWindow.document.body.innerHTML = '' // 清空上一次打印的内容
          this.$refs.iframe.contentWindow.document.write(
            '<html><head><style media="print">@page { margin: 0mm 10mm; }body{margin-top: 50px; text-align: center;}</style></head><body><img src=' + dataURL + '></body></html>'
          )
          setTimeout(() => {
            this.$refs.iframe.contentWindow.print()
          }, 0)
          this.printDisabled = false
        })
      }, 100)
    },
  },
}
