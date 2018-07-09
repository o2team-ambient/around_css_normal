/*
 * @desc 控制面板初始化代码
 * 注：控制面板自定义代码
 */

import dat from '@o2team/ambient-dat.gui'
import {
  O2_AMBIENT_MAIN
} from './utils/const'
import Controller from './utils/controller'
import { getParameterByName } from './utils/util'
import forEach from 'lodash/forEach'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')

let controlInit = () => {
  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor() {
      this.message = '四周运动 CSS（无配置）'
      this.backgroundColor = '#bddaf7'
      this.play = () => {
        if (!window[O2_AMBIENT_MAIN] || !window[O2_AMBIENT_MAIN].toggle || typeof window[O2_AMBIENT_MAIN].toggle !== 'function') return
        window[O2_AMBIENT_MAIN].toggle()
      }
    }
  }

  // 主控制面板
  class Control extends Controller {
    constructor() {
      super()
      this.otherConfig = new OtherConfig()
      this.initBaseGUI()
      // this.initTextureGUI()
      this.initColorGUI()
      this.isShowController && !this.isAmbientPlat && this.setBackgroundColor(this.otherConfig.backgroundColor)
    }

    initBaseGUI() {
      // demo code
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI()
      gui.addCallbackFunc(this.resetCanvas.bind(this))

      gui.add(otherConfig, 'message').name('配置面板')
      // gui.add(otherConfig, 'play').name('播放 / 暂停')
      config.particleNumber && gui.add(config, 'particleNumber', 5, 15, 1).name('粒子数量').onFinishChange(val => {
        // window[O2_AMBIENT_INIT]()
        this.resetCanvas()
      })
      config.minRadius && gui.add(config, 'minRadius', 2, 5, 1).name('粒子最小直径').onFinishChange(val => {
        this.resetCanvas()
      })
      config.maxRadius && gui.add(config, 'maxRadius', 10, 20, 1).name('粒子最大直径').onFinishChange(val => {
        this.resetCanvas()
      })
      this.isShowController && !this.isAmbientPlat && gui.addColor(otherConfig, 'backgroundColor').name('背景色(仅演示)').onFinishChange(val => {
        this.setBackgroundColor(val)
      })
      this.gui = gui
      // 设置控制面板层级
      this.setGUIzIndex(2)
    }

    /* initTextureGUI() {
      // demo code
      const gui = this.gui
      const textures = this.config.textures
      const texturesFolder = gui.addFolder('纹理')
      textures && Object.keys(textures).forEach((key, idx) => {
        const textureController = texturesFolder.add(textures, key).name(`纹理${idx + 1}`)
        textureController.onFinishChange(val => {
          this.resetCanvas()
        })
      })
      texturesFolder.open()

      this.texturesFolder = texturesFolder
    } */
    initColorGUI() {
      const gui = this.gui
      const backgroundColors = this.config.backgroundColors
      const colorsFolder = gui.addFolder('颜色组')
      let colorIndex = 0
      forEach(backgroundColors, (color, key) => {
        const colorController = colorsFolder.addColor(backgroundColors, key).name(`颜色${++colorIndex}`)
        colorController.onFinishChange(val => {
          this.resetCanvas()
        })
      })
      colorsFolder.open()

      this.colorsFolder = colorsFolder
    }
  }

  /* eslint-disable no-new */
  new Control()
}

export default controlInit
