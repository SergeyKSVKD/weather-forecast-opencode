import { configureStore } from "@reduxjs/toolkit";
import { regionsReducer, weatherForecastReducer } from '../components/weatherForecastComponent/weatherForecastSlice'
import { applicationParamsReducer } from '../components/applicationParamsSlice'

export const store = configureStore({
    reducer: {
        regionsState: regionsReducer,
        weatherForecastState: weatherForecastReducer,
        userParams: applicationParamsReducer,
    },
    devTools: true,
})