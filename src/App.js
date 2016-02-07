import React, { Component } from 'react'
import Bg from './Bg'
import UnitSet from './UnitSet'

const unitsData = [
  [1, '車', 0, 0], [1, '車', 0, 8],
  [1, '马', 0, 1], [1, '马', 0, 7],
  [1, '相', 0, 2], [1, '相', 0, 6],
  [1, '仕', 0, 3], [1, '仕', 0, 5],
  [1, '帅', 0, 4],
  [1, '砲', 2, 1], [1, '砲', 2, 7],
  [1, '兵', 3, 0], [1, '兵', 3, 2], [1, '兵', 3, 4], [1, '兵', 3, 6], [1, '兵', 3, 8],

  [-1, '車', 9, 0], [-1, '車', 9, 8],
  [-1, '马', 9, 1], [-1, '马', 9, 7],
  [-1, '象', 9, 2], [-1, '象', 9, 6],
  [-1, '士', 9, 3], [-1, '士', 9, 5],
  [-1, '将', 9, 4],
  [-1, '炮', 7, 1], [-1, '炮', 7, 7],
  [-1, '卒', 6, 0], [-1, '卒', 6, 2], [-1, '卒', 6, 4], [-1, '卒', 6, 6], [-1, '卒', 6, 8]
]

/// 玩家走棋
var side = null
var done = [null, null]
var pick = [null, null]
var each = Array.prototype.forEach
var abs = Math.abs
var round = Math.round
var bg, chs, chss

export default class App extends Component {

  componentDidMount() {
    bg = document.querySelector('.bg')
    chs = document.querySelector('.chs')
    chss = chs.querySelectorAll('.ch')
    nextTurn()
  }

  render() {
    return (
      <div className="cont-wrap">
        <div className="cont" onMouseDown={(e)=>{
          const { unitSet } = this.refs
          if (e.target.classList.contains('ch') &&
            e.target.classList.contains(side > 0 ? 'red' : 'green')) {
            if (pick[side] != null) {
              var c = unitsData[pick[side]]
              // c.classList.remove('active')
              c.active = false
            }
            pick[side] = +e.target.getAttribute('data-i')
            // e.target.classList.add('active')
            unitsData[pick[side]].active = true
            unitSet.forceUpdate()
            return
          }
          if (pick[side] != null) {
            var x = de(e.pageX - bg.offsetLeft)
            var y = de(e.pageY - bg.offsetTop)
            if (!(x >= -0.4 && x <= 8.4 &&
              y >= -0.4 && y <= 9.4)) return
            if (abs(round(x) - x) > 0.4 ||
              abs(round(y) - y) > 0.4) return
            x = round(x)
            y = round(y)
            var c = unitsData[pick[side]]
            if (!canGo(c, x, y)) return
            unitsData.forEach(function(c, i){
              if (!c.dead && c[2] === y && c[3] === x) {
                c.dead = true
                // chss[i].style.display = 'none'
              }
            })
            // var ch = chss[pick[side]]
            // ch.style.left = en(x)
            // ch.style.top = en(y)
            c[2] = y
            c[3] = x
            if (c[1] === '兵' || c[1] === '卒') {
              if (side > 0 ? (c[2] >= 5) : (c[2] <= 4)) c.cross = true
            }
            done[side] = pick[side]
            if (done[-side] != null) {
              // chss[done[-side]].classList.remove('active')
              unitsData[done[-side]].active = false
            }
            pick[side] = null
            nextTurn()
            unitSet.forceUpdate()
            return
          }
        }}>
          <UnitSet ref="unitSet" data={unitsData} />
          <Bg />
        </div>
      </div>
    )
  }
}

// 实时计算 cursor更新
function canGo(c, x, y){
  // 不能吃右方 无需判断 因为点击即重新选取
  // if (unitsData.some(function(c1){
  //   return !c1.dead && c1[2] === y && c1[3] === x && c1[0] === c[0]
  // })) return false
  var dx = x - c[3]
  var dy = y - c[2]
  if (c[1] === '兵' || c[1] === '卒') {
    if (c.cross && dy === 0 && abs(dx) === 1) return true
    return dx === 0 && dy === c[0]
  }
  if (c[1] === '帅' || c[1] === '将') {
    if (!(
      c[0] > 0 ? (x >= 3 && x <= 5 && y >= 0 && y <= 2) :
        (x >= 3 && x <= 5 && y >= 7 && y <= 9)
      )) return false
    return abs(dx) + abs(dy) === 1
  }
  if (c[1] === '仕' || c[1] === '士') {
    if (!(
      c[0] > 0 ? (x >= 3 && x <= 5 && y >= 0 && y <= 2) :
        (x >= 3 && x <= 5 && y >= 7 && y <= 9)
      )) return false
    return abs(dx) * abs(dy) === 1
  }
  if (c[1] === '相' || c[1] === '象') {
    if (!(
      c[0] > 0 ? (x >= 0 && x <= 8 && y >= 0 && y <= 4) :
        (x >= 0 && x <= 8 && y >= 5 && y <= 9)
      )) return false
    if (unitsData.some(function(c1){
      return !c1.dead &&
        c1[2] - c[2] === dy / 2 &&
        c1[3] - c[3] === dx / 2
    })) return false
    return abs(dx) === 2 && abs(dy) === 2
  }
  if (c[1] === '马') {
    if (unitsData.some(function(c1){
      return !c1.dead &&
        c1[2] - c[2] === sign(dy) * (abs(dy)-1) &&
        c1[3] - c[3] === sign(dx) * (abs(dx)-1)
    })) return false
    return abs(dx) * abs(dy) === 2
  }
  if (c[1] === '車') {
    if (dx * dy !== 0) return false
    var n = unitsData.reduce(function(m, c1){
      var dx1 = (c1[3] - c[3]) / sign(dx)
      var dy1 = (c1[2] - c[2]) / sign(dy)
      var f = c1 !== c && !c1.dead && (
        (dy && c1[3] === c[3] && dy1 < abs(dy) && dy1 > 0) ||
        (dx && c1[2] === c[2] && dx1 < abs(dx) && dx1 > 0)
        )
      return f ? m+1 : m
    }, 0)
    return n === 0
  }
  if (c[1] === '砲' || c[1] === '炮') {
    if (dx * dy !== 0) return false
    var n = unitsData.reduce(function(m, c1){
      var dx1 = (c1[3] - c[3]) / sign(dx)
      var dy1 = (c1[2] - c[2]) / sign(dy)
      var f = c1 !== c && !c1.dead && (
        (dy && c1[3] === c[3] && dy1 < abs(dy) && dy1 > 0) ||
        (dx && c1[2] === c[2] && dx1 < abs(dx) && dx1 > 0)
        )
      return f ? m+1 : m
    }, 0)
    if (unitsData.some(function(c1){
      return !c1.dead && c1[2] === y && c1[3] === x
    })) {
      return n === 1
    }
    return n === 0
  }
}
function sign(v){
  return v > 0 ? 1 :
    v < 0 ? -1 : 0
}

function nextTurn(){
  if (side == null) side = 1
  else side = -side
  if (side > 0) {
    // todo: AI
    // setTimeout(function(){
    //   nextTurn()
    // }, 2000)
  } else {

  }
}

function de(v){
  return (v - 2) / 64
}
