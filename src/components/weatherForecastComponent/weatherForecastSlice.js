import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loadWeatherForecast = createAsyncThunk(
    '@@WeatherForecast/get-all-info',
    async ({ lat = 0, lon = 0 }, { dispatch }) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}lat=${lat}&lon=${lon}${process.env.REACT_APP_API_KEY}`)
        const data = await res.json()
        if (data.cod === '200') {
            return data
        }
        else {
            throw new Error(`Неверный запрос! Ошибка ${data.cod}: "${data.message}"`)
        }
    }
)

const initialStateRegions = {
    regions: [],
}

const initialStateCities = {
    cities: [],
}

const initialStateWeatherForecast = {
    weatherForecast: {
        info: [],
        loading: 'idle',
        error: ''
    },
}

const regionsSlice = createSlice({
    name: '@@regions',
    initialState: initialStateRegions,
    reducers: {
        addRegions: (state, action) => {
            state.regions = action.payload
        }
    }
})

const citiesSlice = createSlice({
    name: '@@cities',
    initialState: initialStateCities,
    reducers: {
        addCities: (state, action) => {
            state.cities = action.payload
        }
    }
})

const weatherForecastSlice = createSlice({
    name: '@@weatherForecast',
    initialState: initialStateWeatherForecast,
    reducers: {
        removeWeatherForecast: (state) => {
            state.weatherForecast = initialStateWeatherForecast.weatherForecast
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadWeatherForecast.pending, (state) => {
                state.weatherForecast.info = []
                state.weatherForecast.loading = 'loading'
            })
            .addCase(loadWeatherForecast.fulfilled, (state, action) => {
                console.log(action);
                state.weatherForecast.info = action.payload
                state.weatherForecast.loading = 'idle'
                state.weatherForecast.error = ''
            })
            .addCase(loadWeatherForecast.rejected, (state, action) => {
                state.weatherForecast.loading = 'idle'
                state.weatherForecast.error = action.error.message !== 'Failed to fetch' ? action.error.message : '« Сервис временно недоступен! »'
            })
    }
})

export const { addRegions } = regionsSlice.actions
export const { addCities } = citiesSlice.actions
export const { removeWeatherForecast } = weatherForecastSlice.actions
export const regionsReducer = regionsSlice.reducer
export const citiesReducer = citiesSlice.reducer
export const weatherForecastReducer = weatherForecastSlice.reducer