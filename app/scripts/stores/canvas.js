import { types } from 'mobx-state-tree'

const canvasStore =
types.model('CanvasStore', {
  value: types.optional(types.number, 0),
})
.views(self => {
  return {
    get context () {
      return self.context
    },
  }
})
.actions(self => {
  return {
    afterCreate () {
    },
  }
})

export default canvasStore.create()
