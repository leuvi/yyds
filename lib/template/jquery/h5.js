import '@less/h5.less'
import wxshare from './share'

let rootDoc = document.documentElement
let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'
function recalc() {
  let clientWidth = Math.max(rootDoc.clientWidth, window.innerWidth)
  if (!clientWidth) {
    return
  }
  rootDoc.style.fontSize = 20 * (clientWidth / 320) + 'px'
}
recalc()
window.addEventListener(resizeEvent, recalc, !1)
window.addEventListener('DOMContentLoaded', recalc, !1)

//微信环境
if (navigator.userAgent.indexOf("MicroMessenger") != -1) {
  wxshare()
}

$(function () {
  console.log('welcome')
})