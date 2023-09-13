import { configureStore } from "@reduxjs/toolkit";
import { regionsReducer, citiesReducer, weatherForecastReducer } from '../components/weatherForecastComponent/weatherForecastSlice'
import { applicationParamsReducer } from '../components/applicationParamsSlice'

export const store = configureStore({
    reducer: {
        regionsState: regionsReducer,
        citiesState: citiesReducer,
        weatherForecastState: weatherForecastReducer,
        userParams: applicationParamsReducer,
    },
    devTools: true,
})