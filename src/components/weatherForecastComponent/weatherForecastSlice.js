import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loadWeatherForecast = createAsyncThunk(
    '@@WeatherForecast/get-all-info',
    async ({ lat, lon }) => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}lat=${lat}&lon=${lon}${process.env.REACT_APP_API_KEY}`)
        const data = await res.json()
        return data
    }
)

const initialStateRegions = {
    regions: [],
}

const initialStateWeatherForecast = {
    weatherForecast: [],
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

const weatherForecastSlice = createSlice({
    name: '@@weatherForecast',
    initialState: initialStateWeatherForecast,
    reducers: {
        removeWeatherForecast: (state) => {
            state.weatherForecast = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadWeatherForecast.fulfilled, (state, action) => {
            state.weatherForecast = action.payload
        })
    }
})

export const { addRegions } = regionsSlice.actions
export const { removeWeatherForecast } = weatherForecastSlice.actions
export const regionsReducer = regionsSlice.reducer
export const weatherForecastReducer = weatherForecastSlice.reducer