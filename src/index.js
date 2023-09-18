import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import WidgetWF from './widgets/weatherforecast/Widget';
import { store } from '../src/store/index'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WidgetWF />
    </Provider>
  </React.StrictMode>
);
