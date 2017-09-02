import { types } from 'mobx-state-tree'

import config from 'src/config'

const snakeStore =
types.model('SnakeStore', () => {
  length: types.optional(types.number, config.SNAKE_LENGTH),
})

export default snakeStore.create()
