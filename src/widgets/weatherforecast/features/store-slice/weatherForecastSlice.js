import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialStateWeatherForecast = {
    weatherForecast: {
        info: [],
        current: { now: {}, selected: {}, },
        loading: 'idle',
        error: ''
    },
}

export const loadWeatherForecast = createAsyncThunk(
    '@@weather-forecast/get-all-info',
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

const weatherForecastSlice = createSlice({
    name: '@@weather-forecast',
    initialState: initialStateWeatherForecast,
    reducers: {
        addCurrent: (state, action) => {
            state.weatherForecast.current.now = action.payload
            state.weatherForecast.current.selected = {}
        },
        addSelected: (state,action) => {
            state.weatherForecast.current.selected = action.payload
        },
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

export const { addCurrent, addSelected, removeWeatherForecast } = weatherForecastSlice.actions
export const weatherForecastReducer = weatherForecastSlice.reducer