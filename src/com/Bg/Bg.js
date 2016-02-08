import React, { Component } from 'react'
import cx from 'classnames'
import _ from 'lodash'
import Rows from './Rows'
import Marks from './Marks'

export default class Bg extends Component {

  render() {
    return (
      <div className="bg">
        <Rows />
        <Marks />
      </div>
    )
  }
}
