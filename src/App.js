import React, { Component } from 'react'
import Bg from './Bg'
import UnitSet from './UnitSet'

export default class App extends Component {

  render() {
    return (
      <div className="cont-wrap">
        <div className="cont">
          <UnitSet />
          <Bg />
        </div>
      </div>
    )
  }
}
