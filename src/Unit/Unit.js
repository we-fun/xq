import React, { Component } from 'react'
import cx from 'classnames'

export default class Unit extends Component {

  render() {
    const { i } = this.props
    const [ side, name, y, x ] = this.props.data
    return (
      <span className={cx([
        'ch', side > 0 ? 'red' : 'green'
      ])} data-i={i} style={{
        top: en(y),
        left: en(x),
      }}>{name}</span>
    )
  }
}

function en(n){
  return n * 64 + 2
}
