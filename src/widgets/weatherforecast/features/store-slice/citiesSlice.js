import { createSlice } from '@reduxjs/toolkit'

const initialStateCities = {
    cities: [],
    city: {},
}

const citiesSlice = createSlice({
    name: '@@cities',
    initialState: initialStateCities,
    reducers: {
        addCities: (state, action) => {
            state.cities = action.payload
        },
        addCity: (state, action) => {
            state.city = action.payload
        },
        removeCities: (state, action) => {
            state.city = initialStateCities.city
            state.cities = initialStateCities.cities
        }
    }
})

export const { addCities, addCity, removeCities } = citiesSlice.actions
export const citiesReducer = citiesSlice.reducer
