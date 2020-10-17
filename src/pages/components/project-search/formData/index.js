import { clueData } from './clue' // 线索
import { talkingAbout } from './talking-about' // 再谈
import { contracted } from './contracted' // 签约
import { landing } from './landing' // 落地
import { starting } from './starting' // 开工
import { invest } from './invest' // 投产

export function formData() {
  return {
    clue: function() {
      return clueData()
    },
    talkingAbout: function() {
      return talkingAbout()
    },
    contracted: function() {
      return contracted()
    },
    landing: function() {
      return landing()
    },
    starting: function() {
      return starting()
    },
    invest: function() {
      return invest()
    },
  }
}
