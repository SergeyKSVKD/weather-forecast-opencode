import { configureStore } from "@reduxjs/toolkit";
import { regionsReducer, weatherForecastReducer } from '../components/weatherForecastComponent/weatherForecastSlice'

export const store = configureStore({
    reducer: {
        regionsState: regionsReducer,
        weatherForecastState: weatherForecastReducer,
    },
    devTools: true,
})