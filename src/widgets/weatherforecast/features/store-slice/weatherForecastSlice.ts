import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {InfoProp, WeatherForecast, QueryProp} from 'widgets/weatherforecast/types'

type LoadingProp = 'idle' | 'loading'
type ErrorProp = string

interface WeatherForecastI {
    info: InfoProp
    current: {now: WeatherForecast, selected: WeatherForecast}
    loading: LoadingProp
    error: ErrorProp
}

export const now: WeatherForecast = {
    "dt": 0, 
    "main": {
        "temp": 0,
        "feels_like": 0,
        "temp_min": 0,
        "temp_max": 0,
        "pressure": 0,
        "sea_level": 0,
        "grnd_level": 0,
        "humidity": 0,
        "temp_kf": 0
    },
    "weather": [{
        "id": 0,
        "main": "",
        "description": "",
        "icon": ""
    }],
    "clouds": {"all": 0},
    "wind": {
        "speed": 0,
        "deg": 0,
        "gust": 0
    },
    "visibility": 0,
    "pop": 0,
    "sys": {"pod": ""},
    "dt_txt": ""
}

const info: WeatherForecastI['info']  = {
    "cod":"200",
    "message":0,
    "cnt":40,
    "list":[now],
    'city': {           
        id: 0,
        name: "",
        coord: {lat: 0, lon: 0},
        country: "",
        population: 0,
        timezone: 0,
        sunrise: 0,
        sunset: 0,
    }
}

const initialStateWeatherForecast: {weatherForecast: WeatherForecastI} = {
    weatherForecast: {
        info,
        current: {now, selected: now},
        loading: 'idle',
        error: "",
    }
}

export const loadWeatherForecast = createAsyncThunk(
    '@@weather-forecast/get-all-info',
    async ({ lat = 0, lon = 0 }: QueryProp, { dispatch }) => {
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
        addCurrent: (state, action: PayloadAction<WeatherForecast>) => {
            state.weatherForecast.current.now = action.payload
        },
        addSelected: (state,action: PayloadAction<WeatherForecast>) => {
            state.weatherForecast.current.selected = action.payload
        },
        removeWeatherForecast: (state) => {
            state.weatherForecast = initialStateWeatherForecast.weatherForecast
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadWeatherForecast.pending, (state) => {
                state.weatherForecast.info = info
                state.weatherForecast.loading = 'loading'
            })
            .addCase(loadWeatherForecast.fulfilled, (state, action) => {
                state.weatherForecast.info = action.payload
                state.weatherForecast.loading = 'idle'
                state.weatherForecast.error = ''
            })
            .addCase(loadWeatherForecast.rejected, (state, action) => {
                state.weatherForecast.loading = 'idle'
                if (action.error.message) {
                    state.weatherForecast.error = action.error.message !== 'Failed to fetch' ? action.error.message : '« Сервис временно недоступен! »'
                }
            })
    }
})

export const { addCurrent, addSelected, removeWeatherForecast } = weatherForecastSlice.actions
export const weatherForecastReducer = weatherForecastSlice.reducer