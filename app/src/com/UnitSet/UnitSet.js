import React, { Component } from 'react'
import Unit from '../Unit'

export default class UnitSet extends Component {

  render() {
    const { data } = this.props
    return (
      <div className="chs">
        {
          data.map((item, i) => (
            <Unit key={`unit_${i}`}
              i={i} data={item} />
          ))
        }
      </div>
    )
  }
}
