import React from 'react'
import { inject, observer } from 'mobx-react'

import Canvas from './Canvas'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Canvas/>
      </div>
    )
  }
}
