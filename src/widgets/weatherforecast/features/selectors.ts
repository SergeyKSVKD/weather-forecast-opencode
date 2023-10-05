import { RootState } from "store" 

export const weatherForecast = (state: RootState) => state.weatherForecastState.weatherForecast.info
export const current = (state: RootState) => state.weatherForecastState.weatherForecast.current.now
export const selected = (state: RootState) => state.weatherForecastState.weatherForecast.current.selected
export const error = (state: RootState) => state.weatherForecastState.weatherForecast.error
export const loading = (state: RootState) => state.weatherForecastState.weatherForecast.loading
export const userParams = (state: RootState) => state.userParams.applicationParams
export const city = (state: RootState) => state.citiesState.city
export const cities = (state: RootState) => state.citiesState.cities
export const regions = (state: RootState) => state.regionsState.regions
export const region = (state: RootState) => state.regionsState.region
export const activeSelect = (state: RootState) => state.userParams.applicationParams.activeSelect


