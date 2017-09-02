import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'

const appPath = './components/main'
const App = require('./components/main')

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('main')
  )
}

render(App)

if (module.hot) {
  module.hot.accept(appPath, () => render(App))
}
