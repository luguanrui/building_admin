export function textarea(str) {
  return str && str.replace(/\n|\r\n/g, '<br>')
}

// 下载
export function downFile(result, fileName) {
  const blob = new Blob([result], {
    type: 'application/vnd.ms-excel,charset=UTF-8',
  })
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, fileName)
  } else {
    var link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(link.href)
  }
}
