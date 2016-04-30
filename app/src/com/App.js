import React, { Component } from 'react'
import Bg from './Bg'
import UnitSet from './UnitSet'
import * as cpu from '../cpu'

export default class App extends Component {

  componentDidMount() {
    cpu.init()
  }

  render() {
    return (
      <div className="cont-wrap">
        <div className="cont" onMouseDown={(e)=>{
          const { unitSet } = this.refs
          const shouldUpdate = cpu.handleMouseDown(e)
          if (shouldUpdate) unitSet.forceUpdate()
        }}>
          <UnitSet ref="unitSet" data={cpu.unitsData} />
          <Bg />
        </div>
      </div>
    )
  }
}
