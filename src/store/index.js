import { configureStore } from "@reduxjs/toolkit";
import { applicationParamsReducer } from '../widgets/weatherforecast/features/store-slice/applicationParamsSlice'
import { citiesReducer } from '../widgets/weatherforecast/features/store-slice/citiesSlice'
import { regionsReducer } from '../widgets/weatherforecast/features/store-slice/regionsSlice'
import { weatherForecastReducer } from '../widgets/weatherforecast/features/store-slice/weatherForecastSlice'

export const store = configureStore({
    reducer: {
        regionsState: regionsReducer,
        citiesState: citiesReducer,
        weatherForecastState: weatherForecastReducer,
        userParams: applicationParamsReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        trace: true,
    })
})