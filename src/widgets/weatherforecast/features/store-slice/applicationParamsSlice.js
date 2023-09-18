import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    applicationParams: {
        sliderPosition: {
            count: 0,
            slideTo: 0,
            start: 1,
            end: 8,
        },
        activeArrowButton: {
            left: false,
            right: true,
        },
        activeSelect: {
            region: false,
            city: false,
        }
    },
}

const applicationParamsSlice = createSlice({
    name: '@@app-params',
    initialState,
    reducers: {
        addSliderPosition: (state, action) => {
            let { start, end, count, slideTo } = action.payload
            state.applicationParams.sliderPosition = {
                count,
                slideTo,
                start,
                end,
            }
        },
        addActiveArrowButton: (state, action) => {
            let { left, right } = action.payload
            state.applicationParams.activeArrowButton = {
                left,
                right,
            }
        },
        addActiveSelect: (state, action) => {
            let { city, region } = action.payload
            state.applicationParams.activeSelect = {
                city,
                region,
            }
        },
        removeParams: (state) => {
            state.applicationParams = initialState.applicationParams
        },
    }
})


export const { addActiveArrowButton, addSliderPosition, removeParams, addActiveSelect } = applicationParamsSlice.actions
export const applicationParamsReducer = applicationParamsSlice.reducer