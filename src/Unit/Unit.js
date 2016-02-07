import React, { Component } from 'react'
import cx from 'classnames'

export default class Unit extends Component {

  render() {
    const { i } = this.props
    const [ side, name, y, x ] = this.props.data
    const { dead, active } = this.props.data
    return (
      <span className={cx([
        'ch',
        side > 0 ? 'red' : 'green',
        active && 'active'
      ])} data-i={i} style={{
        display: dead ? 'none' : 'block',
        top: en(y),
        left: en(x),
      }}>{name}</span>
    )
  }
}

function en(n){
  return n * 64 + 2
}
