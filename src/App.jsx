import { store } from './store/index'
import { Provider } from 'react-redux'
import { WeatherForecast, Footer } from './components/index'

function App() {
  return (
    <>
      <Provider store={store}>
        <div className='App'>
          <WeatherForecast className='weatherForecast' />
          <Footer className='footer' />
        </div>
      </Provider>
    </>
  );
}

export default App;
