import React, { Component } from 'react'
import cx from 'classnames'
import _ from 'lodash'

const marksCfg = [
  [2, 1], [2, 7],
  [3, 0], [3, 2], [3, 4], [3, 6], [3, 8],
  [6, 0], [6, 2], [6, 4], [6, 6], [6, 8],
  [7, 1], [7, 7]
]

export default class Marks extends Component {

  render() {
    return (
      <div>
        {
          marksCfg.map((item, i) => (
            <div key={`mark_${i}`}
              className="mk"
              style={{
                top: item[0] * 64 + 2,
                left: item[1] * 64 + 2,
              }} />
          ))
        }
      </div>
    )
  }
}
