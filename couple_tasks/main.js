const prizeNum = consts.prizeList.length
const perAngle = 360 / prizeNum
const offsetAngle = perAngle / 2
const circleCount = 3 //旋转圈数
const rotateDuration = 3  // 持续时间
const panel = document.querySelector('.luckpanel')

let isRotating = false


function drawPanel() {
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  const dpr = window.devicePixelRatio
  // 处理设备分辨率
  canvas.width = w * dpr
  canvas.height = h * dpr
  ctx.scale(dpr, dpr)

  // 将画布逆时针旋转90°
  ctx.translate(0, h)
  ctx.rotate(-90 * Math.PI / 180)

  ctx.strokeStyle = consts.borderColor

  const perRadian = (Math.PI * 2) / prizeNum
  for (let i = 0; i < prizeNum; i++) {
    const radian = perRadian * i

    ctx.beginPath()
    ctx.fillStyle = consts.prizeBgColors[i]
    ctx.moveTo(w/2, h/2)
    ctx.arc(w/2, h/2, w/2, radian, radian + perRadian, false) // 顺时针
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
  }
}

function getPrizeItem({name, src}) {
  const el = document.createElement('div')
  const tpl = `
    <div class="prize-item">
      <div class="prize-item__name" style="visibility:hidden;">${name}</div>
    </div>
  `
  // <div class="prize-item__img">
  //   <img src="${src}" alt="" style="visibility:hidden;">
  // </div>
  
  el.innerHTML = tpl
  return el.firstElementChild
}

function fillTitle({num}) {
  const container = document.querySelector('#title');
  const el = document.createElement('div')
  const tpl = `
    <div align='center' style='margin-top: 20px;'>
      <p>现在，这里共有${num}件任务</p>
      <p>抽一件试试吧</p>
    </div>
  `
  el.innerHTML = tpl
  container.appendChild(el.firstElementChild)
}

function fillPrize() {
  const container = document.querySelector('.prize');
  consts.prizeList.forEach((item, i) => {
    const el = getPrizeItem({
      name: item.prizeName,
      src: item.prizeImg
    })

    // 旋转
    const currentAngle = perAngle * i + offsetAngle
    el.style.transform = `rotate(${currentAngle}deg)`

    container.appendChild(el)
  })
}

let startRotateAngle = 0

function rotate(index) {
  const rotateAngle = (
    startRotateAngle +
    circleCount * 360 +
    360 - (perAngle * index + offsetAngle) - 
    startRotateAngle % 360
  );

  startRotateAngle = rotateAngle
  panel.style.transform = `rotate(${rotateAngle}deg)`
  panel.style.transitionDuration = `${rotateDuration}s`

  setTimeout(() => {
    rotateEnd(index)
  }, rotateDuration * 1000);
}

function rotateEnd(index) {
  isRotating = false
  alert(consts.prizeList[index].prizeName)
}

function bindEvent() {
  document.querySelector('.pointer').addEventListener('click', function(){
    if (isRotating) {
      return
    } else {
      isRotating = true
    }

    const index = Math.floor(Math.random() * prizeNum)
    rotate(index)
  })
}

function init() {
  drawPanel()
  console.log(prizeNum)
  fillTitle({'num': prizeNum})
  fillPrize()
  bindEvent()
}

document.addEventListener('DOMContentLoaded', init)