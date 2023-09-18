export const weatherForecast = state => state.weatherForecastState.weatherForecast.info
export const current = state => state.weatherForecastState.weatherForecast.current.now
export const selected = state => state.weatherForecastState.weatherForecast.current.selected
export const error = state => state.weatherForecastState.weatherForecast.error
export const loading = state => state.weatherForecastState.weatherForecast.loading
export const userParams = state => state.userParams.applicationParams
export const city = state => state.citiesState.city
export const cities = state => state.citiesState.cities
export const regions = state => state.regionsState.regions
export const region = state => state.regionsState.region
export const activeSelect = state => state.userParams.applicationParams.activeSelect


