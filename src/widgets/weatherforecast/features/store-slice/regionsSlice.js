import { createSlice } from '@reduxjs/toolkit'

const initialStateRegions = {
    regions: [],
    region: '',
}

const regionsSlice = createSlice({
    name: '@@regions',
    initialState: initialStateRegions,
    reducers: {
        addRegions: (state, action) => {
            state.regions = action.payload
        },
        addRegion: (state, action) => {
            state.region = action.payload
        },
    }
})

export const { addRegions } = regionsSlice.actions
export const regionsReducer = regionsSlice.reducer