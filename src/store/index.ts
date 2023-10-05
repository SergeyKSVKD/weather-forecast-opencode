import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { applicationParamsReducer } from 'widgets/weatherforecast/features/store-slice/applicationParamsSlice'
import { citiesReducer } from 'widgets/weatherforecast/features/store-slice/citiesSlice'
import { regionsReducer } from 'widgets/weatherforecast/features/store-slice/regionsSlice'
import { weatherForecastReducer } from 'widgets/weatherforecast/features/store-slice/weatherForecastSlice'

const rootReducer = combineReducers({
    regionsState: regionsReducer,
    citiesState: citiesReducer,
    weatherForecastState: weatherForecastReducer,
    userParams: applicationParamsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        trace: true,
        serializableCheck: false,
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch