import React from 'react'
import { inject, observer } from 'mobx-react'

import config from 'src/config'

@inject('canvas$')
@observer
export default class Canvas extends React.Component {
  get width () {
    const {COLUMNS, MARGIN, CELL} = config
    return COLUMNS * (MARGIN + CELL)
  }
  get height () {
    const {ROWS, MARGIN, CELL} = config
    return ROWS * (MARGIN + CELL)
  }

  renderText ({
    ctx,
    text,
    x,
    y,
    fillStyle,
    fontSize,
    horizontalAlign = 'center',
    verticalAlign = 'middle',
  }) {
    ctx.fillStyle = fillStyle
    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = horizontalAlign
    ctx.textBaseline = verticalAlign
    ctx.fillText(text, x, y)
  }

  renderScore (ctx) {
    const textY = this.height / 2
    const textX = this.width / 2
    const {score} = this.props
    this.renderText({
      ctx,
      text: '0',
      x: textX,
      y: textY,
      fillStyle: 'rgba(0, 0, 0, 0.1)',
      fontSize: 150,
    })
  }

  renderBackground (ctx) {
    ctx.fillStyle = '#EEE'
    ctx.fillRect(0, 0, this.width, this.height)
  }

  renderScene (ctx) {
    this.renderBackground(ctx)
    this.renderScore(ctx)
    // CONTINUE FROM HERE
    // TODO :  STORES,
    // SEE https://blog.thoughtram.io/rxjs/2017/08/24/taming-snakes-with-reactive-streams.html 
  }

  getRef = canvas => {
    canvas.width = this.width
    canvas.height = this.height
    this.ctx = canvas.getContext('2d')
    this.renderScene(this.ctx)
  }

  render () {
    return (
      <canvas ref={this.getRef} />
    )
  }
}
