import { O2_AMBIENT_CLASSNAME } from '../utils/const'
import { getRandomInt } from '../utils/util'
import values from 'lodash/values'
import { O2_AMBIENT_CONFIG } from '../utils/const';

class Around {
  constructor() {
    this.isInited = false
    this.reset()
    this.init()
  }

  init() {
    this.isInited = true
    this.initDOM()
  }

  initDOM() {
    const container = document.createElement('div')
    const className = this.className
    container.className = className
    container.style.position = 'fixed'
    container.style.left = 0
    container.style.top = 0
    container.style.width = this.width
    container.style.height = this.height
    container.style.overflow = 'hidden'

    let domString = ''
    for (let i = 0; i < this.particleNumber; i++) {
      domString +=
        `<div class="${className}_item">
        <div class="${className}_item_inner" style="${this.generateItemStyle()}"></div>
      </div>`
    }
    container.innerHTML = domString
    this.parent.appendChild(container)
    this.container = container
  }

  getRandomBgColor() {
    const index = getRandomInt(0, this.backgroundColors.length - 1)
    return this.backgroundColors[index]
  }

  generateItemStyle() {
    const bgColor = this.getRandomBgColor()
    const radius = getRandomInt(this.minRadius, this.maxRadius)
    return `background-color: ${bgColor}; width: ${radius}px; height: ${radius}px;`
  }

  reset() {
    this.className = O2_AMBIENT_CLASSNAME
    this.particleNumber = window[O2_AMBIENT_CONFIG].particleNumber
    this.minRadius = window[O2_AMBIENT_CONFIG].minRadius
    this.maxRadius = window[O2_AMBIENT_CONFIG].maxRadius
    this.width = '100%'
    this.height = '100%'
    this.backgroundColors = values(window[O2_AMBIENT_CONFIG].backgroundColors)
    this.parent = document.querySelector('.o2team_ambient_main')

    this.destory()
    this.isInited && this.initDOM()
  }

  destory() {
    if (this.container && this.parent) {
      this.parent.removeChild(this.container)
    }
  }
}

export default Around
