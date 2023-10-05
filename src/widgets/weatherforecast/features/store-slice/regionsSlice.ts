import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Region } from 'widgets/weatherforecast/types' 

const region: Region = ""
const regions: Region[] = []

const initialStateRegions = {
    regions,
    region,
}

const regionsSlice = createSlice({
    name: '@@regions',
    initialState: initialStateRegions,
    reducers: {
        addRegions: (state, action: PayloadAction<string[]>) => {
            state.regions = action.payload
        },
        addRegion: (state, action: PayloadAction<string>) => {
            state.region = action.payload
        },
    }
})

export const { addRegions } = regionsSlice.actions
export const regionsReducer = regionsSlice.reducer