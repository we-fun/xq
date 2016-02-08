import React, { Component } from 'react'
import cx from 'classnames'
import _ from 'lodash'

export default class Rows extends Component {

  render() {
    return (
      <div>
        {
          _.times(9, (y) => (
            <div key={`row_${y}`} className={cx([
              'row', y === 4 && 'middle'
            ])}>
              {
                _.times(8, (x) => (
                  <div key={`span_${y}_${x}`} className={cx([
                    'sq',
                    (y === 1 && x === 4 ||
                      y === 8 && x === 4) && 'cross'
                  ])}></div>
                ))
              }
            </div>
          ))
        }
      </div>
    )
  }
}
