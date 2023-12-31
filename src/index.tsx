import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.scss';
import WidgetWF from 'widgets/weatherforecast/Widget';
import { store } from './store/index'
import { Provider } from 'react-redux'

const rootElement = document.getElementById("root")
const root = createRoot(rootElement!)

root.render(<StrictMode>
  <Provider store={store}>
    <WidgetWF />
  </Provider>
</StrictMode>)