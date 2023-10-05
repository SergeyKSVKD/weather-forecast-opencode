import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { City } from 'widgets/weatherforecast/types'

// type PartialCity = Partial<City>

interface CitiesI {
    city: City
    cities: City[]
}

const initialStateCities: CitiesI = {
    city: { Город: "", Население: 0, Широта: 0, Долгота: 0 },
    cities: [],
}

const citiesSlice = createSlice({
    name: '@@cities',
    initialState: initialStateCities,
    reducers: {
        addCities: (state, action: PayloadAction<CitiesI['cities']>) => {
            state.cities = action.payload
        },
        addCity: (state, action: PayloadAction<CitiesI['city']>) => {
            state.city = action.payload
        },
        removeCities: (state) => {
            state.city = initialStateCities.city
            state.cities = initialStateCities.cities
        }
    }
})

export const { addCities, addCity, removeCities } = citiesSlice.actions
export const citiesReducer = citiesSlice.reducer
