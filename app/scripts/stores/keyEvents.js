import _ from 'lodash'
import { types } from 'mobx-state-tree'

const LEFT_ARROW = 37
const UP_ARROW = 38
const RIGHT_ARROW = 39
const DOWN_ARROW = 40

const coordinate = types.model('Coordinate', {
  x: types.number,
  y: types.number,
})

const directionsStore = types.model('DirectionsStore', {
  [LEFT_ARROW]: types.optional(coordinate, { x: -1, y: 0 }),
  [UP_ARROW]: types.optional(coordinate, { x: 0, y: -1 }),
  [RIGHT_ARROW]: types.optional(coordinate, { x: 1, y: 0 }),
  [DOWN_ARROW]: types.optional(coordinate, { x: 0, y: 1 }),
})

const directions$ = directionsStore.create()

const keyEventsStore = types.model('KeyEventsStore', {
  direction: types.optional(coordinate, { x: 0, y: 0 }),
})
.views(self => {
  return {}
})
.actions(self => {
  return {
    afterCreate () {
      self.setInitialDirection()
      self.addEventListener(self.setDirection)
    },
    setInitialDirection () {
      self.direction = directions$[RIGHT_ARROW].toJSON()
    },
    addEventListener (func) {
      const delay = 250
      const listener = _.throttle(func, delay)
      document.addEventListener('keydown', listener, false)
    },
    isNewDirection (direction) {
      const previous = self.direction.toJSON()
      const next = direction.toJSON()
      return (
        !_.isEqual(previous, next) &&
        !self.isOppositeDirection(previous, next)
      )
    },
    isOppositeDirection (previous, next) {
      const isOpposite = (prev, next) => (
        _.isEqual(next.x, prev.x * -1) ||
        _.isEqual(next.y, prev.y * -1)
      )
      return isOpposite(previous, next)
    },
    setDirection (e) {
      const currentDirection = [e.keyCode]
      .map(key => directions$[key])
      .filter(direction => !!direction)
      .filter(self.isNewDirection)
      if (_.isEmpty(currentDirection)) {
        return
      }
      self.direction = currentDirection[0].toJSON()
    },
  }
})

export default keyEventsStore.create({})
